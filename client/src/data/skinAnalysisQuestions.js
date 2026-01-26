/**
 * AXIOM AI Skin Analysis - Question Data (Hybrid Architecture)
 * 
 * STRUCTURE: 10 Questions Total
 * - Questions 1-5: Determine Oiliness (0-100 scale)
 * - Questions 6-10: Determine Sensitivity (0-100 scale)
 * 
 * SCORING: Each answer has a value (0, 10, or 20 points)
 * - Total possible per category: 100 points
 * 
 * SKIN TYPE DETERMINATION (Client-side, 100% Accurate):
 * - Oil > 50 = Oily, Oil ≤ 50 = Dry
 * - Sensitivity > 50 = Sensitive, Sensitivity ≤ 50 = Resilient
 * 
 * 4 QUADRANT TYPES:
 * 1. Oily-Sensitive
 * 2. Oily-Resilient  
 * 3. Dry-Sensitive
 * 4. Dry-Resilient
 */

export const ANALYSIS_QUESTIONS = [
    // ===========================================
    // OILINESS QUESTIONS (Q1-Q5)
    // ===========================================
    {
        id: "oil_1",
        category: "oiliness",
        question: "How does your skin feel 2 hours after washing your face?",
        questionKo: "세안 후 2시간이 지났을 때 피부가 어떻게 느껴지나요?",
        options: [
            { text: "Tight and dry", textKo: "당기고 건조하다", score: 0 },
            { text: "Comfortable, neither oily nor dry", textKo: "편안하고 유분도 건조함도 없다", score: 10 },
            { text: "Already shiny and oily", textKo: "이미 번들거리고 기름진다", score: 20 }
        ]
    },
    {
        id: "oil_2",
        category: "oiliness",
        question: "How often do you need to blot your T-zone (forehead, nose) during the day?",
        questionKo: "하루 동안 T존(이마, 코)을 얼마나 자주 블로팅해야 하나요?",
        options: [
            { text: "Never, my skin stays matte", textKo: "전혀 없다, 피부가 보송하다", score: 0 },
            { text: "Once or twice", textKo: "하루에 한두 번", score: 10 },
            { text: "Multiple times, it gets very shiny", textKo: "여러 번, 매우 번들거린다", score: 20 }
        ]
    },
    {
        id: "oil_3",
        category: "oiliness",
        question: "How visible are your pores on your nose and cheeks?",
        questionKo: "코와 볼의 모공이 얼마나 눈에 띄나요?",
        options: [
            { text: "Almost invisible, very fine", textKo: "거의 보이지 않고 매우 작다", score: 0 },
            { text: "Visible only around the nose", textKo: "코 주변에만 보인다", score: 10 },
            { text: "Large and very noticeable", textKo: "크고 매우 눈에 띈다", score: 20 }
        ]
    },
    {
        id: "oil_4",
        category: "oiliness",
        question: "How does your skin react to heavy moisturizers?",
        questionKo: "진한 보습제에 피부가 어떻게 반응하나요?",
        options: [
            { text: "Absorbs well, still feels dry", textKo: "잘 흡수되고 여전히 건조하다", score: 0 },
            { text: "Comfortable, feels balanced", textKo: "편안하고 균형 잡힌 느낌", score: 10 },
            { text: "Feels greasy and causes breakouts", textKo: "기름지고 트러블이 생긴다", score: 20 }
        ]
    },
    {
        id: "oil_5",
        category: "oiliness",
        question: "By the end of the day, how does your makeup or sunscreen look?",
        questionKo: "하루가 끝날 때 메이크업이나 선크림의 상태는 어떤가요?",
        options: [
            { text: "Patchy and flaky", textKo: "갈라지고 들뜬다", score: 0 },
            { text: "Mostly intact", textKo: "대체로 유지된다", score: 10 },
            { text: "Melted off, very shiny", textKo: "녹아 없어지고 매우 번들거린다", score: 20 }
        ]
    },

    // ===========================================
    // SENSITIVITY QUESTIONS (Q6-Q10)
    // ===========================================
    {
        id: "sens_1",
        category: "sensitivity",
        question: "How does your skin react to new skincare products?",
        questionKo: "새로운 스킨케어 제품에 피부가 어떻게 반응하나요?",
        options: [
            { text: "No reaction, adapts easily", textKo: "반응 없이 쉽게 적응한다", score: 0 },
            { text: "Occasional mild irritation", textKo: "가끔 가벼운 자극이 있다", score: 10 },
            { text: "Often stings, burns, or turns red", textKo: "자주 따갑거나 붉어진다", score: 20 }
        ]
    },
    {
        id: "sens_2",
        category: "sensitivity",
        question: "How does your skin respond to temperature changes?",
        questionKo: "온도 변화에 피부가 어떻게 반응하나요?",
        options: [
            { text: "Stays calm and stable", textKo: "차분하고 안정적이다", score: 0 },
            { text: "Gets slightly flushed temporarily", textKo: "일시적으로 약간 붉어진다", score: 10 },
            { text: "Becomes very red and stays flushed", textKo: "매우 붉어지고 오래 지속된다", score: 20 }
        ]
    },
    {
        id: "sens_3",
        category: "sensitivity",
        question: "Do you experience visible redness on your cheeks or nose?",
        questionKo: "볼이나 코에 눈에 띄는 홍조가 있나요?",
        options: [
            { text: "No visible redness", textKo: "눈에 띄는 홍조가 없다", score: 0 },
            { text: "Sometimes, in certain conditions", textKo: "특정 상황에서 가끔", score: 10 },
            { text: "Yes, persistent redness", textKo: "예, 지속적인 홍조가 있다", score: 20 }
        ]
    },
    {
        id: "sens_4",
        category: "sensitivity",
        question: "How does your skin react to fragranced products?",
        questionKo: "향이 있는 제품에 피부가 어떻게 반응하나요?",
        options: [
            { text: "No issues at all", textKo: "전혀 문제없다", score: 0 },
            { text: "Mild tingling occasionally", textKo: "가끔 가벼운 따끔거림", score: 10 },
            { text: "Immediate irritation or breakouts", textKo: "즉각적인 자극 또는 트러블", score: 20 }
        ]
    },
    {
        id: "sens_5",
        category: "sensitivity",
        question: "Does physical contact (masks, pillows) cause skin irritation?",
        questionKo: "물리적 접촉(마스크, 베개)이 피부 자극을 유발하나요?",
        options: [
            { text: "No, my skin is resilient", textKo: "아니요, 피부가 튼튼하다", score: 0 },
            { text: "Sometimes mild marks or irritation", textKo: "가끔 가벼운 자국이나 자극", score: 10 },
            { text: "Yes, causes rashes or breakouts", textKo: "예, 발진이나 트러블이 생긴다", score: 20 }
        ]
    }
];

