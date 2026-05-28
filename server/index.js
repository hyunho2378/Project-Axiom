import 'dotenv/config'; // env 비밀번호 불러오기
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 4000;

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

// Health check — Render cold start 방지용 ping 엔드포인트
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

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