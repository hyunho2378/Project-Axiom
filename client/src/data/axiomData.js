import { ALL_PRODUCTS } from './productsData';

/**
 * AXIOM Data Bridge
 * SKIN_TYPES: 20 combinations × { description, characteristic, careDirection } × { ko, en }
 * SKIN_TYPE_NAMES: Korean key → { ko, en } display name
 */

export const SKIN_TYPE_NAMES = {
    '건성 · 비민감':   { ko: '건성 · 비민감',   en: 'Dry · Resilient' },
    '건성 · 민감 주의': { ko: '건성 · 민감 주의', en: 'Dry · Sensitive Watch' },
    '건성 · 민감':     { ko: '건성 · 민감',     en: 'Dry · Sensitive' },
    '건성 · 과민':     { ko: '건성 · 과민',     en: 'Dry · Reactive' },
    '중성 · 비민감':   { ko: '중성 · 비민감',   en: 'Normal · Resilient' },
    '중성 · 민감 주의': { ko: '중성 · 민감 주의', en: 'Normal · Sensitive Watch' },
    '중성 · 민감':     { ko: '중성 · 민감',     en: 'Normal · Sensitive' },
    '중성 · 과민':     { ko: '중성 · 과민',     en: 'Normal · Reactive' },
    '지성 · 비민감':   { ko: '지성 · 비민감',   en: 'Oily · Resilient' },
    '지성 · 민감 주의': { ko: '지성 · 민감 주의', en: 'Oily · Sensitive Watch' },
    '지성 · 민감':     { ko: '지성 · 민감',     en: 'Oily · Sensitive' },
    '지성 · 과민':     { ko: '지성 · 과민',     en: 'Oily · Reactive' },
    '수부지 · 비민감':   { ko: '수부지 · 비민감',   en: 'Combo-Dry · Resilient' },
    '수부지 · 민감 주의': { ko: '수부지 · 민감 주의', en: 'Combo-Dry · Sensitive Watch' },
    '수부지 · 민감':     { ko: '수부지 · 민감',     en: 'Combo-Dry · Sensitive' },
    '수부지 · 과민':     { ko: '수부지 · 과민',     en: 'Combo-Dry · Reactive' },
    '복합성 · 비민감':   { ko: '복합성 · 비민감',   en: 'Combination · Resilient' },
    '복합성 · 민감 주의': { ko: '복합성 · 민감 주의', en: 'Combination · Sensitive Watch' },
    '복합성 · 민감':     { ko: '복합성 · 민감',     en: 'Combination · Sensitive' },
    '복합성 · 과민':     { ko: '복합성 · 과민',     en: 'Combination · Reactive' },
};

