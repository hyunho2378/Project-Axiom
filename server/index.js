import 'dotenv/config'; // env 비밀번호 불러오기
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Gemini AI (requires GEMINI_API_KEY environment variable)
const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

// Middleware - CORS must be first
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false  // Must be false when origin is '*'
}));
app.use(express.json());

// Initialize Prisma Client for Supabase PostgreSQL
const prisma = new PrismaClient();

// ============================================
// AI Skin Analysis Endpoint (Hybrid Architecture)
// Client-side: Rule-based scoring (100% accurate)
// Server-side: Gemini AI for poetic advice
// ============================================

app.post('/api/analyze', async (req, res) => {
    const { oilScore, sensScore, skinType } = req.body;

    if (oilScore === undefined || sensScore === undefined || !skinType) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: oilScore, sensScore, skinType'
        });
    }

    // Default professional advice based on skin type
    const getDefaultAdvice = (type, oil, sens) => {
        const isOily = oil > 50;
        const isSensitive = sens > 50;

        if (isOily && isSensitive) {
            return {
                headline: "유분 조절과 진정, 둘 다 챙겨요! 💪",
                advice: "피지도 많고 자극에도 예민한 피부시네요. 가벼운 수분 젤 제형을 사용하면서 나이아신아마이드와 센텔라 성분을 찾아보세요. 자극적인 세안제는 피하는 게 좋아요!",
                glossary: [
                    { term: "나이아신아마이드", definition: "피부 톤을 밝게 하고 모공을 조여주는 비타민B 성분이에요" },
                    { term: "센텔라", definition: "병풀에서 추출한 성분으로 피부를 진정시켜줘요" }
                ]
            };
        } else if (isOily) {
            return {
                headline: "모공 관리가 핵심이에요! ✨",
                advice: "피지가 많은 피부시네요. BHA 성분으로 모공 관리를 하고, 오일프리 보습제를 사용해보세요. 일주일에 1-2번 클레이 마스크도 효과적이에요!",
                glossary: [
                    { term: "BHA", definition: "살리실산이라고도 하며, 모공 속 노폐물을 녹여주는 성분이에요" },
                    { term: "오일프리", definition: "기름 성분이 없어서 번들거림 없이 촉촉함을 유지해줘요" }
                ]
            };
        } else if (isSensitive) {
            return {
                headline: "피부 장벽부터 튼튼하게! 🛡️",
                advice: "자극에 예민한 피부시네요. 세라마이드와 판테놀 성분으로 장벽을 보호하세요. 새 제품은 꼭 손목에 먼저 발라보고, 무향료 제품을 선택하면 좋아요!",
                glossary: [
                    { term: "세라마이드", definition: "피부 장벽을 구성하는 지질 성분으로 보호막을 만들어줘요" },
                    { term: "판테놀", definition: "비타민B5로 피부를 진정시키고 촉촉하게 해줘요" }
                ]
            };
        } else {
            return {
                headline: "수분 충전에 집중하세요! 💧",
                advice: "건조하지만 안정적인 피부시네요. 히알루론산과 글리세린이 들어간 보습제를 사용하세요. 일주일에 2-3번 수분 마스크팩으로 촉촉함을 채워주면 더 좋아요!",
                glossary: [
                    { term: "히알루론산", definition: "자기 무게의 1000배 수분을 끌어당기는 보습 성분이에요" },
                    { term: "글리세린", definition: "피부에 수분을 잡아두는 대표적인 보습제예요" }
                ]
            };
        }
    };

    // If Gemini API is not configured, return professional default advice
    if (!genAI) {
        console.log('⚠️  GEMINI_API_KEY not set, using default advice');
        return res.json({
            success: true,
            advice: getDefaultAdvice(skinType, oilScore, sensScore)
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `역할: 당신은 친절한 피부 관리 상담사입니다. 피부 지식이 없는 일반인도 이해할 수 있게 쉽게 설명해주세요.

분석 데이터:
- 피부 타입: ${skinType}
- 유분도: ${oilScore}/100 (높을수록 기름기가 많아요)
- 민감도: ${sensScore}/100 (높을수록 자극에 예민해요)

지시사항:
1. 친구에게 말하듯 친근하고 쉬운 한국어로 조언해주세요.
2. 어려운 전문 용어(예: 나이아신아마이드, 레티놀, BHA 등)를 사용할 때는 본문에서 설명하지 마세요.
3. 대신, 글 마지막에 용어 설명을 별도로 정리해주세요.
4. 따뜻하고 응원하는 톤으로 작성하세요.

IMPORTANT OUTPUT RULE:
다음 형식으로 정확히 응답하세요. ---GLOSSARY--- 구분선을 반드시 포함하세요:

[핵심 한 줄 메시지]

[친근한 조언 2-3문장]

---GLOSSARY---
[용어1]: [쉬운 설명]
[용어2]: [쉬운 설명]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the ---GLOSSARY--- format
        const parts = text.split('---GLOSSARY---');
        const mainText = parts[0].trim();
        const glossaryText = parts[1] ? parts[1].trim() : '';

        // Extract headline (first line) and advice (rest)
        const lines = mainText.split('\n').filter(line => line.trim());
        const headline = lines[0] || '맞춤 스킨케어 조언';
        const advice = lines.slice(1).join(' ').trim() || '피부 타입에 맞는 제품을 선택하세요.';

        // Parse glossary terms
        const glossary = [];
        if (glossaryText) {
            const glossaryLines = glossaryText.split('\n').filter(line => line.includes(':'));
            glossaryLines.forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const term = line.substring(0, colonIndex).trim().replace(/^[-*•]\s*/, '');
                    const definition = line.substring(colonIndex + 1).trim();
                    if (term && definition) {
                        glossary.push({ term, definition });
                    }
                }
            });
        }

        res.json({
            success: true,
            advice: { headline, advice, glossary }
        });
    } catch (error) {
        console.error('Gemini API error:', error);
        res.json({
            success: true,
            advice: getDefaultAdvice(skinType, oilScore, sensScore)
        });
    }
});

// ============================================
// Mock Auth Controller
// Returns mock tokens for UI testing
// ============================================

const generateMockToken = () => {
    return `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: '이메일과 비밀번호를 입력해주세요.'
        });
    }

    // Mock successful login
    res.json({
        success: true,
        message: '로그인 성공',
        token: generateMockToken(),
        user: {
            id: 'user_001',
            email: email,
            name: '테스트 사용자',
            createdAt: new Date().toISOString()
        }
    });
});