// ===========================================
// SKIN TYPE DEFINITIONS
// ===========================================

export const SKIN_TYPES = {
    OILY_SENSITIVE: {
        code: "OILY_SENSITIVE",
        title: "Oily-Sensitive",
        titleKo: "지성-민감성",
        emoji: "💧🔥",
        description: "Your skin produces excess oil while also being prone to irritation. Balance is key.",
        descriptionKo: "피지 분비가 과다하면서도 자극에 민감한 피부입니다. 균형이 핵심입니다.",
        color: "#FF7043"
    },
    OILY_RESILIENT: {
        code: "OILY_RESILIENT",
        title: "Oily-Resilient",
        titleKo: "지성-저항성",
        emoji: "💧✨",
        description: "Your skin is well-protected but produces excess sebum. Focus on oil control.",
        descriptionKo: "피부 장벽은 튼튼하지만 피지 분비가 많습니다. 유분 조절에 집중하세요.",
        color: "#3C7795"
    },
    DRY_SENSITIVE: {
        code: "DRY_SENSITIVE",
        title: "Dry-Sensitive",
        titleKo: "건성-민감성",
        emoji: "🌙🔥",
        description: "Your skin lacks moisture and is easily irritated. Gentle hydration is essential.",
        descriptionKo: "수분이 부족하고 쉽게 자극받는 피부입니다. 부드러운 보습이 필수입니다.",
        color: "#FFAB91"
    },
    DRY_RESILIENT: {
        code: "DRY_RESILIENT",
        title: "Dry-Resilient",
        titleKo: "건성-저항성",
        emoji: "🌙✨",
        description: "Your skin is stable but needs more hydration. Rich moisturizers will help.",
        descriptionKo: "피부가 안정적이지만 수분이 더 필요합니다. 진한 보습제가 도움이 됩니다.",
        color: "#8AAEC0"
    }
};

// ===========================================
// CLIENT-SIDE ANALYSIS ENGINE (Rule-based, 100% Accurate)
// ===========================================

/**
 * Calculate scores and determine skin type
 * @param {Object} answers - { oil_1: score, oil_2: score, ... sens_1: score, ... }
 * @returns {Object} Analysis result with scores and skin type
 */
export function analyzeSkin(answers) {
    let oilScore = 0;
    let sensScore = 0;

    // Sum scores by category
    Object.entries(answers).forEach(([qId, score]) => {
        const question = ANALYSIS_QUESTIONS.find(q => q.id === qId);
        if (question) {
            if (question.category === 'oiliness') {
                oilScore += score;
            } else if (question.category === 'sensitivity') {
                sensScore += score;
            }
        }
    });

    // Determine skin type based on thresholds
    const isOily = oilScore > 50;
    const isSensitive = sensScore > 50;

    let skinType;
    if (isOily && isSensitive) {
        skinType = SKIN_TYPES.OILY_SENSITIVE;
    } else if (isOily && !isSensitive) {
        skinType = SKIN_TYPES.OILY_RESILIENT;
    } else if (!isOily && isSensitive) {
        skinType = SKIN_TYPES.DRY_SENSITIVE;
    } else {
        skinType = SKIN_TYPES.DRY_RESILIENT;
    }

    return {
        oilScore,
        sensScore,
        maxScore: 100,
        skinType,
        isOily,
        isSensitive
    };
}