export const SKIN_TYPES = {

    // ── 건성 계열 ──────────────────────────────────────────────────
    "건성 · 비민감": {
        description: {
            ko: "유수분이 전반적으로 부족하지만 피부 장벽은 비교적 안정적으로 유지되는 상태입니다.\n당김과 건조함은 느껴지지만 외부 자극이나 성분 변화에 대한 반응은 크지 않은 편입니다.\n보습과 장벽 유지를 중심으로 한 꾸준한 관리가 적합합니다.",
            en: "Moisture and oil levels are both low, yet the skin barrier remains comparatively stable.\nTightness and dryness are present, but the skin shows little reaction to external stimuli or new ingredients.\nA consistent routine focused on deep hydration and barrier preservation is ideal."
        },
        characteristic: {
            ko: "피부 전체적으로 수분과 유분이 부족해 당김과 각질이 생기기 쉬운 상태입니다.\n유수분이 모두 적지만 외부 자극에는 크게 반응하지 않는 비교적 안정적인 조건입니다.\n환경 변화나 계절에 따라 건조함이 더 심해질 수 있습니다.",
            en: "Insufficient hydration and lipids make dryness and flaking likely across the face.\nDespite low moisture and oil levels, the skin remains relatively stable under external stressors.\nSeasonal shifts or dry environments can intensify dryness."
        },
        careDirection: {
            ko: "풍부한 보습 성분이 담긴 크림 제형을 꾸준히 사용하는 것이 중요합니다.\n세안 후 빠르게 수분 제품을 발라 수분 손실을 막아주세요.\n피부를 더 건조하게 만드는 강한 클렌징이나 알코올 함유 제품은 피하는 것이 좋습니다.",
            en: "Consistently applying a rich, emollient cream is essential to maintain barrier function.\nApply a hydrating product immediately after cleansing to lock in moisture before it escapes.\nAvoid harsh cleansers and alcohol-based formulas that further strip the skin."
        },
    },
    "건성 · 민감 주의": {
        description: {
            ko: "유수분이 부족하고 피부 장벽이 약해지기 쉬운 초기 단계의 민감 피부입니다.\n환경 변화나 특정 성분에 따라 일시적인 따가움이나 붉어짐이 나타날 수 있습니다.\n자극이 적은 보습 중심의 관리로 피부 컨디션을 안정시키는 것이 중요합니다.",
            en: "Low moisture and oil levels place this skin at the early stages of barrier weakening and sensitivity.\nTemporary stinging or redness may appear with environmental shifts or new ingredients.\nCalming, hydration-first care is key to stabilizing condition before sensitivity deepens."
        },
        characteristic: {
            ko: "수분과 유분이 부족한 상태에서 피부 장벽이 조금씩 약해지고 있는 초기 단계입니다.\n평소에는 괜찮지만 날씨가 급변하거나 새로운 성분을 접할 때 일시적인 따가움이나 붉어짐이 나타날 수 있습니다.\n건조함이 지속되면 민감도가 더 높아질 수 있어 지금부터의 관리가 중요합니다.",
            en: "Moisture and oil deficits are gradually eroding barrier integrity at an early stage.\nGenerally stable day-to-day, but sudden weather changes or unfamiliar ingredients may trigger brief stinging or redness.\nProlonged dryness can escalate sensitivity — proactive care now prevents deeper issues."
        },
        careDirection: {
            ko: "보습을 충분히 유지하면서 성분이 단순한 제품을 선택하는 것이 좋습니다.\n향료나 자극 성분이 들어간 제품은 피하고, 새 제품을 처음 사용할 때는 소량 패치 테스트를 먼저 해보세요.\n실내 습도를 적절히 유지하면 피부 컨디션 안정에도 도움이 됩니다.",
            en: "Maintain generous hydration while choosing formulas with minimal, non-irritating ingredients.\nAvoid fragrances and sensitizing actives; always patch-test a new product on a small area first.\nKeeping indoor humidity balanced supports skin condition through seasonal transitions."
        },
    },
    "건성 · 민감": {
        description: {
            ko: "수분 부족과 함께 외부 자극에 쉽게 반응하는 민감한 피부 상태입니다.\n건조함과 함께 붉어짐, 따가움이 반복적으로 나타날 수 있습니다.\n저자극 성분 위주의 최소한의 단계로 피부를 진정시키는 관리가 필요합니다.",
            en: "Moisture deficiency combines with heightened reactivity, making the skin easily triggered by external factors.\nDryness, redness, and stinging may appear repeatedly.\nA minimalist routine of gentle, barrier-restoring ingredients is the most effective approach."
        },
        characteristic: {
            ko: "수분 부족과 민감도가 함께 나타나 피부가 쉽게 불편해지는 상태입니다.\n건조한 환경, 히터나 에어컨, 특정 성분에 닿으면 붉어짐이나 따가움이 비교적 자주 발생합니다.\n장벽이 약해진 상태라 외부 자극이 더 민감하게 느껴질 수 있습니다.",
            en: "Concurrent dehydration and sensitivity make the skin prone to frequent discomfort.\nDry air, heating systems, air-conditioning, or specific ingredients can trigger redness and stinging with regularity.\nA compromised barrier amplifies the perception of external irritants."
        },
        careDirection: {
            ko: "자극 없는 순한 성분 위주로 스킨케어 단계를 최소화하는 것이 좋습니다.\n세안 후 바로 수분을 공급하고, 장벽 강화 성분(세라마이드, 판테놀)이 포함된 제품을 선택하세요.\n화장 솜 사용이나 강한 마사지처럼 물리적인 자극도 줄이는 것이 도움이 됩니다.",
            en: "Streamline your routine to the gentlest possible ingredients, keeping steps to a minimum.\nApply hydration immediately post-cleansing; choose formulas containing ceramides and panthenol for barrier repair.\nReduce physical friction too — avoid cotton pads with rubbing motions or aggressive massage."
        },
    },
    "건성 · 과민": {
        description: {
            ko: "피부 장벽이 크게 약화되어 외부 자극에 즉각적으로 반응하는 상태입니다.\n작은 자극에도 불편감이나 피부 트러블이 쉽게 발생할 수 있습니다.\n진정과 장벽 회복에 집중한 매우 신중한 관리가 요구됩니다.",
            en: "The skin barrier is significantly compromised, triggering an immediate response to almost any stimulus.\nEven minor contact or temperature fluctuations can cause discomfort and rapid breakout.\nExtremely cautious, barrier-focused care is required above all else."
        },
        characteristic: {
            ko: "피부 장벽이 크게 약화된 상태로, 건조함과 함께 거의 모든 자극에 즉각 반응합니다.\n가벼운 접촉이나 온도 변화만으로도 따가움, 붉어짐, 열감이 나타날 수 있습니다.\n자극이 반복될수록 피부 회복이 더 느려질 수 있어 각별한 주의가 필요합니다.",
            en: "Severe barrier damage means dryness accompanies near-immediate reactivity to virtually every stimulus.\nEven light touch or subtle temperature shifts can produce stinging, redness, and a sensation of heat.\nRepeated irritation slows recovery — exceptional care and restraint are essential."
        },
        careDirection: {
            ko: "현재 사용 중인 제품 수를 최소로 줄이고 성분이 단순한 보습제와 진정 제품만 유지하세요.\n레티놀, AHA/BHA 같은 고기능성 성분은 피부가 회복될 때까지 사용을 중단하는 것이 좋습니다.\n빠른 개선보다는 피부를 쉬게 하고 장벽 회복에 집중하는 것을 우선으로 합니다.",
            en: "Reduce your product count to the absolute minimum — retain only a simple moisturizer and a calming serum.\nPause all high-actives such as retinol, AHA, and BHA until the barrier has meaningfully recovered.\nPrioritize rest and restoration over rapid results; patience is the most powerful treatment here."
        },
    },

    // ── 중성 계열 ──────────────────────────────────────────────────
    "중성 · 비민감": {
        description: {
            ko: "유수분 밸런스가 안정적으로 유지되는 건강한 피부 상태입니다.\n외부 환경이나 성분 변화에도 피부 반응이 크지 않은 편입니다.\n기본적인 보습과 자외선 차단 위주의 관리로도 충분합니다.",
            en: "A well-balanced, healthy skin profile with stable hydration and lipid levels.\nThe skin shows minimal reactivity to environmental changes or new formulas.\nEssential hydration and consistent sun protection are all this skin truly needs."
        },
        characteristic: {
            ko: "유수분이 고루 균형 잡혀 있어 피부 상태가 전반적으로 안정적입니다.\n별다른 트러블이나 자극 반응 없이 다양한 제품을 편하게 사용할 수 있는 조건입니다.\n꾸준한 기본 관리만으로도 건강한 피부 상태를 유지할 수 있습니다.",
            en: "Moisture and oil are in harmonious balance, resulting in a consistently stable complexion.\nThe skin can tolerate a wide range of products without notable irritation or breakout.\nA disciplined basic routine is sufficient to maintain this optimal state."
        },
        careDirection: {
            ko: "자외선 차단과 기본 보습을 꾸준히 유지하는 것이 핵심입니다.\n피부 상태가 좋은 만큼 다양한 기능성 제품을 천천히 시도해볼 여유가 있습니다.\n현재의 좋은 상태를 유지하는 것이 가장 중요한 관리 목표입니다.",
            en: "Consistent sun protection and foundational moisturization are the cornerstones of this skin's care.\nWith a naturally resilient baseline, there is room to thoughtfully introduce targeted actives.\nPreserving the current balance — rather than overhauling it — is the wisest long-term strategy."
        },
    },
    "중성 · 민감 주의": {
        description: {
            ko: "전반적으로는 안정적이나 특정 조건에서 피부 반응이 나타날 수 있는 상태입니다.\n피로, 환경 변화 등에 따라 일시적인 자극을 느낄 수 있습니다.\n성분 구성이 단순한 제품으로 피부 균형을 유지하는 관리가 적합합니다.",
            en: "Generally stable, but prone to occasional reactions under specific conditions.\nFatigue, environmental shifts, or stress may introduce temporary sensitivity.\nSimple, non-reactive formulas help sustain the skin's natural equilibrium."
        },
        characteristic: {
            ko: "기본적으로 피부 균형은 잘 잡혀 있지만, 피로하거나 환경이 급변할 때 일시적으로 예민해질 수 있습니다.\n특정 성분이나 계절 변화에 따라 가끔 가벼운 자극을 느끼는 경우가 있습니다.\n평소에는 문제없지만 컨디션에 따라 피부 반응이 달라질 수 있는 상태입니다.",
            en: "The skin's baseline balance is sound, but fatigue or abrupt environmental changes can trigger brief sensitivity.\nOccasional light irritation may arise with certain ingredients or seasonal transitions.\nDay-to-day this skin performs well; variability appears only when overall condition dips."
        },
        careDirection: {
            ko: "피부 컨디션이 좋을 때와 나쁠 때의 루틴을 미리 구분해두면 관리가 편해집니다.\n평소에는 일반 제품을 사용하되, 피부가 예민해 보이는 날에는 자극이 적은 순한 제품으로 전환하세요.\n새 제품은 가급적 한 번에 하나씩 도입하는 것을 권장합니다.",
            en: "Preparing two routines — one for stable days, one for reactive days — simplifies day-to-day management.\nUse your regular formulas when skin is calm; switch to a gentler, minimal set when sensitivity is evident.\nIntroduce new products one at a time to identify any triggers clearly."
        },
    },
    "중성 · 민감": {
        description: {
            ko: "유수분 균형은 유지되지만 자극에 대한 반응성이 높은 피부입니다.\n성분 변화나 외부 자극에 따라 붉어짐이나 트러블이 발생할 수 있습니다.\n진정 성분을 포함한 균형 잡힌 관리가 필요합니다.",
            en: "Moisture and oil levels are in balance, but the skin shows elevated reactivity to stimuli.\nIngredient changes or environmental triggers may bring redness or breakouts.\nA calm, balanced routine incorporating soothing actives is most effective."
        },
        characteristic: {
            ko: "유수분 균형은 안정적이지만 외부 환경이나 성분 변화에 비교적 민감하게 반응하는 상태입니다.\n자극을 받으면 붉어지거나 따가움이 나타나지만, 수분·유분 부족으로 인한 문제는 크지 않습니다.\n자극 원인만 잘 파악하고 피하면 충분히 관리 가능한 상태입니다.",
            en: "Hydration and lipid balance are well maintained, but the skin reacts with notable sensitivity to external changes.\nRedness and stinging are the primary concerns rather than dryness or oiliness.\nIdentifying and consistently avoiding personal triggers keeps this skin fully manageable."
        },
        careDirection: {
            ko: "향료, 알코올, 고농도 기능성 성분 등 자극이 될 수 있는 요소를 미리 파악해두는 것이 중요합니다.\n보습 자체는 큰 문제가 없으므로 성분이 순한 진정 제품 위주로 선택하세요.\n세안 방식이나 마찰처럼 물리적인 자극도 줄이는 것이 도움이 됩니다.",
            en: "Map out your personal irritants — fragrances, alcohol, and high-concentration actives are common culprits.\nHydration is not the primary concern; prioritize gentle, calming formulas over heavy moisture.\nPhysical friction from cleansing and abrasive techniques should also be minimized."
        },
    },
    "중성 · 과민": {
        description: {
            ko: "기본 피부 타입은 중성이지만 외부 자극에 과도하게 반응하는 상태입니다.\n피부 컨디션 변화가 잦고 자극 후 회복이 느린 편입니다.\n피부 부담을 최소화한 진정 중심의 관리가 중요합니다.",
            en: "Despite a neutral base type, the skin overreacts to even minor external stimuli.\nCondition fluctuates frequently and recovery after irritation is slower than expected.\nA stimulus-minimizing, calm-focused routine is the priority."
        },
        characteristic: {
            ko: "피부 유수분 자체는 균형 잡혀 있지만, 자극에 대한 반응이 매우 강하게 나타나는 상태입니다.\n작은 자극에도 붉어짐, 열감, 따가움이 쉽게 생기고 피부가 정상 상태로 돌아오는 시간도 오래 걸립니다.\n장벽 기능이 약해져 있을 가능성이 높습니다.",
            en: "Hydration and oil are balanced, but the skin mounts an exaggerated response to small provocations.\nRedness, warmth, and stinging occur readily, with a prolonged recovery back to baseline.\nImpaired barrier function is likely the underlying cause."
        },
        careDirection: {
            ko: "피부를 자극하는 모든 요소를 최소화하는 것이 우선입니다.\n복잡한 스킨케어 단계보다 진정과 장벽 회복에 집중한 간소한 루틴이 더 효과적입니다.\n스크럽, 필링, 강한 각질 제거는 피부가 충분히 안정될 때까지 중단하는 것이 좋습니다.",
            en: "Every source of potential irritation must be eliminated before anything else.\nA simplified routine centered on barrier repair and calming is far more effective than a complex one.\nDiscontinue all exfoliants, scrubs, and peels until the skin has fully stabilized."
        },
    },

    // ── 지성 계열 ──────────────────────────────────────────────────
    "지성 · 비민감": {
        description: {
            ko: "피지 분비가 활발하지만 피부 장벽이 비교적 안정적으로 유지되는 상태입니다.\n유분으로 인한 번들거림은 나타나지만, 외부 자극이나 성분 변화에 대한 반응은 크지 않은 편입니다.\n과도한 유분 제거보다는 피지 밸런스를 유지하면서 수분을 안정적으로 공급하는 관리가 적합합니다.",
            en: "Sebum production is active, yet the skin barrier remains comparatively stable and resilient.\nShininess is the primary concern, while irritation from external factors or new formulas remains minimal.\nThe goal is sebum balance — not aggressive removal — alongside steady lightweight hydration."
        },
        characteristic: {
            ko: "피지 분비가 많아 번들거림과 모공이 눈에 띄지만 피부 장벽은 비교적 튼튼한 상태입니다.\n유분이 풍부해 외부 자극이나 건조한 환경에서 어느 정도 자연스러운 보호막 역할을 합니다.\n트러블이 생기더라도 비교적 빠르게 회복되는 편입니다.",
            en: "Excess sebum makes shine and enlarged pores visible, but the barrier itself is structurally sound.\nThe abundance of natural oil actually provides a degree of protection in harsh or dry environments.\nWhen blemishes do occur, recovery tends to be relatively swift."
        },
        careDirection: {
            ko: "강한 클렌징으로 유분을 과하게 제거하면 오히려 피지 분비가 늘어날 수 있습니다.\n가벼운 텍스처의 수분 제품으로 피지 밸런스를 유지하는 것이 핵심입니다.\n자외선 차단제는 산뜻하게 마무리되는 로션 타입을 선택하면 더 쾌적하게 사용할 수 있습니다.",
            en: "Over-cleansing strips oil and often triggers a compensatory surge in sebum production — avoid harsh formulas.\nLightweight, oil-free hydrators are ideal for maintaining sebum balance without adding congestion.\nOpt for a fluid or lotion-finish SPF to keep the complexion comfortable throughout the day."
        },
    },
    "지성 · 민감 주의": {
        description: {
            ko: "피지 분비가 많고 자극이 누적되기 쉬운 피부 상태입니다.\n환경 변화나 성분에 따라 트러블이 발생할 가능성이 있습니다.\n자극을 줄이면서 유수분 균형을 맞추는 관리가 필요합니다.",
            en: "High sebum production creates conditions where irritation and congestion accumulate easily.\nEnvironmental changes or reactive ingredients can increase the likelihood of breakouts.\nCare that simultaneously controls shine and reduces potential irritants is essential."
        },
        characteristic: {
            ko: "피지 분비가 활발한 동시에 특정 성분이나 환경에 가끔 반응하는 상태입니다.\n유분이 많은 편이지만 자극이 자주 노출되면 피부 반응이 달라질 수 있습니다.\n자극이 누적되면 모공 트러블로 이어지기도 합니다.",
            en: "Active sebum production is accompanied by occasional reactivity to certain ingredients or conditions.\nThe skin performs well baseline, but repeated exposure to irritants shifts its behavior.\nAccumulated stressors frequently lead to congestion and blemish formation in the pores."
        },
        careDirection: {
            ko: "유분 관리와 자극 관리를 동시에 고려한 제품 선택이 필요합니다.\n너무 강한 피지 제거 성분보다 순한 진정 성분이 함께 포함된 제품이 적합합니다.\n매일 세안 후 가벼운 수분 공급을 빠뜨리지 않는 것이 균형 유지의 핵심입니다.",
            en: "Select products that address both sebum regulation and potential irritation simultaneously.\nChoose formulas with gentle calming actives rather than aggressive sebum-stripping agents.\nNever skip lightweight post-cleansing hydration — it is the anchor of maintaining long-term balance."
        },
    },
    "지성 · 민감": {
        description: {
            ko: "피지 분비와 함께 자극 반응이 쉽게 나타나는 피부입니다.\n트러블, 붉어짐이 반복적으로 발생할 수 있습니다.\n진정과 피지 케어를 동시에 고려한 관리가 중요합니다.",
            en: "Elevated sebum production coexists with consistent sensitivity, leading to frequent reactive episodes.\nBlemishes and redness can recur in cycles.\nA dual approach — calming inflammation while regulating sebum — is the defining challenge."
        },
        characteristic: {
            ko: "유분이 많으면서도 자극 반응이 자주 나타나는 복합적인 상태입니다.\n번들거림과 트러블이 함께 발생하고, 특정 성분이나 마찰에 의해 붉어짐이나 자극이 쉽게 생깁니다.\n유분을 잡으려다 오히려 자극을 줄 수 있어 균형 잡힌 접근이 필요합니다.",
            en: "A complex combination of high sebum and frequent sensitivity creates a challenging skin environment.\nShininess and blemishes appear together; specific ingredients and friction easily provoke redness.\nAggressively targeting oil often backfires by introducing further irritation — balance is key."
        },
        careDirection: {
            ko: "자극 없이 피지를 조절할 수 있는 성분(나이아신아마이드, 티트리 등)을 중심으로 선택하세요.\n과도한 클렌징이나 스크럽은 피하고, 세안 후 자극이 없는 순한 토너로 피부를 정돈해 주세요.\n진정과 유분 케어를 동시에 할 수 있는 제품이 이 피부 상태에 가장 잘 맞습니다.",
            en: "Build your routine around ingredients that regulate sebum without irritating — niacinamide and tea tree are excellent anchors.\nAvoid over-cleansing and scrubs; follow with a gentle, non-reactive toner after washing.\nFormulas designed to both calm and regulate simultaneously are the ideal fit for this skin type."
        },
    },
    "지성 · 과민": {
        description: {
            ko: "피지 분비가 많고 피부 반응성이 매우 높은 상태입니다.\n작은 자극에도 트러블이 빠르게 발생할 수 있습니다.\n자극 요소를 최소화하고 피부 안정에 집중한 관리가 필요합니다.",
            en: "High sebum output combines with extreme reactivity, creating a volatile skin environment.\nMinor stimuli trigger rapid breakouts and inflammation.\nEvery possible irritant must be eliminated while the skin is guided back to stability."
        },
        characteristic: {
            ko: "피지 분비가 매우 많으면서 피부 반응성도 높은 까다로운 조합의 상태입니다.\n유분이 많음에도 피부 장벽이 충분히 기능하지 못해 작은 자극에도 트러블이 빠르게 나타납니다.\n유분 조절 성분이 오히려 자극이 될 수 있어 성분 선택에 더욱 신중한 주의가 필요합니다.",
            en: "Very high sebum alongside severe reactivity creates one of the most challenging skin profiles.\nDespite abundant oil, the barrier fails to protect, allowing even small triggers to cause swift breakouts.\nSebum-control actives frequently double as irritants here, demanding exceptional care in ingredient selection."
        },
        careDirection: {
            ko: "강한 피지 제거보다 피부 진정과 안정화를 우선 목표로 삼으세요.\n알코올, 고농도 AHA/BHA 같은 자극 성분은 피하고, 순하면서도 피지 균형을 잡아주는 제품을 선택하는 것이 좋습니다.\n피부가 어느 정도 안정된 후 단계적으로 기능성 성분을 추가하는 것을 권장합니다.",
            en: "Prioritize calming and stabilizing the skin over sebum reduction at this stage.\nAvoid alcohol, high-concentration AHA/BHA, and all known irritants — choose a gentle sebum-balancing formula instead.\nIntroduce targeted actives only after the skin has meaningfully stabilized, one at a time."
        },
    },

    // ── 수부지 계열 ──────────────────────────────────────────────────
    "수부지 · 비민감": {
        description: {
            ko: "겉은 번들리지만 속은 수분이 부족한 피부 상태입니다.\n피지 분비는 활발하지만 자극 반응은 크지 않습니다.\n유분 조절보다는 충분한 수분 공급이 핵심입니다.",
            en: "Surface shine masks a significant dehydration occurring beneath — the skin is oily outside, thirsty within.\nSebum production is active, yet reactivity to external stimuli remains low.\nThe priority here is deep hydration, not oil control."
        },
        characteristic: {
            ko: "피지 분비가 활발해 겉으로는 번들거리지만 피부 속은 수분이 부족한 불균형 상태입니다.\n유분이 충분해 외부 자극에는 비교적 강한 편이지만, 속당김이나 건조한 느낌을 함께 경험하는 경우가 많습니다.\n피지 조절에만 집중하면 속건조가 더 심해질 수 있습니다.",
            en: "Visible surface oiliness conceals a state of internal dehydration — a common mismatch.\nThe abundant sebum offers relative protection from external stressors, but inner tightness persists.\nFocusing solely on oil control will deepen the underlying dehydration."
        },
        careDirection: {
            ko: "유분보다 수분 공급에 집중하는 것이 중요합니다.\n기름기 없는 가벼운 수분 제품을 충분히 사용해 속 보습을 채워주세요.\n피지를 무리하게 제거하려 하면 피부가 더 많은 유분을 만들어낼 수 있으니 균형을 유지하는 방식으로 관리하는 것이 좋습니다.",
            en: "Redirect your routine's focus from oil control to genuine hydration replenishment.\nLayer lightweight, oil-free moisturizers generously to address the internal water deficit.\nForcing oil removal will signal the skin to produce even more sebum — prioritize balance over suppression."
        },
    },
    "수부지 · 민감 주의": {
        description: {
            ko: "속건조로 인해 피부 컨디션이 쉽게 흔들리는 상태입니다.\n자극이 누적되면 트러블로 이어질 수 있습니다.\n가벼운 제형의 수분 중심 관리가 적합합니다.",
            en: "Internal dehydration creates instability in skin condition that can easily shift toward sensitivity.\nAccumulated stressors may eventually manifest as visible breakouts or irritation.\nLightweight, hydration-first care is the most appropriate course of action."
        },
        characteristic: {
            ko: "속건조로 인해 피부 장벽이 조금씩 약해지고, 그로 인해 특정 환경이나 성분에 가끔 반응이 나타나는 상태입니다.\n겉은 유분이 있어 보이지만 실제로는 수분이 부족해 피부가 자극에 취약해질 수 있습니다.\n자극이 반복되면 더 예민해질 수 있는 단계라 지금부터의 관리가 중요합니다.",
            en: "Chronic internal dehydration is slowly compromising the barrier, causing occasional environmental or ingredient reactions.\nThe oily surface appearance is deceptive — underlying water deficiency leaves the skin increasingly vulnerable.\nThis is a transitional stage: consistent care now prevents a deeper sensitivity pattern from forming."
        },
        careDirection: {
            ko: "수분을 충분히 채우는 것이 민감도 완화에도 직접적인 도움이 됩니다.\n자극이 적은 가벼운 텍스처의 수분 제품을 꾸준히 사용하고, 향료나 알코올 성분은 피하는 것이 좋습니다.\n현재 사용 중인 제품 중 자극이 의심되는 것이 있다면 하나씩 확인해보는 것을 권장합니다.",
            en: "Replenishing internal hydration directly reduces the sensitivity that has begun to emerge.\nBuild a consistent routine around gentle, light-textured moisturizers; avoid fragrances and alcohol.\nIf any current product is a suspected irritant, isolate and test each one individually."
        },
    },
    "수부지 · 민감": {
        description: {
            ko: "수분 부족과 함께 자극 반응이 자주 나타나는 피부입니다.\n번들거림과 트러블이 동시에 나타날 수 있습니다.\n수분과 진정을 함께 고려한 관리가 필요합니다.",
            en: "Internal dehydration and active sensitivity occur simultaneously, making skin management complex.\nShininess and blemishes can appear together, creating a seemingly contradictory picture.\nCare that addresses both deep hydration and active calming is essential."
        },
        characteristic: {
            ko: "속건조와 자극 반응이 함께 나타나 피부가 불안정한 상태입니다.\n번들거리면서도 따가움이나 트러블이 생기는 복합적인 상황이 자주 일어납니다.\n유분이 있어 보여 보습을 소홀히 하기 쉽지만 실제로는 수분이 크게 부족한 상태입니다.",
            en: "Simultaneous dehydration and sensitivity create a persistently unstable skin environment.\nThe skin appears oily while also stinging or breaking out — a genuinely complex combination.\nThe visible oil often leads to skipping moisturizer; this is a critical mistake as deep hydration is urgently needed."
        },
        careDirection: {
            ko: "수분과 진정을 함께 챙길 수 있는 제품을 선택하는 것이 가장 중요합니다.\n기름기 없는 수분 에센스나 가벼운 젤 크림으로 속 보습을 유지하고, 자극 성분이 없는 진정 제품을 더해주세요.\n유분 제거에 과하게 집중하면 속건조와 민감도가 더 나빠질 수 있습니다.",
            en: "Choose products that deliver hydration and calming action in a single step — efficiency is key.\nA lightweight hydrating essence or gel-cream addresses the internal deficit; layer a fragrance-free calming product on top.\nOver-emphasizing oil removal will worsen both the dehydration and the sensitivity simultaneously."
        },
    },
    "수부지 · 과민": {
        description: {
            ko: "속건조와 높은 자극 반응이 동시에 나타나는 상태입니다.\n피부 컨디션이 매우 불안정한 편입니다.\n자극을 최소화하며 수분과 장벽을 함께 관리해야 합니다.",
            en: "Internal dehydration and extreme reactivity occur in tandem, creating one of the most volatile skin states.\nCondition fluctuates dramatically and is difficult to predict.\nMinimizing all irritants while simultaneously restoring hydration and barrier integrity is the only viable path."
        },
        characteristic: {
            ko: "수분과 유분 균형이 무너져 겉은 번들거리지만 속은 당기는 상태입니다.\n동시에 외부 자극에 쉽게 붉어지고 따가움을 느낍니다.\n장벽 기능이 약해져 자극 물질이 더 깊이 침투하기 쉽습니다.",
            en: "Oil-water imbalance produces a shiny surface over a parched interior — a disorienting contradiction.\nRedness and stinging arise easily in response to even gentle stimuli.\nA weakened barrier allows irritants to penetrate more deeply, compounding every reaction."
        },
        careDirection: {
            ko: "강한 각질 제거나 고농도 활성 성분은 당분간 피하는 것이 좋습니다.\n수분 공급과 장벽 강화를 우선하고, 자극이 적은 순한 제형을 선택하세요.\n새 제품은 한 번에 하나씩 천천히 추가하는 것을 권장합니다.",
            en: "Avoid all exfoliants and high-concentration actives until the skin has reached a stable baseline.\nFocus exclusively on hydration and barrier repair using the gentlest possible formulas.\nIntroduce any new product one at a time, waiting for the skin's full response before proceeding."
        },
    },

    // ── 복합성 계열 ──────────────────────────────────────────────────
    "복합성 · 비민감": {
        description: {
            ko: "부위별로 유수분 차이는 있으나 피부 반응은 비교적 안정적인 상태입니다.\nT존과 U존의 특성이 다르게 나타나지만 자극 반응은 크지 않습니다.\n부위별 특성을 고려한 균형 잡힌 관리가 적합합니다.",
            en: "Hydration and oil levels vary by zone, but overall skin reactivity remains stable.\nThe T-zone and U-zone have distinct characteristics, yet neither triggers significant irritation.\nZone-conscious, balanced care is the most effective approach for this skin."
        },
        characteristic: {
            ko: "이마와 코(T존)는 유분이 많고 뺨과 턱(U존)은 상대적으로 건조한 전형적인 복합성 피부입니다.\n부위별로 피부 특성이 다르지만 자극에 대한 반응은 전반적으로 안정적입니다.\n한 가지 제품으로 전체를 커버하기 어렵지만 피부 장벽 자체는 비교적 건강합니다.",
            en: "A textbook combination: oilier forehead and nose against comparatively drier cheeks and chin.\nDespite the zone differentiation, the skin's overall response to external stimuli is stable.\nSingle-formula coverage is challenging, but the barrier itself is in relatively sound condition."
        },
        careDirection: {
            ko: "부위별로 다른 요구에 맞게 유연하게 관리하는 것이 효과적입니다.\nT존에는 가벼운 제형을, U존에는 조금 더 보습력 있는 제품을 사용하는 방식도 좋은 방법입니다.\n전체 부위를 동일하게 관리하기보다 피부가 필요로 하는 것에 맞게 조절하세요.",
            en: "Adapt your routine flexibly to address each zone's distinct requirements.\nApply a lighter formula to the T-zone and a richer moisturizer to the U-zone for precise balance.\nRather than applying one product universally, tailor the coverage to what each area genuinely needs."
        },
    },
    "복합성 · 민감 주의": {
        description: {
            ko: "피부 부위에 따라 자극 반응이 다르게 나타나는 상태입니다.\n특정 부위는 쉽게 예민해질 수 있습니다.\n과한 기능성 제품을 피하고 순한 관리가 필요합니다.",
            en: "Irritation patterns vary by facial zone, adding complexity to management.\nCertain areas are more prone to sensitivity flares than others.\nAvoiding high-potency actives and maintaining a gentle baseline routine is the appropriate response."
        },
        characteristic: {
            ko: "T존과 U존의 피부 특성 차이가 있는 동시에, 일부 부위가 특정 환경이나 성분에 가끔 반응하는 상태입니다.\n전체적으로는 안정적이지만 자극이 쌓이면 특정 부위에서 트러블이 생길 수 있습니다.\n부위에 따라 민감도가 다르게 나타나는 경우가 많습니다.",
            en: "The characteristic T/U-zone variation is compounded by occasional reactivity in specific areas.\nOverall stability is maintained, but accumulated stressors can produce localized breakouts.\nSensitivity levels are uneven across the face, requiring zone-specific observation."
        },
        careDirection: {
            ko: "부위별 특성에 맞는 제품을 선택하되, 성분이 너무 강하지 않은 것을 고르는 것이 좋습니다.\n새 제품은 먼저 덜 예민한 부위에 테스트해보고 전체 사용 여부를 결정하세요.\n고기능성 성분은 필요한 부위에만 소량 적용하는 것이 더 안전합니다.",
            en: "Match products to each zone's needs, but keep actives gentle across the board.\nTest new products on the less reactive zones first before committing to full-face application.\nHigh-potency ingredients should be applied locally and sparingly — never as an all-over treatment."
        },
    },
    "복합성 · 민감": {
        description: {
            ko: "부위별로 민감도가 뚜렷하게 나타나는 피부입니다.\n자극에 따라 트러블이나 붉어짐이 반복될 수 있습니다.\n피부 상태에 맞춰 유연하게 관리하는 것이 중요합니다.",
            en: "Sensitivity is clearly differentiated by zone, adding a layer of complexity to every product decision.\nBreakouts and redness may recur in response to various triggers.\nAdaptive, condition-responsive care is the defining necessity for this skin type."
        },
        characteristic: {
            ko: "부위별 피부 특성 차이가 뚜렷하면서 동시에 자극 반응도 자주 나타나는 상태입니다.\nT존의 트러블과 U존의 건조 자극이 함께 나타날 수 있어 관리가 복잡하게 느껴질 수 있습니다.\n피부가 예민하게 반응하는 부위와 상황을 미리 파악해두는 것이 중요합니다.",
            en: "Distinct zonal differences are compounded by frequent reactivity, making management genuinely nuanced.\nT-zone congestion and U-zone dryness with irritation can co-occur, creating a paradoxical picture.\nMapping which zones react, to what, and under which conditions is an invaluable starting point."
        },
        careDirection: {
            ko: "전체 피부에 적용 가능한 순한 진정 제품을 기본으로 유지하는 것이 좋습니다.\n부위별로 문제가 있을 때 국소적으로 추가 케어를 더하는 방식이 효율적입니다.\n한 번에 너무 많은 기능성 제품을 시도하지 않고 피부 상태를 보면서 천천히 접근하는 것을 권장합니다.",
            en: "Anchor your routine in a gentle, universal calming product that works across all zones.\nAdd targeted treatments locally when specific areas flare, rather than changing the entire routine.\nIntroduce new actives slowly and individually — observe each zone's response before proceeding."
        },
    },
    "복합성 · 과민": {
        description: {
            ko: "부위별 자극 반응이 강하게 나타나는 불안정한 피부 상태입니다.\n피부 컨디션 변화 폭이 큰 편입니다.\n진정과 장벽 회복을 우선으로 한 관리가 필요합니다.",
            en: "Intense reactivity across all zones creates a highly unstable skin profile.\nCondition swings can be dramatic and difficult to anticipate.\nCalming the entire skin system and restoring barrier function must take precedence over everything else."
        },
        characteristic: {
            ko: "부위별로 유수분 차이가 있는 상태에서 피부 반응성이 매우 높아진 상태입니다.\n어느 부위는 건조하고 어느 부위는 유분이 있는 상황에 자극 반응까지 더해져 피부 컨디션이 불안정합니다.\n복잡한 상태인 만큼 어떤 부위에서 어떤 반응이 나타나는지 주의 깊게 살펴볼 필요가 있습니다.",
            en: "Zonal hydration imbalance is compounded by severe overall reactivity, destabilizing the complexion significantly.\nSome areas are dry, others oily, and irritation can erupt across any of them unpredictably.\nGiven the complexity, carefully observing which zone reacts to what trigger is a necessary first step."
        },
        careDirection: {
            ko: "지금 당장은 부위별 맞춤 관리보다 피부 전체를 안정시키는 것이 먼저입니다.\n성분이 단순하고 자극이 적은 진정 보습 제품으로 루틴을 최소화해 주세요.\n피부가 안정된 후 부위별 차이에 맞는 관리를 단계적으로 추가하는 것이 더 효과적입니다.",
            en: "Right now, whole-skin stabilization takes absolute priority over any zone-specific strategy.\nReduce your routine to the simplest possible calming and moisturizing essentials.\nOnce the skin has stabilized, reintroduce zone-targeted care gradually and thoughtfully."
        },
    },
};

