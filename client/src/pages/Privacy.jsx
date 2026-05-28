import { motion } from 'framer-motion';

/**
 * AXIOM Privacy Policy
 *
 * Design: Luxury Research Archive aesthetic
 * - Deep black background, thin dividers (#222)
 * - Serif headings, Sans body, Mono labels/data points
 * - max-w-7xl mx-auto px-6 container
 */

const SECTIONS = [
    {
        index: '01',
        title: '수집하는 개인정보의 항목',
        body: [
            'AXIOM은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.',
            '필수 항목: 이메일 주소, 비밀번호(암호화 저장), 사용자 이름',
            '선택 항목: 성별, 연령대 (피부 진단 정확도 향상 목적)',
            '자동 수집 항목: 서비스 이용 기록, 접속 로그, IP 주소, 기기 정보',
            '피부 분석 데이터: 설문 응답 데이터, AI 진단 결과, 피부 타입 분류, 유분도·민감도 수치',
        ],
    },
    {
        index: '02',
        title: '개인정보의 수집 및 이용 목적',
        body: [
            '수집된 정보는 다음의 목적으로만 사용됩니다.',
            '회원 식별 및 계정 관리',
            'AI 기반 피부 진단 알고리즘의 정밀도 향상을 위한 익명 통계 분석',
            '개인화된 스킨케어 솔루션 및 제품 처방 도출',
            '서비스 품질 개선 및 신규 연구 기능 개발',
            '법령에 따른 의무 이행',
        ],
    },
    {
        index: '03',
        title: '개인정보의 보유 및 이용 기간',
        body: [
            '회원 탈퇴 시 또는 개인정보 처리 목적 달성 후 지체 없이 파기합니다.',
            '단, 관련 법령에 의해 일정 기간 보존이 필요한 경우 해당 기간 동안 보관합니다.',
            '전자상거래 등에서의 소비자 보호에 관한 법률: 계약 및 청약철회 기록 5년',
            '전자금융거래법: 전자금융거래 기록 5년',
            '통신비밀보호법: 로그인 기록 3개월',
        ],
    },
    {
        index: '04',
        title: '개인정보의 제3자 제공',
        body: [
            'AXIOM은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.',
            '다만, 이용자의 사전 동의가 있거나 법령의 규정에 의한 경우, 또는 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에 한해 제공합니다.',
            'Google 로그인 사용 시, Google LLC의 OAuth 2.0 프로토콜을 통해 인증 정보가 처리됩니다. 이 과정은 Google의 개인정보처리방침을 따릅니다.',
        ],
    },
    {
        index: '05',
        title: '피부 분석 데이터의 특별 보호',
        body: [
            'AI 피부 진단을 통해 수집된 모든 데이터는 고도로 암호화되어 저장됩니다.',
            '피부 유분도, 민감도, 피부 타입 분류 정보는 오직 해당 이용자 본인의 처방 도출에만 활용됩니다.',
            '집계된 통계 데이터는 개인 식별이 불가능한 형태로만 연구 목적으로 활용됩니다.',
            '이용자는 언제든지 본인의 피부 분석 데이터 삭제를 요청할 수 있으며, 요청 접수 후 72시간 이내에 처리됩니다.',
        ],
    },
    {
        index: '06',
        title: '이용자의 권리와 행사 방법',
        body: [
            '이용자는 언제든지 등록된 개인정보를 열람, 수정, 삭제 요청할 권리가 있습니다.',
            '개인정보 처리에 대한 동의를 언제든지 철회할 수 있습니다.',
            '개인정보 관련 요청은 고객센터 또는 이메일을 통해 접수하며, 접수 후 10일 이내에 처리합니다.',
            '만 14세 미만 아동의 개인정보는 수집하지 않습니다.',
        ],
    },
    {
        index: '07',
        title: '개인정보의 안전성 확보 조치',
        body: [
            '관리적 조치: 개인정보 처리 직원 최소화, 정기적 내부 감사 실시',
            '기술적 조치: 개인정보처리시스템 접근 통제, 전송 데이터 암호화(TLS 1.3), 비밀번호 단방향 암호화(bcrypt)',
            '물리적 조치: 외부 클라우드 인프라(Supabase PostgreSQL)를 통한 물리적 접근 통제',
        ],
    },
    {
        index: '08',
        title: '개인정보 처리방침의 변경',
        body: [
            '본 방침은 법령 및 서비스 변경 사항을 반영하기 위해 수시로 수정될 수 있습니다.',
            '방침 변경 시 시행일 7일 전부터 서비스 화면을 통해 공지합니다.',
            '중요한 변경 사항의 경우 이메일로 별도 안내합니다.',
        ],
    },
];

