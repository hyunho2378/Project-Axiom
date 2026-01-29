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
                headline: "유분 조절과 진정이 동시에 필요합니다",
                advice: "나이아신아마이드와 센텔라아시아티카 성분이 도움됩니다. 가벼운 수분 젤 제형을 선택하고, 자극적인 클렌저는 피하세요."
            };
        } else if (isOily) {
            return {
                headline: "피지 조절에 집중하세요",
                advice: "BHA(살리실산) 성분으로 모공 관리를 하고, 오일프리 보습제를 사용하세요. 주 1-2회 클레이 마스크가 효과적입니다."
            };
        } else if (isSensitive) {
            return {
                headline: "피부 장벽 강화가 우선입니다",
                advice: "세라마이드와 판테놀 성분으로 장벽을 보호하세요. 무향료, 저자극 제품을 선택하고 새 제품은 패치 테스트 후 사용하세요."
            };
        } else {
            return {
                headline: "수분 공급에 집중하세요",
                advice: "히알루론산과 글리세린이 함유된 보습제를 사용하세요. 주 2-3회 보습 마스크팩으로 수분을 채워주면 좋습니다."
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

        const prompt = `역할: 당신은 피부과 전문의이자 화장품 성분 전문가입니다.

분석 데이터:
- 피부 타입: ${skinType}
- 유분도: ${oilScore}/100 (50 이상 = 지성, 50 미만 = 건성)
- 민감도: ${sensScore}/100 (50 이상 = 민감성, 50 미만 = 저항성)

지시사항:
1. 위 데이터를 바탕으로 한국어로 전문적인 스킨케어 조언을 작성하세요.
2. 구체적인 성분명을 언급하세요 (예: 히알루론산, 세라마이드, 나이아신아마이드, BHA, 비타민C 등).
3. 실천 가능한 루틴 팁을 포함하세요.
4. 시적 표현이나 은유는 절대 사용하지 마세요. 전문적이고 명확하게 작성하세요.
5. 짧고 간결하게 작성하세요.

다음 JSON 형식으로 정확히 응답하세요:
{"headline": "핵심 조언 한 줄 (15자 이내)", "advice": "구체적인 성분과 루틴 조언 (2-3문장)"}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        try {
            const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
            const advice = JSON.parse(cleanText);

            res.json({
                success: true,
                advice: {
                    headline: advice.headline || "맞춤 스킨케어 조언",
                    advice: advice.advice || "피부 타입에 맞는 제품을 선택하세요."
                }
            });
        } catch (parseError) {
            console.log('Parse error, using default:', text);
            res.json({
                success: true,
                advice: getDefaultAdvice(skinType, oilScore, sensScore)
            });
        }
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
