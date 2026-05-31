/**
 * Master Product Data - AXIOM Official
 * desc, fullDesc: { ko, en }
 * ingredientsEn: English ingredient array (parallel to ingredients)
 */
export const ALL_PRODUCTS = [
    {
        id: 100,
        name: "Hyaluronic Acid Hydrating & Calming Toner",
        nameKr: "히알루론산 수분 진정 토너",
        category: "토너",
        price: "20,000₩",
        skinType: "건성",
        tag: "Hydration",
        desc: {
            ko: "히알루론산과 진정 성분을 함유하여 건조하고 민감한 피부에 수분을 공급하고 편안하게 진정해 줍니다.",
            en: "Formulated with hyaluronic acid and soothing actives to deeply hydrate and calm dry, stressed skin."
        },
        fullDesc: {
            ko: "[콧물 워터 제형 / 촉촉 흡수]\n히알루론산과 진정 성분을 함유하여 건조하고 민감한 피부에 수분을 공급하고 편안하게 진정해 줍니다.",
            en: "[Watery essence / dewy absorption]\nFormulated with hyaluronic acid and soothing actives to deeply hydrate and calm dry, stressed skin."
        },
        recommendationTarget: "건성 / 토너",
        ingredients: ["히알루론산", "세라마이드", "판테놀"],
        ingredientsEn: ["Hyaluronic Acid", "Ceramide", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 101,
        name: "Hyaluronic Acid Balance Toner",
        nameKr: "히알루론산 밸런스 토너",
        category: "토너",
        price: "18,000₩",
        skinType: "중성",
        tag: "Hydration",
        desc: {
            ko: "히알루론산을 함유하여 피부의 수분 밸런스를 맞추고 하루 종일 촉촉한 피부 컨디션을 유지해 줍니다.",
            en: "Hyaluronic acid perfects the skin's moisture balance, maintaining a comfortable, dewy condition throughout the day."
        },
        fullDesc: {
            ko: "[가벼운 워터 제형 / 빠르게 흡수]\n히알루론산을 함유하여 피부의 수분 밸런스를 맞추고 하루 종일 촉촉한 피부 컨디션을 유지해 줍니다.",
            en: "[Lightweight water formula / fast-absorbing]\nHyaluronic acid perfects the skin's moisture balance, maintaining a comfortable, dewy condition throughout the day."
        },
        recommendationTarget: "중성 / 토너",
        ingredients: ["히알루론산", "알란토인"],
        ingredientsEn: ["Hyaluronic Acid", "Allantoin"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 102,
        name: "Tea Tree Calming Toner",
        nameKr: "티트리 진정 토너",
        category: "토너",
        price: "17,000₩",
        skinType: "지성",
        tag: "Calming",
        desc: {
            ko: "티트리 추출물과 칼라민을 함유하여 과도한 유분을 정돈하고 예민해진 피부를 진정해 줍니다.",
            en: "Tea tree extract and calamine work in concert to refine excess sebum and soothe a reactive complexion."
        },
        fullDesc: {
            ko: "[워터 제형 / 산뜻 마무리]\n티트리 추출물과 칼라민을 함유하여 과도한 유분을 정돈하고 예민해진 피부를 진정해 줍니다.",
            en: "[Water formula / fresh finish]\nTea tree extract and calamine work in concert to refine excess sebum and soothe a reactive complexion."
        },
        recommendationTarget: "지성 / 토너",
        ingredients: ["티트리", "칼라민", "병풀 추출물"],
        ingredientsEn: ["Tea Tree", "Calamine", "Centella"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 103,
        name: "Heartleaf Hydrating & Calming Toner",
        nameKr: "어성초 수분 진정 토너",
        category: "토너",
        price: "18,000₩",
        skinType: "수부지",
        tag: "Calming",
        desc: {
            ko: "어성초 추출물을 함유하여 민감해진 피부에 수분과 진정을 동시에 제공해 줍니다.",
            en: "Heartleaf extract provides simultaneous hydration and calming, precisely formulated for reactive skin."
        },
        fullDesc: {
            ko: "[워터 / 산뜻 마무리]\n어성초 추출물을 함유하여 민감해진 피부에 수분과 진정을 동시에 제공해 줍니다.",
            en: "[Water formula / fresh finish]\nHeartleaf extract provides simultaneous hydration and calming, precisely formulated for reactive skin."
        },
        recommendationTarget: "수부지 / 토너",
        ingredients: ["어성초", "글리세린", "판테놀"],
        ingredientsEn: ["Heartleaf", "Glycerin", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 104,
        name: "Cica Calming Toner",
        nameKr: "시카 카밍 토너",
        category: "토너",
        price: "19,000₩",
        skinType: "복합성",
        tag: "Calming",
        desc: {
            ko: "시카 성분을 함유하여 외부 자극으로 예민해진 피부를 부드럽게 진정해 줍니다.",
            en: "Infused with cica complex to gently soothe skin sensitized by the demands of daily environmental stressors."
        },
        fullDesc: {
            ko: "[워터 제형 / 빠르게 흡수]\n시카 성분을 함유하여 외부 자극으로 예민해진 피부를 부드럽게 진정해 줍니다.",
            en: "[Water formula / fast-absorbing]\nInfused with cica complex to gently soothe skin sensitized by the demands of daily environmental stressors."
        },
        recommendationTarget: "복합성 / 토너",
        ingredients: ["병풀", "마데카소사이드"],
        ingredientsEn: ["Centella", "Madecassoside"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 105,
        name: "Hyaluronic Acid Glow Hydrating Ampoule",
        nameKr: "히알루론산 물광 보습 앰플",
        category: "앰플",
        price: "22,000₩",
        skinType: "건성",
        tag: "Hydration",
        desc: {
            ko: "고함량 히알루론산을 함유하여 피부 속까지 수분을 채워 윤기 있는 피부로 관리해 줍니다.",
            en: "High-concentration hyaluronic acid saturates skin from within for a visibly luminous, deeply hydrated finish."
        },
        fullDesc: {
            ko: "[콧물 젤 에센스 제형 / 천천히 흡수]\n고함량 히알루론산을 함유하여 피부 속까지 수분을 채워 윤기 있는 피부로 관리해 줍니다.\n미백 기능성",
            en: "[Gel essence / slow-absorbing for deep saturation]\nHigh-concentration hyaluronic acid saturates skin from within for a visibly luminous, deeply hydrated finish.\nBrightening functional"
        },
        recommendationTarget: "건성 / 앰플",
        ingredients: ["히알루론산", "판테놀", "베타글루칸"],
        ingredientsEn: ["Hyaluronic Acid", "Panthenol", "Beta-Glucan"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 106,
        name: "Ceramide Barrier Essence",
        nameKr: "세라마이드 배리어 에센스",
        category: "앰플",
        price: "24,000₩",
        skinType: "중성",
        tag: "Barrier",
        desc: {
            ko: "세라마이드 성분을 함유하여 약해진 피부 장벽을 강화하고 수분 손실을 방지해 줍니다.",
            en: "Ceramide technology reinforces a weakened barrier and seals in essential moisture against transepidermal loss."
        },
        fullDesc: {
            ko: "[밀도감 있는 에센스 제형 / 피부 밀착]\n세라마이드 성분을 함유하여 약해진 피부 장벽을 강화하고 수분 손실을 방지해 줍니다.\n미백 기능성",
            en: "[Dense essence / skin-adhering absorption]\nCeramide technology reinforces a weakened barrier and seals in essential moisture against transepidermal loss.\nBrightening functional"
        },
        recommendationTarget: "중성 / 앰플",
        ingredients: ["세라마이드", "콜레스테롤"],
        ingredientsEn: ["Ceramide", "Cholesterol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 107,
        name: "Cica Repair Ampoule",
        nameKr: "시카 리페어 앰플",
        category: "앰플",
        price: "23,000₩",
        skinType: "지성",
        tag: "Repair",
        desc: {
            ko: "시카 유래 진정 성분을 함유하여 자극받은 피부를 빠르게 진정해 줍니다.",
            en: "Centella-derived actives work swiftly to soothe and restore skin compromised by daily irritation."
        },
        fullDesc: {
            ko: "[가벼운 젤 제형 / 빠르게 흡수]\n시카 유래 진정 성분을 함유하여 자극받은 피부를 빠르게 진정해 줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Lightweight gel / fast-absorbing]\nCentella-derived actives work swiftly to soothe and restore skin compromised by daily irritation.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "지성 / 앰플",
        ingredients: ["병풀", "마데카소사이드", "판테놀"],
        ingredientsEn: ["Centella", "Madecassoside", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 108,
        name: "Zinc Tea Tree Ampoule",
        nameKr: "징크 티트리 앰플",
        category: "앰플",
        price: "21,000₩",
        skinType: "수부지",
        tag: "Balancing",
        desc: {
            ko: "징크와 티트리 성분을 함유하여 유분 밸런스를 조절하고 피부 결을 정돈해 줍니다.",
            en: "Zinc PCA and tea tree regulate sebum balance while refining texture for a clarified, even complexion."
        },
        fullDesc: {
            ko: "[수분 젤 제형 / 빠르게 흡수, 산뜻 마무리]\n징크와 티트리 성분을 함유하여 유분 밸런스를 조절하고 피부 결을 정돈해 줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Hydrating gel / fast-absorbing, fresh finish]\nZinc PCA and tea tree regulate sebum balance while refining texture for a clarified, even complexion.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "수부지 / 앰플",
        ingredients: ["징크 PCA", "티트리", "나이아신아마이드"],
        ingredientsEn: ["Zinc PCA", "Tea Tree", "Niacinamide"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 109,
        name: "Centella Calming Ampoule",
        nameKr: "병풀 진정 앰플",
        category: "앰플",
        price: "22,000₩",
        skinType: "복합성",
        tag: "Calming",
        desc: {
            ko: "병풀 추출물을 함유하여 불안정한 피부 상태를 편안하게 진정해 줍니다.",
            en: "Centella asiatica restores calm and stability to an unsettled, environmentally stressed complexion."
        },
        fullDesc: {
            ko: "[묽은 에센스 / 고르게 촉촉 흡수]\n병풀 추출물을 함유하여 불안정한 피부 상태를 편안하게 진정해 줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Thin essence / evenly absorbed]\nCentella asiatica restores calm and stability to an unsettled, environmentally stressed complexion.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "복합성 / 앰플",
        ingredients: ["병풀", "알란토인"],
        ingredientsEn: ["Centella", "Allantoin"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 110,
        name: "Panthenol Repair Cream",
        nameKr: "판테놀 리페어 크림",
        category: "튜브형 크림",
        price: "20,000₩",
        skinType: "건성",
        tag: "Repair",
        desc: {
            ko: "판테놀 성분을 함유하여 건조로 손상된 피부를 촉촉하게 회복시켜 줍니다.",
            en: "Panthenol-rich formula intensely repairs moisture-depleted skin, restoring a supple, resilient feel."
        },
        fullDesc: {
            ko: "[리치한 크림 제형 / 끈적임 없이 촉촉 흡수]\n판테놀 성분을 함유하여 건조로 손상된 피부를 촉촉하게 회복시켜 줍니다.\n주름 개선 기능성",
            en: "[Rich cream / non-sticky, moisturizing absorption]\nPanthenol-rich formula intensely repairs moisture-depleted skin, restoring a supple, resilient feel.\nAnti-wrinkle functional"
        },
        recommendationTarget: "건성 / 튜브형 크림",
        ingredients: ["판테놀", "세라마이드"],
        ingredientsEn: ["Panthenol", "Ceramide"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 111,
        name: "Hyaluronic Acid Gentle Cream",
        nameKr: "히알루론산 저자극 크림",
        category: "튜브형 크림",
        price: "19,000₩",
        skinType: "중성",
        tag: "Hydration",
        desc: {
            ko: "히알루론산을 함유하여 자극 없이 수분을 공급하고 편안한 사용감을 제공합니다.",
            en: "Hyaluronic acid delivers pure, irritation-free hydration in a gentle texture that absorbs effortlessly."
        },
        fullDesc: {
            ko: "[부드러운 크림 제형/ 끈적임 없이 촉촉 흡수]\n히알루론산을 함유하여 자극 없이 수분을 공급하고 편안한 사용감을 제공합니다.\n미백 기능성",
            en: "[Soft cream / non-sticky, moisturizing absorption]\nHyaluronic acid delivers pure, irritation-free hydration in a gentle texture that absorbs effortlessly.\nBrightening functional"
        },
        recommendationTarget: "중성 / 튜브형 크림",
        ingredients: ["히알루론산", "알란토인"],
        ingredientsEn: ["Hyaluronic Acid", "Allantoin"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 112,
        name: "Heartleaf Oil-Free Cream",
        nameKr: "어성초 오일프리 크림",
        category: "튜브형 크림",
        price: "19,000₩",
        skinType: "지성",
        tag: "Oil-Free",
        desc: {
            ko: "어성초 성분을 함유하여 번들거림 없이 산뜻한 보습 관리를 도와줍니다.",
            en: "Heartleaf extract delivers weightless, oil-free moisture for a fresh, non-greasy finish throughout the day."
        },
        fullDesc: {
            ko: "[젤 크림 타입 / 산뜻 마무리]\n어성초 성분을 함유하여 번들거림 없이 산뜻한 보습 관리를 도와줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Gel-cream / fresh finish]\nHeartleaf extract delivers weightless, oil-free moisture for a fresh, non-greasy finish throughout the day.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "지성 / 튜브형 크림",
        ingredients: ["어성초", "나이아신아마이드", "판테놀"],
        ingredientsEn: ["Heartleaf", "Niacinamide", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 113,
        name: "Tea Tree Barrier Care Cream",
        nameKr: "티트리 장벽 케어 크림",
        category: "튜브형 크림",
        price: "21,000₩",
        skinType: "수부지",
        tag: "Barrier",
        desc: {
            ko: "티트리 성분을 함유하여 유분을 정돈하고 피부 장벽을 보호해 줍니다.",
            en: "Tea tree refines and balances sebum while a ceramide complex shields the barrier from external stressors."
        },
        fullDesc: {
            ko: "[젤, 크림 중간 / 유분 잡는 산뜻 마무리]\n티트리 성분을 함유하여 유분을 정돈하고 피부 장벽을 보호해 줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Gel-cream hybrid / oil-controlling fresh finish]\nTea tree refines and balances sebum while a ceramide complex shields the barrier from external stressors.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "수부지 / 튜브형 크림",
        ingredients: ["티트리", "세라마이드", "판테놀"],
        ingredientsEn: ["Tea Tree", "Ceramide", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 114,
        name: "Centella Soothing Cream",
        nameKr: "병풀 수딩 크림",
        category: "튜브형 크림",
        price: "20,000₩",
        skinType: "복합성",
        tag: "Soothing",
        desc: {
            ko: "병풀 추출물을 함유하여 일상 속 자극받은 피부를 부드럽게 진정해 줍니다.",
            en: "Centella asiatica gently calms daily irritation for a consistently comfortable, balanced complexion."
        },
        fullDesc: {
            ko: "[산뜻 크림 제형 / 빠르게 흡수]\n병풀 추출물을 함유하여 일상 속 자극받은 피부를 부드럽게 진정해 줍니다.\n미백·주름 개선 2중 기능성",
            en: "[Light cream / fast-absorbing]\nCentella asiatica gently calms daily irritation for a consistently comfortable, balanced complexion.\nDual functional: Brightening + Anti-wrinkle"
        },
        recommendationTarget: "복합성 / 튜브형 크림",
        ingredients: ["병풀", "알란토인", "마데카소사이드"],
        ingredientsEn: ["Centella", "Allantoin", "Madecassoside"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 115,
        name: "Shea Butter Intense Repair Cream",
        nameKr: "시어버터 인텐스 리페어 크림",
        category: "원형 크림",
        price: "26,000₩",
        skinType: "건성",
        tag: "Repair",
        desc: {
            ko: "시어버터를 함유하여 깊은 건조로 거칠어진 피부를 집중적으로 케어해 줍니다.",
            en: "Shea butter provides intensive repair for rough, deeply parched skin, restoring softness and elasticity."
        },
        fullDesc: {
            ko: "[보습 좋은 밤 제형 / 천천히 흡수]\n시어버터를 함유하여 깊은 건조로 거칠어진 피부를 집중적으로 케어해 줍니다.",
            en: "[Nourishing balm / slow-absorbing for deep hydration]\nShea butter provides intensive repair for rough, deeply parched skin, restoring softness and elasticity."
        },
        recommendationTarget: "건성 / 원형 크림",
        ingredients: ["시어버터", "세라마이드", "스쿠알란"],
        ingredientsEn: ["Shea Butter", "Ceramide", "Squalane"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 116,
        name: "Ceramide Moisturizing Cream",
        nameKr: "세라마이드 보습 크림",
        category: "원형 크림",
        price: "24,000₩",
        skinType: "중성",
        tag: "Moisturizing",
        desc: {
            ko: "세라마이드 성분을 함유하여 피부 보습막을 형성하고 촉촉함을 오래 유지해 줍니다.",
            en: "Ceramide forms a lasting moisture-lock shield to keep skin comfortably hydrated for extended wear."
        },
        fullDesc: {
            ko: "[밀도 있는 크림 제형 / 촉촉 오래 유지]\n세라마이드 성분을 함유하여 피부 보습막을 형성하고 촉촉함을 오래 유지해 줍니다.",
            en: "[Dense cream / long-lasting moisture retention]\nCeramide forms a lasting moisture-lock shield to keep skin comfortably hydrated for extended wear."
        },
        recommendationTarget: "중성 / 원형 크림",
        ingredients: ["세라마이드"],
        ingredientsEn: ["Ceramide"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 117,
        name: "Centella Calming Cream",
        nameKr: "병풀 진정 크림",
        category: "원형 크림",
        price: "23,000₩",
        skinType: "지성",
        tag: "Calming",
        desc: {
            ko: "병풀 성분을 함유하여 민감해진 피부를 편안하게 진정해 줍니다.",
            en: "Centella complex calms sensitized skin with lasting, effortless comfort."
        },
        fullDesc: {
            ko: "[가벼운 젤 크림 타입 / 산뜻 마무리]\n병풀 성분을 함유하여 민감해진 피부를 편안하게 진정해 줍니다.",
            en: "[Light gel-cream / fresh finish]\nCentella complex calms sensitized skin with lasting, effortless comfort."
        },
        recommendationTarget: "지성 / 원형 크림",
        ingredients: ["병풀", "판테놀", "알란토인"],
        ingredientsEn: ["Centella", "Panthenol", "Allantoin"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 118,
        name: "Panthenol Barrier Cream",
        nameKr: "판테놀 장벽 크림",
        category: "원형 크림",
        price: "25,000₩",
        skinType: "수부지",
        tag: "Barrier",
        desc: {
            ko: "판테놀을 함유하여 피부 장벽을 강화하고 외부 자극으로부터 보호해 줍니다.",
            en: "Panthenol fortifies the skin barrier and shields against the cumulative stresses of external exposure."
        },
        fullDesc: {
            ko: "[크림 제형 / 겉보속촉]\n판테놀을 함유하여 피부 장벽을 강화하고 외부 자극으로부터 보호해 줍니다.",
            en: "[Cream formula / dewy exterior, moisturized interior]\nPanthenol fortifies the skin barrier and shields against the cumulative stresses of external exposure."
        },
        recommendationTarget: "수부지 / 원형 크림",
        ingredients: ["판테놀", "세라마이드", "스쿠알란"],
        ingredientsEn: ["Panthenol", "Ceramide", "Squalane"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 119,
        name: "Cica Repair Cream",
        nameKr: "시카 리페어 크림",
        category: "원형 크림",
        price: "24,000₩",
        skinType: "복합성",
        tag: "Repair",
        desc: {
            ko: "시카 성분을 함유하여 반복되는 자극으로 지친 피부를 건강하게 관리해 줍니다.",
            en: "Cica complex repairs the cumulative effects of repeated daily stressors, guiding skin back to health."
        },
        fullDesc: {
            ko: "[크림 제형 / 고르게 흡수]\n시카 성분을 함유하여 반복되는 자극으로 지친 피부를 건강하게 관리해 줍니다.",
            en: "[Cream formula / even absorption]\nCica complex repairs the cumulative effects of repeated daily stressors, guiding skin back to health."
        },
        recommendationTarget: "복합성 / 원형 크림",
        ingredients: ["병풀", "마데카소사이드", "판테놀"],
        ingredientsEn: ["Centella", "Madecassoside", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 120,
        name: "Hyaluronic Acid Mineral Sunscreen",
        nameKr: "히알루론산 무기자차 선크림",
        category: "선크림",
        price: "21,000₩",
        skinType: "건성",
        tag: "Sun Care",
        desc: {
            ko: "히알루론산을 함유하여 수분을 유지하면서 자외선을 효과적으로 차단해 줍니다.",
            en: "Hyaluronic acid sustains essential hydration while mineral filters deliver broad-spectrum UV protection."
        },
        fullDesc: {
            ko: "[촉촉하게 흐르는 제형]\n히알루론산을 함유하여 수분을 유지하면서 자외선을 효과적으로 차단해 줍니다.\n자외선 차단.미백,주름 개선 3중 기능성",
            en: "[Fluid formula with a dewy finish]\nHyaluronic acid sustains essential hydration while mineral filters deliver broad-spectrum UV protection.\nTriple functional: UV Protection + Brightening + Anti-wrinkle"
        },
        recommendationTarget: "건성 / 선크림",
        ingredients: ["징크옥사이드", "히알루론산", "판테놀"],
        ingredientsEn: ["Zinc Oxide", "Hyaluronic Acid", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 121,
        name: "Light Daily Mineral Sunscreen",
        nameKr: "라이트 데일리 무기자차 선크림",
        category: "선크림",
        price: "20,000₩",
        skinType: "중성",
        tag: "Sun Care",
        desc: {
            ko: "가벼운 제형으로 피부 부담 없이 데일리 자외선 차단을 도와줍니다.",
            en: "A featherlight mineral formula for effortless daily UV protection without compromising skin comfort."
        },
        fullDesc: {
            ko: "[촉촉 흐르는]\n가벼운 제형으로 피부 부담 없이 데일리 자외선 차단을 도와줍니다.\n자외선 차단.미백,주름 개선 3중 기능성",
            en: "[Fluid, hydrating texture]\nA featherlight mineral formula for effortless daily UV protection without compromising skin comfort.\nTriple functional: UV Protection + Brightening + Anti-wrinkle"
        },
        recommendationTarget: "중성 / 선크림",
        ingredients: ["징크옥사이드", "알란토인"],
        ingredientsEn: ["Zinc Oxide", "Allantoin"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 122,
        name: "Zinc Balancing Sunscreen",
        nameKr: "징크 밸런싱 선크림",
        category: "선크림",
        price: "22,000₩",
        skinType: "지성",
        tag: "Balancing",
        desc: {
            ko: "징크 성분을 함유하여 유분 밸런스를 고려한 자외선 차단 케어를 제공합니다.",
            en: "Zinc-infused mineral protection calibrated to the sebum-prone skin type for a matte, controlled finish."
        },
        fullDesc: {
            ko: "[산뜻한 로션 제형]\n징크 성분을 함유하여 유분 밸런스를 고려한 자외선 차단 케어를 제공합니다.\n자외선 차단.미백,주름 개선 3중 기능성",
            en: "[Fresh lotion formula]\nZinc-infused mineral protection calibrated to the sebum-prone skin type for a matte, controlled finish.\nTriple functional: UV Protection + Brightening + Anti-wrinkle"
        },
        recommendationTarget: "지성 / 선크림",
        ingredients: ["징크옥사이드", "나이아신아마이드", "티트리"],
        ingredientsEn: ["Zinc Oxide", "Niacinamide", "Tea Tree"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 123,
        name: "Cica Calming Sunscreen",
        nameKr: "시카 진정 선크림",
        category: "선크림",
        price: "22,000₩",
        skinType: "수부지",
        tag: "Calming",
        desc: {
            ko: "시카 성분을 함유하여 민감한 피부를 진정시키며 자외선을 차단해 줍니다.",
            en: "Cica complex calms reactive skin while mineral filters provide reliable daily UV protection."
        },
        fullDesc: {
            ko: "[산뜻한 로션 제형]\n시카 성분을 함유하여 민감한 피부를 진정시키며 자외선을 차단해 줍니다.\n자외선 차단.미백,주름 개선 3중 기능성",
            en: "[Fresh lotion formula]\nCica complex calms reactive skin while mineral filters provide reliable daily UV protection.\nTriple functional: UV Protection + Brightening + Anti-wrinkle"
        },
        recommendationTarget: "수부지 / 선크림",
        ingredients: ["징크옥사이드", "병풀", "판테놀"],
        ingredientsEn: ["Zinc Oxide", "Centella", "Panthenol"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    },
    {
        id: 124,
        name: "Mineral Balancing Sunscreen",
        nameKr: "무기자차 밸런싱 선크림",
        category: "선크림",
        price: "21,000₩",
        skinType: "복합성",
        tag: "Balancing",
        desc: {
            ko: "무기 자외선 차단 성분을 사용해 피부 타입에 맞춘 균형 잡힌 보호를 제공합니다.",
            en: "Mineral protection designed to balance the complex, zone-specific demands of combination skin."
        },
        fullDesc: {
            ko: "[크림 로션 중간 제형]\n무기 자외선 차단 성분을 사용해 피부 타입에 맞춘 균형 잡힌 보호를 제공합니다.\n자외선 차단.미백,주름 개선 3중 기능성",
            en: "[Cream-lotion hybrid formula]\nMineral protection designed to balance the complex, zone-specific demands of combination skin.\nTriple functional: UV Protection + Brightening + Anti-wrinkle"
        },
        recommendationTarget: "복합성 / 선크림",
        ingredients: ["징크옥사이드", "알란토인", "세라마이드"],
        ingredientsEn: ["Zinc Oxide", "Allantoin", "Ceramide"],
        imageColor: "bg-gradient-to-br from-[#0a1014] to-black"
    }
];
