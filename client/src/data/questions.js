/**
 * AXIOM Skin Analysis Questions
 *
 * STRUCTURE:
 * - Questions 1-6: type: "oiliness" → Axis Score (Oil/Dry)
 * - Questions 7-10: type: "sensitivity" → Sensitivity Score
 * - Scores: 0, 5, 10 per question
 * - text: { ko, en } — localized question
 * - options: [{ ko, en, score }] — localized options
 */

export const questions = [
    {
        id: "q1",
        type: "oiliness",
        text: {
            ko: "세안 후 아무것도 바르지 않았을 때, 피부가 당기는 느낌이 얼마나 강한가요?",
            en: "After cleansing with nothing applied, how tight does your skin feel?"
        },
        options: [
            { ko: "[Extreme] 얼굴 전체가 찢어질 듯이 당긴다.", en: "[Extreme] My entire face feels painfully tight.", score: 0 },
            { ko: "[Mild] 입가나 눈가 위주로 살짝 당긴다.", en: "[Mild] Slight tightness around the mouth and eyes.", score: 5 },
            { ko: "[Comfort] 당김이 거의 느껴지지 않는다.", en: "[Comfort] Barely any tightness at all.", score: 10 }
        ]
    },
    {
        id: "q2",
        type: "oiliness",
        text: {
            ko: "세안 후 15분 뒤, 거울 속 당신의 피부는 어떤 상태인가요?",
            en: "Fifteen minutes after cleansing, what does your skin look like in the mirror?"
        },
        options: [
            { ko: "[Tight] 푸석하고 하얗게 각질이 보인다.", en: "[Tight] Dull and flaky with visible dry patches.", score: 0 },
            { ko: "[Soft] 당김 없이 매끄럽고 편안하다.", en: "[Soft] Smooth and comfortable — no tightness.", score: 5 },
            { ko: "[Shiny] 벌써 유분이 올라와 번들거린다.", en: "[Shiny] Already shiny with visible surface oil.", score: 10 }
        ]
    },
    {
        id: "q3",
        type: "oiliness",
        text: {
            ko: "오후가 되었을 때 T존(이마, 코)의 번들거림은 어느 정도인가요?",
            en: "By afternoon, how oily does your T-zone (forehead and nose) appear?"
        },
        options: [
            { ko: "[Matte] 번들거림 없이 보송하거나 튼다.", en: "[Matte] Matte and dry — sometimes even tight.", score: 0 },
            { ko: "[Normal] 자연스러운 윤기가 약간 흐른다.", en: "[Normal] A natural luminosity — balanced.", score: 5 },
            { ko: "[Greasy] 기름종이가 필요할 만큼 번들거린다.", en: "[Greasy] Visibly oily — blotting paper is a must.", score: 10 }
        ]
    },
    {
        id: "q4",
        type: "oiliness",
        text: {
            ko: "번들거림이 느껴질 때, 피부 속은 반대로 당기거나 건조하다고 느끼시나요?",
            en: "When your skin looks oily on the surface, does the inside still feel tight or dry?"
        },
        options: [
            { ko: "[Deep Dry] 유분은 없고 속만 바짝 당긴다.", en: "[Deep Dry] No surface oil — just tight, dehydrated skin.", score: 0 },
            { ko: "[Hydrated] 속당김 없이 촉촉함이 유지된다.", en: "[Hydrated] Comfortably hydrated throughout.", score: 5 },
            { ko: "[Inner Void] 겉은 번들거림에도 속은 당긴다.", en: "[Inner Void] Oily surface, yet tight and dry underneath.", score: 10 }
        ]
    },
    {
        id: "q5",
        type: "oiliness",
        text: {
            ko: "코 주변에 블랙헤드나 화이트헤드가 눈에 띄게 분포되어 있나요?",
            en: "Do you notice visible blackheads or whiteheads around your nose area?"
        },
        options: [
            { ko: "[Clear] 모공이 맑고 거의 보이지 않는다.", en: "[Clear] Pores appear clear and barely visible.", score: 0 },
            { ko: "[Moderate] 코 주변에만 약간 분포되어 있다.", en: "[Moderate] A few around the nose — manageable.", score: 5 },
            { ko: "[Severe] 피지 분비가 많고 모공이 넓다.", en: "[Severe] Excess sebum with visibly enlarged pores.", score: 10 }
        ]
    },
    {
        id: "q6",
        type: "oiliness",
        text: {
            ko: "당신이 생각하는 당신 피부의 가장 시급한 해결 과제는 무엇인가요?",
            en: "What is your skin's most pressing concern right now?"
        },
        options: [
            { ko: "[Hydrating] 메마른 피부를 위한 수분", en: "[Hydrating] Deep hydration for parched, thirsty skin.", score: 0 },
            { ko: "[Soothing] 예민한 피부를 위한 진정", en: "[Soothing] Calming a reactive, sensitized complexion.", score: 5 },
            { ko: "[Control] 넘치는 유분을 위한 피지 조절", en: "[Control] Regulating excess sebum and persistent shine.", score: 10 }
        ]
    },
    {
        id: "q7",
        type: "sensitivity",
        text: {
            ko: "환경 변화(온도, 습도)에 따라 피부 상태가 급격히 변하나요?",
            en: "Does your skin react noticeably to changes in temperature or humidity?"
        },
        options: [
            { ko: "[Stable] 거의 변화가 없고 건강하다.", en: "[Stable] Barely affected — consistently healthy.", score: 0 },
            { ko: "[Mild] 가끔 당기거나 간지럽다.", en: "[Mild] Occasionally tight or itchy.", score: 5 },
            { ko: "[Extreme] 즉각적으로 좁쌀이나 홍조가 생긴다.", en: "[Extreme] Immediate redness or bumps.", score: 10 }
        ]
    },
    {
        id: "q8",
        type: "sensitivity",
        text: {
            ko: "자극(머리카락·마스크)이나 신규 화장품 사용 시 피부가 예민하게 반응하나요?",
            en: "Does your skin react to friction (hair, mask) or newly introduced products?"
        },
        options: [
            { ko: "[Strong] 어떤 자극에도 피부가 튼튼하다.", en: "[Strong] Resilient — barely bothered by any irritant.", score: 0 },
            { ko: "[Sensitive] 특정 성분에만 가끔 반응한다.", en: "[Sensitive] Reacts to specific ingredients occasionally.", score: 5 },
            { ko: "[Hyper] 아주 작은 자극에도 금방 뒤집어진다.", en: "[Hyper] Flares up at even the slightest provocation.", score: 10 }
        ]
    },
    {
        id: "q9",
        type: "sensitivity",
        text: {
            ko: "세안 시 물 온도 변화에 피부가 화끈거리거나 붉어지는 편인가요?",
            en: "Does your skin flush or redden when exposed to changes in water temperature?"
        },
        options: [
            { ko: "[Normal] 온도 변화에 큰 영향이 없다.", en: "[Normal] Barely affected by temperature changes.", score: 0 },
            { ko: "[Warm] 잠시 붉어졌다가 금방 가라앉는다.", en: "[Warm] Brief redness that quickly subsides.", score: 5 },
            { ko: "[Flash] 열감이 오래 지속되고 쉽게 붉어진다.", en: "[Flash] Prolonged heat and persistent flushing.", score: 10 }
        ]
    },
    {
        id: "q10",
        type: "sensitivity",
        text: {
            ko: "모공의 크기가 도드라져 보인다고 느끼는 부위가 있나요?",
            en: "Do you have areas where pores appear visibly enlarged?"
        },
        options: [
            { ko: "[Tight] 모공이 거의 보이지 않을 만큼 촘촘하다.", en: "[Tight] Pores are barely visible — fine-textured skin.", score: 0 },
            { ko: "[Visible] 나비존이나 코 주변만 조금 도드라진다.", en: "[Visible] Slightly enlarged around the nose and T-zone.", score: 5 },
            { ko: "[Enlarged] 전체적으로 모공이 넓고 탄력이 없다.", en: "[Enlarged] Noticeably enlarged overall with reduced firmness.", score: 10 }
        ]
    }
];