// POST /api/auth/signup
app.post('/api/auth/signup', (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: '이메일과 비밀번호를 입력해주세요.'
        });
    }

    // Mock successful signup
    res.status(201).json({
        success: true,
        message: '회원가입 완료',
        token: generateMockToken(),
        user: {
            id: `user_${Date.now()}`,
            email: email,
            name: name || '새로운 사용자',
            createdAt: new Date().toISOString()
        }
    });
});

// POST /api/auth/social (Google/Apple)
app.post('/api/auth/social', (req, res) => {
    const { provider } = req.body;

    res.json({
        success: true,
        message: `${provider} 로그인 성공`,
        token: generateMockToken(),
        user: {
            id: `social_${Date.now()}`,
            email: `user@${provider.toLowerCase()}.com`,
            name: `${provider} User`,
            provider: provider,
            createdAt: new Date().toISOString()
        }
    });
});

// ============================================
// Mock Product Data
// ============================================

const mockProducts = [
    {
        id: 'prod_001',
        name: 'Hydra Serum',
        nameKo: '하이드라 세럼',
        description: 'Deep hydration serum with hyaluronic acid complex',
        descriptionKo: '히알루론산 복합체를 함유한 깊은 수분 세럼',
        price: 89000,
        category: 'serum',
        imageUrl: '/images/product-serum.jpg',
        ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Vitamin E', 'Aloe Vera'],
        skinTypes: ['DRY', 'OILY_DEHYDRATED', 'NORMAL'],
        auraKeyword: 'Pale Yellow'
    },
    {
        id: 'prod_002',
        name: 'Calm Essence',
        nameKo: '카밍 에센스',
        description: 'Soothing essence for sensitive and reactive skin',
        descriptionKo: '민감하고 반응성 피부를 위한 진정 에센스',
        price: 78000,
        category: 'essence',
        imageUrl: '/images/product-essence.jpg',
        ingredients: ['Centella Asiatica', 'Panthenol', 'Allantoin', 'Green Tea'],
        skinTypes: ['SENSITIVE', 'NORMAL'],
        auraKeyword: 'Dreamy Pink'
    },
    {
        id: 'prod_003',
        name: 'Oil Control Gel',
        nameKo: '오일 컨트롤 젤',
        description: 'Lightweight gel moisturizer for oily skin types',
        descriptionKo: '지성 피부를 위한 가벼운 젤 모이스처라이저',
        price: 65000,
        category: 'moisturizer',
        imageUrl: '/images/product-gel.jpg',
        ingredients: ['Niacinamide', 'Salicylic Acid', 'Tea Tree', 'Zinc'],
        skinTypes: ['OILY', 'COMBINATION'],
        auraKeyword: 'Vivid Orange'
    },
    {
        id: 'prod_004',
        name: 'Balance Cream',
        nameKo: '밸런스 크림',
        description: 'Perfect cream for combination skin types',
        descriptionKo: '복합성 피부를 위한 완벽한 크림',
        price: 95000,
        category: 'cream',
        imageUrl: '/images/product-cream.jpg',
        ingredients: ['Ceramide', 'Squalane', 'Vitamin C', 'Peptides'],
        skinTypes: ['COMBINATION', 'NORMAL'],
        auraKeyword: 'Mystic Purple'
    },
    {
        id: 'prod_005',
        name: 'Aqua Burst Ampoule',
        nameKo: '아쿠아 버스트 앰플',
        description: 'Intensive hydration for dehydrated oily skin',
        descriptionKo: '수분 부족형 지성 피부를 위한 집중 수분 공급',
        price: 120000,
        category: 'ampoule',
        imageUrl: '/images/product-ampoule.jpg',
        ingredients: ['Low Molecular HA', 'Beta-Glucan', 'Trehalose', 'Panthenol'],
        skinTypes: ['OILY_DEHYDRATED', 'DRY'],
        auraKeyword: 'Electric Blue'
    }
];