// 진단 결과창(Analysis) 상단에 띄워줄 공식 텍스트 반환 (ko fallback)
export const getSkinDescription = (userTypeStr, language = 'ko') => {
    const data = SKIN_TYPES[userTypeStr];
    if (!data) return language === 'en' ? 'Analyzing your data.' : '데이터 분석 중입니다.';
    const desc = data.description;
    if (typeof desc === 'object') return desc[language] || desc.en;
    return typeof desc === 'string' ? desc : '';
};

// 피부 타입 전체 데이터 반환 (description + characteristic + careDirection)
export const getSkinTypeData = (userTypeStr, language = 'ko') => {
    const data = SKIN_TYPES[userTypeStr];
    if (!data) {
        const fallback = language === 'en' ? 'Analyzing your data.' : '데이터 분석 중입니다.';
        return { description: fallback, characteristic: '', careDirection: '' };
    }
    if (typeof data === 'string') return { description: data, characteristic: '', careDirection: '' };

    const pick = (field) => {
        if (typeof field === 'object' && field !== null) return field[language] || field.en || '';
        return field || '';
    };
    return {
        description: pick(data.description),
        characteristic: pick(data.characteristic),
        careDirection: pick(data.careDirection),
    };
};

// 핵심 로직: 상세 피부 타입에서 핵심(지성 등)을 뽑아 화장품 매칭
export const getRecommendedProducts = (userTypeStr) => {
    if (!userTypeStr) return [];
    let mainType = "중성";
    if (userTypeStr.includes("건성")) mainType = "건성";
    else if (userTypeStr.includes("수부지")) mainType = "수부지";
    else if (userTypeStr.includes("지성")) mainType = "지성";
    else if (userTypeStr.includes("복합성")) mainType = "복합성";
    return ALL_PRODUCTS.filter(product => product.skinType === mainType);
};
