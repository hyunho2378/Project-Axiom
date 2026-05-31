export const SKIN_TYPES = ['건성', '중성', '지성', '수부지', '복합성'];

export const PRODUCTS = {
  toner: [
    {
      skinType: '건성', nameKo: '히알루론산 수분 진정 토너', nameEn: 'Hyaluronic Acid Hydrating & Calming Toner',
      desc: { ko: '히알루론산과 진정 성분을 함유하여 건조하고 민감한 피부에 수분을 공급하고 편안하게 진정해 줍니다.', en: 'Formulated with hyaluronic acid and soothing actives to deeply hydrate and calm dry, stressed skin.' },
      texture: { ko: '콧물 워터 제형 / 촉촉 흡수', en: 'Watery essence / dewy absorption' },
      ingredients: '히알루론산, 세라마이드, 판테놀', ingredientsEn: ['Hyaluronic Acid', 'Ceramide', 'Panthenol'], functional: '', volume: '150ml', price: 18000
    },
    {
      skinType: '중성', nameKo: '히알루론산 밸런스 토너', nameEn: 'Hyaluronic Acid Balance Toner',
      desc: { ko: '히알루론산을 함유하여 피부의 수분 밸런스를 맞추고 하루 종일 촉촉한 피부 컨디션을 유지해 줍니다.', en: "Hyaluronic acid perfects the skin's moisture balance, maintaining a comfortable, dewy condition throughout the day." },
      texture: { ko: '가벼운 워터 제형 / 빠르게 흡수', en: 'Lightweight water formula / fast-absorbing' },
      ingredients: '히알루론산, 알란토인', ingredientsEn: ['Hyaluronic Acid', 'Allantoin'], functional: '', volume: '150ml', price: 16000
    },
    {
      skinType: '지성', nameKo: '티트리 진정 토너', nameEn: 'Tea Tree Calming Toner',
      desc: { ko: '티트리 추출물과 칼라민을 함유하여 과도한 유분을 정돈하고 예민해진 피부를 진정해 줍니다.', en: 'Tea tree extract and calamine work in concert to refine excess sebum and soothe a reactive complexion.' },
      texture: { ko: '워터 제형 / 산뜻 마무리', en: 'Water formula / fresh finish' },
      ingredients: '티트리, 칼라민, 병풀 추출물', ingredientsEn: ['Tea Tree', 'Calamine', 'Centella'], functional: '', volume: '150ml', price: 17000
    },
    {
      skinType: '수부지', nameKo: '어성초 수분 진정 토너', nameEn: 'Heartleaf Hydrating & Calming Toner',
      desc: { ko: '어성초 추출물을 함유하여 민감해진 피부에 수분과 진정을 동시에 제공해 줍니다.', en: 'Heartleaf extract provides simultaneous hydration and calming, precisely formulated for reactive skin.' },
      texture: { ko: '워터 제형 / 산뜻 마무리', en: 'Water formula / fresh finish' },
      ingredients: '어성초, 글리세린, 판테놀', ingredientsEn: ['Heartleaf', 'Glycerin', 'Panthenol'], functional: '', volume: '150ml', price: 18000
    },
    {
      skinType: '복합성', nameKo: '시카 카밍 토너', nameEn: 'Cica Calming Toner',
      desc: { ko: '시카 성분을 함유하여 외부 자극으로 예민해진 피부를 부드럽게 진정해 줍니다.', en: 'Infused with cica complex to gently soothe skin sensitized by daily environmental stressors.' },
      texture: { ko: '워터 제형 / 빠르게 흡수', en: 'Water formula / fast-absorbing' },
      ingredients: '병풀, 마데카소사이드', ingredientsEn: ['Centella', 'Madecassoside'], functional: '', volume: '150ml', price: 19000
    },
  ],
  ampoule: [
    {
      skinType: '건성', nameKo: '히알루론산 물광 보습 앰플', nameEn: 'Hyaluronic Acid Glow Hydrating Ampoule',
      desc: { ko: '고함량 히알루론산을 함유하여 피부 속까지 수분을 채워 윤기 있는 피부로 관리해 줍니다.', en: 'High-concentration hyaluronic acid saturates skin from within for a visibly luminous, deeply hydrated finish.' },
      texture: { ko: '콧물 젤 에센스 제형 / 천천히 흡수', en: 'Gel essence / slow-absorbing for deep saturation' },
      ingredients: '히알루론산, 판테놀, 베타글루칸', ingredientsEn: ['Hyaluronic Acid', 'Panthenol', 'Beta-Glucan'], functional: '미백 기능성', volume: '50ml', price: 22000
    },
    {
      skinType: '중성', nameKo: '세라마이드 배리어 에센스', nameEn: 'Ceramide Barrier Essence',
      desc: { ko: '세라마이드 성분을 함유하여 약해진 피부 장벽을 강화하고 수분 손실을 방지해 줍니다.', en: 'Ceramide technology reinforces a weakened barrier and seals in essential moisture against transepidermal loss.' },
      texture: { ko: '밀도감 있는 에센스 제형 / 피부 밀착', en: 'Dense essence / skin-adhering absorption' },
      ingredients: '세라마이드, 콜레스테롤', ingredientsEn: ['Ceramide', 'Cholesterol'], functional: '미백 기능성', volume: '50ml', price: 24000
    },
    {
      skinType: '지성', nameKo: '시카 리페어 앰플', nameEn: 'Cica Repair Ampoule',
      desc: { ko: '시카 유래 진정 성분을 함유하여 자극받은 피부를 빠르게 진정해 줍니다.', en: 'Centella-derived actives work swiftly to soothe and restore skin compromised by daily irritation.' },
      texture: { ko: '가벼운 젤 제형 / 빠르게 흡수', en: 'Lightweight gel / fast-absorbing' },
      ingredients: '병풀, 마데카소사이드, 판테놀', ingredientsEn: ['Centella', 'Madecassoside', 'Panthenol'], functional: '미백·주름 개선 2중 기능성', volume: '50ml', price: 23000
    },
    {
      skinType: '수부지', nameKo: '징크 티트리 앰플', nameEn: 'Zinc Tea Tree Ampoule',
      desc: { ko: '징크와 티트리 성분을 함유하여 유분 밸런스를 조절하고 피부 결을 정돈해 줍니다.', en: 'Zinc PCA and tea tree regulate sebum balance while refining texture for a clarified, even complexion.' },
      texture: { ko: '수분 젤 제형 / 빠르게 흡수, 산뜻 마무리', en: 'Hydrating gel / fast-absorbing, fresh finish' },
      ingredients: '징크 PCA, 티트리, 나이아신아마이드', ingredientsEn: ['Zinc PCA', 'Tea Tree', 'Niacinamide'], functional: '미백·주름 개선 2중 기능성', volume: '50ml', price: 21000
    },
    {
      skinType: '복합성', nameKo: '병풀 진정 앰플', nameEn: 'Centella Calming Ampoule',
      desc: { ko: '병풀 추출물을 함유하여 불안정한 피부 상태를 편안하게 진정해 줍니다.', en: 'Centella asiatica restores calm and stability to an unsettled, environmentally stressed complexion.' },
      texture: { ko: '묽은 에센스 / 고르게 촉촉 흡수', en: 'Thin essence / evenly absorbed' },
      ingredients: '병풀, 알란토인', ingredientsEn: ['Centella', 'Allantoin'], functional: '미백·주름 개선 2중 기능성', volume: '50ml', price: 22000
    },
  ],
  tube: [
    {
      skinType: '건성', nameKo: '판테놀 리페어 크림', nameEn: 'Panthenol Repair Cream',
      desc: { ko: '판테놀 성분을 함유하여 건조로 손상된 피부를 촉촉하게 회복시켜 줍니다.', en: 'Panthenol-rich formula intensely repairs moisture-depleted skin, restoring a supple, resilient feel.' },
      texture: { ko: '리치한 크림 제형 / 끈적임 없이 촉촉 흡수', en: 'Rich cream / non-sticky, moisturizing absorption' },
      ingredients: '판테놀, 세라마이드', ingredientsEn: ['Panthenol', 'Ceramide'], functional: '주름 개선 기능성', volume: '100ml', price: 20000
    },
    {
      skinType: '중성', nameKo: '히알루론산 저자극 크림', nameEn: 'Hyaluronic Acid Gentle Cream',
      desc: { ko: '히알루론산을 함유하여 자극 없이 수분을 공급하고 편안한 사용감을 제공합니다.', en: 'Hyaluronic acid delivers pure, irritation-free hydration in a gentle texture that absorbs effortlessly.' },
      texture: { ko: '부드러운 크림 제형 / 끈적임 없이 촉촉 흡수', en: 'Soft cream / non-sticky, moisturizing absorption' },
      ingredients: '히알루론산, 알란토인', ingredientsEn: ['Hyaluronic Acid', 'Allantoin'], functional: '미백 기능성', volume: '100ml', price: 19000
    },
    {
      skinType: '지성', nameKo: '어성초 오일프리 크림', nameEn: 'Heartleaf Oil-Free Cream',
      desc: { ko: '어성초 성분을 함유하여 번들거림 없이 산뜻한 보습 관리를 도와줍니다.', en: 'Heartleaf extract delivers weightless, oil-free moisture for a fresh, non-greasy finish throughout the day.' },
      texture: { ko: '젤 크림 타입 / 산뜻 마무리', en: 'Gel-cream / fresh finish' },
      ingredients: '어성초, 나이아신아마이드, 판테놀', ingredientsEn: ['Heartleaf', 'Niacinamide', 'Panthenol'], functional: '', volume: '100ml', price: 19000
    },
    {
      skinType: '수부지', nameKo: '티트리 장벽 케어 크림', nameEn: 'Tea Tree Barrier Care Cream',
      desc: { ko: '티트리 성분을 함유하여 유분을 정돈하고 피부 장벽을 보호해 줍니다.', en: 'Tea tree refines and balances sebum while a ceramide complex shields the barrier from external stressors.' },
      texture: { ko: '젤, 크림 중간 / 유분 잡는 산뜻 마무리', en: 'Gel-cream hybrid / oil-controlling fresh finish' },
      ingredients: '티트리, 세라마이드, 판테놀', ingredientsEn: ['Tea Tree', 'Ceramide', 'Panthenol'], functional: '', volume: '100ml', price: 21000
    },
    {
      skinType: '복합성', nameKo: '병풀 수딩 크림', nameEn: 'Centella Soothing Cream',
      desc: { ko: '병풀 추출물을 함유하여 일상 속 자극받은 피부를 부드럽게 진정해 줍니다.', en: 'Centella asiatica gently calms daily irritation for a consistently comfortable, balanced complexion.' },
      texture: { ko: '산뜻 크림 제형 / 빠르게 흡수', en: 'Light cream / fast-absorbing' },
      ingredients: '병풀, 알란토인, 마데카소사이드', ingredientsEn: ['Centella', 'Allantoin', 'Madecassoside'], functional: '', volume: '100ml', price: 20000
    },
  ],
  sunscreen: [
    {
      skinType: '건성', nameKo: '히알루론산 무기자차 선크림', nameEn: 'Hyaluronic Acid Mineral Sunscreen',
      desc: { ko: '히알루론산을 함유하여 수분을 유지하면서 자외선을 효과적으로 차단해 줍니다.', en: 'Hyaluronic acid sustains essential hydration while mineral filters deliver broad-spectrum UV protection.' },
      texture: { ko: '촉촉하게 흐르는 제형', en: 'Fluid formula with a dewy finish' },
      ingredients: '징크옥사이드, 히알루론산, 판테놀', ingredientsEn: ['Zinc Oxide', 'Hyaluronic Acid', 'Panthenol'], functional: 'SPF50+ PA++++', volume: '100ml', price: 21000
    },
    {
      skinType: '중성', nameKo: '라이트 데일리 무기자차 선크림', nameEn: 'Light Daily Mineral Sunscreen',
      desc: { ko: '가벼운 제형으로 피부 부담 없이 데일리 자외선 차단을 도와줍니다.', en: 'A featherlight mineral formula for effortless daily UV protection without compromising skin comfort.' },
      texture: { ko: '촉촉 흐르는 제형', en: 'Fluid, comfortable texture' },
      ingredients: '징크옥사이드, 알란토인', ingredientsEn: ['Zinc Oxide', 'Allantoin'], functional: 'SPF50+ PA++++', volume: '100ml', price: 20000
    },
    {
      skinType: '지성', nameKo: '징크 밸런싱 선크림', nameEn: 'Zinc Balancing Sunscreen',
      desc: { ko: '징크 성분을 함유하여 유분 밸런스를 고려한 자외선 차단 케어를 제공합니다.', en: 'Zinc-infused mineral protection calibrated to the sebum-prone skin type for a matte, controlled finish.' },
      texture: { ko: '산뜻한 로션 제형', en: 'Fresh lotion formula' },
      ingredients: '징크옥사이드, 나이아신아마이드, 티트리', ingredientsEn: ['Zinc Oxide', 'Niacinamide', 'Tea Tree'], functional: 'SPF50+ PA++++', volume: '100ml', price: 22000
    },
    {
      skinType: '수부지', nameKo: '시카 진정 선크림', nameEn: 'Cica Calming Sunscreen',
      desc: { ko: '시카 성분을 함유하여 민감한 피부를 진정시키며 자외선을 차단해 줍니다.', en: 'Cica complex calms reactive skin while mineral filters provide reliable daily UV protection.' },
      texture: { ko: '산뜻한 로션 제형', en: 'Fresh lotion formula' },
      ingredients: '징크옥사이드, 병풀, 판테놀', ingredientsEn: ['Zinc Oxide', 'Centella', 'Panthenol'], functional: 'SPF50+ PA++++', volume: '100ml', price: 22000
    },
    {
      skinType: '복합성', nameKo: '무기자차 밸런싱 선크림', nameEn: 'Mineral Balancing Sunscreen',
      desc: { ko: '무기 자외선 차단 성분을 사용해 피부 타입에 맞춘 균형 잡힌 보호를 제공합니다.', en: 'Mineral protection designed to balance the complex, zone-specific demands of combination skin.' },
      texture: { ko: '크림 로션 중간 제형', en: 'Cream-lotion hybrid formula' },
      ingredients: '징크옥사이드, 알란토인, 세라마이드', ingredientsEn: ['Zinc Oxide', 'Allantoin', 'Ceramide'], functional: 'SPF50+ PA++++', volume: '100ml', price: 21000
    },
  ],
  jar: [
    {
      skinType: '건성', nameKo: '시어버터 인텐스 리페어 크림', nameEn: 'Shea Butter Intense Repair Cream',
      desc: { ko: '시어버터를 함유하여 깊은 건조로 거칠어진 피부를 집중적으로 케어해 줍니다.', en: 'Shea butter provides intensive repair for rough, deeply parched skin, restoring softness and elasticity.' },
      texture: { ko: '보습 좋은 밤 제형 / 천천히 흡수', en: 'Nourishing balm / slow-absorbing for deep hydration' },
      ingredients: '시어버터, 세라마이드, 스쿠알란', ingredientsEn: ['Shea Butter', 'Ceramide', 'Squalane'], functional: '', volume: '60ml', price: 26000
    },
    {
      skinType: '중성', nameKo: '세라마이드 보습 크림', nameEn: 'Ceramide Moisturizing Cream',
      desc: { ko: '세라마이드 성분을 함유하여 피부 보습막을 형성하고 촉촉함을 오래 유지해 줍니다.', en: 'Ceramide forms a lasting moisture-lock shield to keep skin comfortably hydrated for extended wear.' },
      texture: { ko: '밀도 있는 크림 제형 / 촉촉 오래 유지', en: 'Dense cream / long-lasting moisture retention' },
      ingredients: '세라마이드', ingredientsEn: ['Ceramide'], functional: '', volume: '60ml', price: 24000
    },
    {
      skinType: '지성', nameKo: '병풀 진정 크림', nameEn: 'Centella Calming Cream',
      desc: { ko: '병풀 성분을 함유하여 민감해진 피부를 편안하게 진정해 줍니다.', en: 'Centella complex calms sensitized skin with lasting, effortless comfort.' },
      texture: { ko: '가벼운 젤 크림 타입 / 산뜻 마무리', en: 'Light gel-cream / fresh finish' },
      ingredients: '병풀, 판테놀, 알란토인', ingredientsEn: ['Centella', 'Panthenol', 'Allantoin'], functional: '', volume: '60ml', price: 23000
    },
    {
      skinType: '수부지', nameKo: '판테놀 장벽 크림', nameEn: 'Panthenol Barrier Cream',
      desc: { ko: '판테놀을 함유하여 피부 장벽을 강화하고 외부 자극으로부터 보호해 줍니다.', en: 'Panthenol fortifies the skin barrier and shields against the cumulative stresses of external exposure.' },
      texture: { ko: '크림 제형 / 겉보속촉', en: 'Cream formula / dewy exterior, moisturized interior' },
      ingredients: '판테놀, 세라마이드, 스쿠알란', ingredientsEn: ['Panthenol', 'Ceramide', 'Squalane'], functional: '', volume: '60ml', price: 25000
    },
    {
      skinType: '복합성', nameKo: '시카 리페어 크림', nameEn: 'Cica Repair Cream',
      desc: { ko: '시카 성분을 함유하여 반복되는 자극으로 지친 피부를 건강하게 관리해 줍니다.', en: 'Cica complex repairs the cumulative effects of repeated daily stressors, guiding skin back to health.' },
      texture: { ko: '크림 제형 / 고르게 흡수', en: 'Cream formula / even absorption' },
      ingredients: '병풀, 마데카소사이드, 판테놀', ingredientsEn: ['Centella', 'Madecassoside', 'Panthenol'], functional: '', volume: '60ml', price: 24000
    },
  ],
};

export const CATEGORIES = [
  { key: 'all', label: { ko: '전체', en: 'All' } },
  { key: 'toner', label: { ko: '토너', en: 'Toner' } },
  { key: 'ampoule', label: { ko: '앰플', en: 'Ampoule' } },
  { key: 'tube', label: { ko: '튜브 크림', en: 'Tube Cream' } },
  { key: 'sunscreen', label: { ko: '선크림', en: 'Sunscreen' } },
  { key: 'jar', label: { ko: '원형 크림', en: 'Jar Cream' } },
];

export function getRecommendedProducts(skinType) {
  return Object.entries(PRODUCTS).map(([type, list]) => {
    const match = list.find(p => p.skinType === skinType);
    return match ? { ...match, productType: type } : null;
  }).filter(Boolean);
}

export function getAllProducts() {
  return Object.entries(PRODUCTS).flatMap(([type, list]) =>
    list.map(p => ({ ...p, productType: type }))
  );
}

export function formatPrice(price) {
  return '₩' + price.toLocaleString('ko-KR');
}