// ============================================
// Diagnosis API
// ============================================

// POST /api/diagnosis - Save diagnosis result
app.post('/api/diagnosis', (req, res) => {
    const { resultType, auraKeyword, scores } = req.body;

    if (!resultType) {
        return res.status(400).json({
            success: false,
            message: '진단 결과가 필요합니다.'
        });
    }

    // Mock save - in production, save to database
    const analysisResult = {
        id: `analysis_${Date.now()}`,
        resultType,
        auraKeyword,
        scores,
        createdAt: new Date().toISOString(),
        // Recommend products based on skin type
        recommendedProducts: mockProducts
            .filter(p => p.skinTypes.includes(resultType.toUpperCase().replace(' ', '_')))
            .slice(0, 3)
    };

    res.json({
        success: true,
        message: '진단 결과가 저장되었습니다.',
        data: analysisResult
    });
});

// GET /api/diagnosis/:userId - Get user's diagnosis history
app.get('/api/diagnosis/:userId', (req, res) => {
    // Mock response
    res.json({
        success: true,
        data: {
            latestResult: {
                resultType: 'COMBINATION',
                auraKeyword: 'Mystic Purple',
                scores: { O: 5, D: 4, S: 2 },
                createdAt: new Date().toISOString()
            },
            history: []
        }
    });
});

// ============================================
// Products API
// ============================================

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
    const { skinType, category } = req.query;

    let products = [...mockProducts];

    if (skinType) {
        products = products.filter(p =>
            p.skinTypes.includes(skinType.toUpperCase())
        );
    }

    if (category) {
        products = products.filter(p => p.category === category);
    }

    res.json({
        success: true,
        data: products
    });
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { userSkinType } = req.query;

    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: '제품을 찾을 수 없습니다.'
        });
    }

    // Calculate AI Match Score
    let matchScore = 70; // Base score
    if (userSkinType && product.skinTypes.includes(userSkinType.toUpperCase())) {
        matchScore = 85 + Math.floor(Math.random() * 13); // 85-97%
    }

    res.json({
        success: true,
        data: {
            ...product,
            matchScore,
            matchMessage: matchScore >= 85
                ? '당신의 피부 타입에 매우 적합합니다.'
                : '기본적인 케어에 도움이 됩니다.'
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// Guest Survey API (PUBLIC - No Auth Required)
// Saves anonymous survey responses to Supabase
// ============================================

app.post('/api/surveys/submit', async (req, res) => {
    try {
        const { answers, skinType, scores } = req.body;

        if (!answers) {
            return res.status(400).json({
                success: false,
                message: 'Survey answers are required'
            });
        }

        // Save to Supabase via Prisma
        const surveyResponse = await prisma.surveyResponse.create({
            data: {
                answers: answers,
                skinType: skinType || null,
                scores: scores || null
            }
        });

        console.log('✅ Survey saved to Supabase:', surveyResponse.id);

        res.json({
            success: true,
            message: 'Survey saved permanently',
            data: {
                id: surveyResponse.id,
                createdAt: surveyResponse.createdAt
            }
        });
    } catch (error) {
        console.error('❌ Survey save error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save survey',
            error: error.message
        });
    }
});

// GET all survey responses (for admin/analytics)
app.get('/api/surveys', async (req, res) => {
    try {
        const surveys = await prisma.surveyResponse.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100
        });
        res.json({ success: true, data: surveys, count: surveys.length });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- ADD THIS STATISTICS ENDPOINT ---
app.get('/api/stats', async (req, res) => {
    try {
        // 1. Get Total Count
        const totalCount = await prisma.surveyResponse.count();

        // 2. Get Type Distribution
        const typeGroups = await prisma.surveyResponse.groupBy({
            by: ['skinType'],
            _count: { skinType: true },
        });
        const typeDistribution = typeGroups.map(g => ({
            skinType: g.skinType || 'Unidentified',
            count: g._count.skinType
        }));

        // 3. Get Recent Activity (Limit 5)
        const recentActivity = await prisma.surveyResponse.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { skinType: true, createdAt: true, answers: true }
        });

        // 4. Format Recent Activity
        const formattedRecent = recentActivity.map(item => {
            const ans = item.answers || {};
            return {
                skinType: item.skinType,
                // 🔥 KEY CHANGE: Pass raw Korean string. Fallback to '알 수 없음' (Unknown in KR)
                age: ans.age || '알 수 없음',
                gender: ans.gender || '알 수 없음',
                createdAt: item.createdAt
            };
        });

        // 5. Send JSON Response
        res.json({
            success: true,
            data: { totalCount, typeDistribution, recentActivity: formattedRecent }
        });

    } catch (error) {
        console.error("Stats API Error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║                                        ║
  ║     🌟 AURA API Server Running         ║
  ║                                        ║
  ║     Port: ${PORT}                         ║
  ║     http://localhost:${PORT}              ║
  ║                                        ║
  ╚════════════════════════════════════════╝
  `);
});