// Alias for backwards compatibility with Diagnosis.jsx
export const QUESTIONS = questions;

// Skin Type Definitions (legacy — retained for Diagnosis.jsx compatibility)
const SKIN_TYPES = {
    OILY_SENSITIVE: {
        code: "OILY_SENSITIVE",
        title: "Oily-Sensitive",
        titleKo: "지성-민감성",
        emoji: "",
        descriptionKo: "피지 분비가 과다하면서도 자극에 민감한 피부입니다.",
        color: "#2A6885"
    },
    OILY_RESILIENT: {
        code: "OILY_RESILIENT",
        title: "Oily-Resilient",
        titleKo: "지성-저항성",
        emoji: "",
        descriptionKo: "피부 장벽은 튼튼하지만 피지 분비가 많습니다.",
        color: "#3C7795"
    },
    DRY_SENSITIVE: {
        code: "DRY_SENSITIVE",
        title: "Dry-Sensitive",
        titleKo: "건성-민감성",
        emoji: "",
        descriptionKo: "수분이 부족하고 쉽게 자극받는 피부입니다.",
        color: "#5A9AB5"
    },
    DRY_RESILIENT: {
        code: "DRY_RESILIENT",
        title: "Dry-Resilient",
        titleKo: "건성-저항성",
        emoji: "",
        descriptionKo: "피부가 안정적이지만 수분이 더 필요합니다.",
        color: "#8AAEC0"
    }
};

// Generate Result function for Diagnosis.jsx compatibility
export function generateResult(answers) {
    let oilScore = 0;
    let sensScore = 0;
    let oilMax = 0;
    let sensMax = 0;

    questions.forEach(q => {
        const score = answers[q.id] ?? 0;
        if (q.type === 'oiliness') {
            oilScore += score;
            oilMax += 10;
        } else if (q.type === 'sensitivity') {
            sensScore += score;
            sensMax += 10;
        }
    });

    const oilPercent = oilMax > 0 ? Math.round((oilScore / oilMax) * 100) : 0;
    const sensPercent = sensMax > 0 ? Math.round((sensScore / sensMax) * 100) : 0;

    const isOily = oilPercent > 50;
    const isSensitive = sensPercent > 50;

    let skinType;
    if (isOily && isSensitive) skinType = SKIN_TYPES.OILY_SENSITIVE;
    else if (isOily && !isSensitive) skinType = SKIN_TYPES.OILY_RESILIENT;
    else if (!isOily && isSensitive) skinType = SKIN_TYPES.DRY_SENSITIVE;
    else skinType = SKIN_TYPES.DRY_RESILIENT;

    return {
        oilScore: oilPercent,
        sensScore: sensPercent,
        skinType,
        isOily,
        isSensitive
    };
}