const LineDivider = () => <div className="border-t border-[#222] w-full my-12" />;

export default function Privacy() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#3C7795]/30 selection:text-white">

            {/* Hero */}
            <section className="pt-40 pb-20 border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="font-body text-[10px] text-[#3C7795] tracking-[0.3em] uppercase mb-6">
                            Legal Document · v2.1 · 2026.01
                        </p>
                        <h1 className="font-title-en text-3xl md:text-5xl text-white leading-title mb-6">
                            Privacy Policy
                        </h1>
                        <p className="font-body text-[#8AAEC0] text-base leading-body max-w-2xl">
                            AXIOM Inc.(이하 '회사')은 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 및 관련 법령을 준수합니다.
                            본 개인정보처리방침은 회사가 제공하는 서비스(이하 'AXIOM')를 이용하는 과정에서
                            수집·이용·보관·파기되는 개인정보에 관한 사항을 규정합니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sticky sidebar — hidden on mobile, full sidebar on md+ */}
                    <div className="hidden md:block lg:col-span-3">
                        <div className="lg:sticky lg:top-32 space-y-2">
                            <p className="font-body text-[10px] text-[#3C7795] tracking-[0.2em] uppercase mb-4">목차</p>
                            {SECTIONS.map((s) => (
                                <a
                                    key={s.index}
                                    href={`#section-${s.index}`}
                                    className="block font-body text-[11px] text-[#444] hover:text-[#8AAEC0] tracking-wider transition-colors py-1"
                                >
                                    {s.index} · {s.title}
                                </a>
                            ))}
                            <LineDivider />
                            <p className="font-body text-[9px] text-[#333] leading-relaxed">
                                시행일: 2026년 01월 01일<br />
                                최종 수정일: 2026년 04월 12일
                            </p>
                        </div>
                    </div>

                    {/* Body — full width on mobile, 9-col on lg */}
                    <div className="lg:col-span-9 space-y-16">
                        {SECTIONS.map((section, i) => (
                            <motion.div
                                key={section.index}
                                id={`section-${section.index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-body text-[10px] text-[#3C7795] tracking-[0.2em]">{section.index}</span>
                                    <div className="flex-1 h-[1px] bg-[#222]" />
                                </div>
                                <h2 className="font-title-ko text-xl md:text-2xl text-white leading-title mb-6">
                                    {section.title}
                                </h2>
                                <ul className="space-y-3">
                                    {section.body.map((line, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            {j > 0 && (
                                                <span className="mt-[9px] w-1 h-1 rounded-full bg-[#3C7795]/40 flex-shrink-0" />
                                            )}
                                            <p className={`font-body text-sm leading-body ${j === 0 ? 'text-white/60 font-medium' : 'text-[#8AAEC0]'} ${j > 0 ? '' : 'w-full'}`}>
                                                {line}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}

                        <LineDivider />

                        {/* Contact */}
                        <div>
                            <p className="font-body text-[10px] text-[#3C7795] tracking-[0.2em] uppercase mb-4">개인정보 보호 책임자</p>
                            <div className="bg-[#05080a] border border-[#222] rounded-2xl p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'ORGANIZATION', value: 'AXIOM Inc.' },
                                        { label: 'DEPARTMENT', value: '개인정보보호팀' },
                                        { label: 'EMAIL', value: 'privacy@axiom.studio' },
                                        { label: 'JURISDICTION', value: '대한민국 서울특별시' },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <p className="font-body text-[9px] text-[#444] tracking-[0.2em] mb-1">{item.label}</p>
                                            <p className="font-body text-sm text-[#8AAEC0]">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer stamp */}
            <div className="border-t border-[#111] py-12 text-center">
                <span className="font-body text-[#333] text-[10px] tracking-[0.4em] uppercase">
                    © 2026 AXIOM Inc. — Define Your Axis.
                </span>
            </div>
        </div>
    );
}
