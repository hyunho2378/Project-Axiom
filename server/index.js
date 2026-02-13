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
// 🔥 AI Skin Analysis Endpoint (High-end Researcher)
// 현호 님의 완벽한 브랜딩 프롬프트로 교체된 영역
// ============================================

app.post('/api/analyze', async (req, res) => {
    // 프론트엔드에서 보내주는 공식 description(상세 설명) 추가 접수
    const { oilScore, sensScore, skinType, description } = req.body;

    if (oilScore === undefined || sensScore === undefined || !skinType) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: oilScore, sensScore, skinType'
        });
    }

    // 통신 실패 시 보여줄 기본 (하이엔드) 멘트
    const getDefaultAdvice = (type, desc) => {
        return {
            headline: `${type} 피부를 위한 AXIOM 솔루션`,
            advice: desc || "피부 본연의 중심축을 바로잡는 것이 시급합니다. AXIOM의 고정밀 알고리즘이 제안하는 솔루션으로 피부 방어력을 재건하시길 바랍니다.",
            glossary: [
                { term: type, definition: "AXIOM 데이터 스캐닝으로 도출된 당신의 고유한 피부 축입니다." }
            ]
        };
    };

    if (!genAI) {
        console.log('⚠️  GEMINI_API_KEY not set, using default advice');
        return res.json({
            success: true,
            advice: getDefaultAdvice(skinType, description)
        });
    }

    try {
        // gemini-1.5-pro 모델이 페르소나(말투)를 훨씬 더 잘 지킵니다.
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const prompt = `당신은 하이엔드 뷰티 테크 브랜드 'AXIOM'의 수석 데이터 분석가이자 스킨케어 연구원입니다.
유저의 피부 타입 진단 결과가 나왔습니다. 아래 데이터를 바탕으로 유저에게 정밀한 처방을 내려주세요.

[유저 데이터]
- 피부 타입: ${skinType}
- 상태 설명: ${description || '데이터 분석 완료'}
- 유분도: ${oilScore}/100
- 민감도: ${sensScore}/100

[작성 규칙 - 매우 중요]
1. 말투: 반드시 최고급 경어체(~합니다, ~를 제안합니다, ~로 분석됩니다)를 사용하세요. 
2. 절대 금지: '~했어요', '~군요', '~네요' 등 가볍고 싼 티 나는 표현은 절대 금지.
3. 형식: 
   - 첫 번째 줄: 분석을 요약하는 핵심 문장 1줄 (Headline)
   - 두 번째 문단: 피부 상태에 대한 심도 있는 분석 및 AXIOM만의 데이터 기반 솔루션 제안 (Advice)
   - 세 번째: 반드시 본문 작성 후 '---GLOSSARY---' 구분선을 긋고, 본문에 쓰인 뷰티 성분이나 전문 용어 2개를 골라 '용어: 뜻' 형태로 설명해 주세요.

[출력 예시]
고객님의 피부는 현재 장벽이 약화된 상태로 분석됩니다.
유수분 밸런스가 무너져 미세한 외부 자극에도 즉각적인 반응이 나타날 수 있으므로, 피부 본연의 중심축을 바로잡는 것이 시급합니다. AXIOM의 고정밀 알고리즘은 고객님께 즉각적인 진정과 세라마이드 보충을 제안합니다. 필수적인 유효 성분만을 밀도 있게 전달하여 피부의 방어력을 재건하시길 바랍니다.
---GLOSSARY---
* 세라마이드: 피부 장벽을 구성하는 핵심 지질 성분으로, 수분 증발을 막고 외부 자극을 방어합니다.
* 피부 장벽: 피부의 가장 바깥층에서 수분을 유지하고 보호하는 보호막입니다.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 파싱 (---GLOSSARY--- 기준)
        const parts = text.split('---GLOSSARY---');
        const mainText = parts[0].trim();
        const glossaryText = parts[1] ? parts[1].trim() : '';

        // 첫 번째 줄을 헤드라인으로, 나머지를 어드바이스로 분리
        const lines = mainText.split('\n').filter(line => line.trim());
        const headline = lines[0] || 'AXIOM 맞춤 스킨케어 진단';
        const advice = lines.slice(1).join('\n').trim() || '고객님의 피부 타입에 맞는 최적의 솔루션을 제안합니다.';

        // 용어 사전 파싱 (예쁘게 오브젝트로 변환)
        const glossary = [];
        if (glossaryText) {
            const glossaryLines = glossaryText.split('\n').filter(line => line.includes(':') || line.includes('-') || line.includes('*'));
            glossaryLines.forEach(line => {
                let separator = ':';
                if (!line.includes(':') && line.includes('-')) separator = '-';
                const colonIndex = line.indexOf(separator);
                if (colonIndex > 0) {
                    const term = line.substring(0, colonIndex).trim().replace(/^[-*•]\s*/, '');
                    const definition = line.substring(colonIndex + 1).trim();
                    if (term && definition) glossary.push({ term, definition });
                }
            });
        }

        // 프론트엔드로 예쁘게 정돈된 JSON 발사
        res.json({
            success: true,
            advice: { headline, advice, glossary }
        });

    } catch (error) {
        console.error('Gemini API error:', error);
        res.json({
            success: true,
            advice: getDefaultAdvice(skinType, description)
        });
    }
});


// ============================================
// 🔒 여기서부터는 현호 님의 기존 코드를 단 1픽셀도 건드리지 않았습니다!
// ============================================

// Mock Auth Controller
// Returns mock tokens for UI testing
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

app.post('/api/diagnosis', (req, res) => {
    const { resultType, auraKeyword, scores } = req.body;

    if (!resultType) {
        return res.status(400).json({
            success: false,
            message: '진단 결과가 필요합니다.'
        });
    }

    const analysisResult = {
        id: `analysis_${Date.now()}`,
        resultType,
        auraKeyword,
        scores,
        createdAt: new Date().toISOString(),
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

app.get('/api/diagnosis/:userId', (req, res) => {
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

    let matchScore = 70;
    if (userSkinType && product.skinTypes.includes(userSkinType.toUpperCase())) {
        matchScore = 85 + Math.floor(Math.random() * 13);
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

// ============================================
// Statistics Endpoint
// ============================================

app.get('/api/stats', async (req, res) => {
    try {
        const totalCount = await prisma.surveyResponse.count();

        const typeGroups = await prisma.surveyResponse.groupBy({
            by: ['skinType'],
            _count: { skinType: true },
        });
        const typeDistribution = typeGroups.map(g => ({
            skinType: g.skinType || 'Unidentified',
            count: g._count.skinType
        }));

        const recentActivity = await prisma.surveyResponse.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { skinType: true, createdAt: true, answers: true }
        });

        const formattedRecent = recentActivity.map(item => {
            const ans = item.answers || {};
            return {
                skinType: item.skinType,
                age: ans.age || '알 수 없음',
                gender: ans.gender || '알 수 없음',
                createdAt: item.createdAt
            };
        });

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
  ║     🌟 AXIOM API Server Running        ║
  ║                                        ║
  ║     Port: ${PORT}                         ║
  ║     http://localhost:${PORT}              ║
  ║                                        ║
  ╚════════════════════════════════════════╝
  `);
});