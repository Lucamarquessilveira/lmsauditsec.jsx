import { useState, useEffect, useRef } from "react";

const GOLD = "#C5A059";
const GOLD_LIGHT = "#D4B97A";
const NAVY = "#020617";
const NAVY_MID = "#0a1628";
const NAVY_LIGHT = "#0f2040";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${NAVY};
    color: #e2e8f0;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  :root {
    --gold: ${GOLD};
    --gold-light: ${GOLD_LIGHT};
    --navy: ${NAVY};
    --navy-mid: ${NAVY_MID};
    --navy-light: ${NAVY_LIGHT};
  }

  .space-grotesk { font-family: 'Space Grotesk', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(197,160,89,0.4); }
    50% { box-shadow: 0 0 0 12px rgba(197,160,89,0); }
  }

  @keyframes gridFlow {
    0% { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
    
  @keyframes pulse-soc-border {
    0% { border-color: rgba(197,160,89,0.2); box-shadow: 0 0 0 transparent; }
    100% { border-color: rgba(197,160,89,0.8); box-shadow: 0 0 25px rgba(197,160,89,0.2); }
  }

  .animate-fade-up { animation: fadeUp 0.7s ease forwards; }
  .animate-fade-in { animation: fadeIn 0.5s ease forwards; }
  .animate-float { animation: float 4s ease-in-out infinite; }

  .grid-bg {
    background-image:
      linear-gradient(rgba(197,160,89,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(197,160,89,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridFlow 8s linear infinite;
  }

  .gold-shimmer {
    background: linear-gradient(
      90deg,
      ${GOLD} 0%,
      ${GOLD_LIGHT} 40%,
      #fff8e8 50%,
      ${GOLD_LIGHT} 60%,
      ${GOLD} 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    border: 1px solid ${GOLD};
    color: ${GOLD};
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 16px 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${GOLD};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
  }

  .cta-btn:hover::before { transform: scaleX(1); }
  .cta-btn:hover { color: ${NAVY}; animation: pulse-gold 1s ease; }

  .cta-btn-primary {
    background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%);
    border: none;
    color: ${NAVY};
    animation: none;
  }
  .cta-btn-primary::before { background: ${GOLD_LIGHT}; }
  .cta-btn-primary:hover { color: ${NAVY}; transform: scale(1.02); }

  .card-elite {
    background: linear-gradient(135deg, rgba(15,32,64,0.6) 0%, rgba(10,22,40,0.8) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(197,160,89,0.15);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
  }

  .card-elite::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .card-elite:hover {
    border-color: rgba(197,160,89,0.5);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(197,160,89,0.15), 0 0 40px rgba(197,160,89,0.05);
  }

  .card-elite:hover::before { opacity: 1; }

  .divider-gold {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    margin: 0 auto;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(197,160,89,0.1);
    border: 1px solid rgba(197,160,89,0.3);
    color: ${GOLD};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 4px;
  }

  .hex-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(197,160,89,0.1);
    border: 1px solid rgba(197,160,89,0.3);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    font-size: 22px;
    flex-shrink: 0;
  }

  .price-card-featured {
    background: linear-gradient(135deg, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.04) 100%);
    border: 1px solid rgba(197,160,89,0.6);
    position: relative;
    overflow: hidden;
  }

  .price-card-featured::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(197,160,89,0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  .price-card-soc {
    background: linear-gradient(135deg, rgba(5,10,20,0.95) 0%, rgba(2,5,10,0.98) 100%);
    border: 1px solid rgba(197,160,89,0.3);
    position: relative;
    overflow: hidden;
    animation: pulse-soc-border 3s infinite alternate;
  }

  .scanline-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent);
    animation: scanline 6s linear infinite;
    pointer-events: none;
    z-index: 9999;
  }

  .section-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 100px;
    font-weight: 900;
    color: rgba(197,160,89,0.04);
    position: absolute;
    top: -30px;
    left: 0;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    transition: all 0.3s ease;
  }

  nav.scrolled {
    background: rgba(2,6,23,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(197,160,89,0.15);
  }

  .terminal-text {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 12px;
    color: rgba(197,160,89,0.6);
    letter-spacing: 1px;
  }

  .rotating-ring {
    position: absolute;
    border: 1px solid rgba(197,160,89,0.1);
    border-radius: 50%;
    animation: rotateSlow 20s linear infinite;
  }

  .use-visible { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .use-visible.visible { opacity: 1; transform: translateY(0); }
`;

function useScrollVisible(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useScrollVisible(ref);
  return (
    <div
      ref={ref}
      className={`use-visible ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const niches = [
  {
    icon: "⚖",
    title: "Escritórios de Advocacia",
    sub: "Sigilo Processual",
    desc: "Proteja o sigilo processual e evite o vazamento de dados estratégicos de clientes e processos confidenciais. Responsabilidade civil LGPD.",
  },
  {
    icon: "✚",
    title: "Clínicas Médicas",
    sub: "Dados Sensíveis / LGPD",
    desc: "Prontuários e dados sensíveis de pacientes exigem máxima proteção. Evite multas pesadas e processos por vazamento de informações médicas.",
  },
  {
    icon: "⬡",
    title: "Escritórios Contábeis",
    sub: "Dados Fiscais",
    desc: "Você guarda a chave do cofre dos seus clientes. Senhas de portais governamentais e dados fiscais são alvos prioritários de hackers.",
  },
  {
    icon: "◈",
    title: "E-commerce & Varejo",
    sub: "Prevenção de Ataques",
    desc: "Seu site fora do ar durante uma promoção significa vendas perdidas. Identificamos vulnerabilidades antes que virem sequestro de dados.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Check-up de Vulnerabilidades",
    desc: "Varredura automatizada e profunda em seu domínio. Identificamos portas abertas, certificados, SPF/DMARC, headers de segurança e vetores de ataque antes que os hackers os explorem.",
    icon: "⬡",
  },
  {
    num: "02",
    title: "Vigilância Digital Inteligente",
    desc: "Centro de Operações de Segurança (SOC) com monitoramento contínuo. Alertas em tempo real via Telegram e WhatsApp. Resposta ativa automatizada contra invasões.",
    icon: "◉",
  },
  {
    num: "03",
    title: "Conformidade e Proteção Jurídica",
    desc: "Laudos técnicos de conformidade LGPD gerados de forma precisa. Documentação que protege sua empresa juridicamente e demonstra diligência e profissionalismo.",
    icon: "⚖",
  },
];

const plans = [
  {
    name: "START",
    price: "R$ 149,99",
    desc: "O essencial para saber se você está exposto e corrigir falhas iniciais.",
    featured: false,
    isSoc: false,
    items: [
      "Varredura Mensal de Portas Críticas",
      "Verificação SSL e Redirecionamento HTTPS",
      "Relatório Mensal de Vulnerabilidades (PDF)",
      "Alertas de Segurança via E-mail",
    ],
    cta: "Assinar Start",
  },
  {
    name: "PRO PREMIUM",
    price: "R$ 249,99",
    desc: "Monitoramento completo e proteção avançada para empresas ativas.",
    featured: true,
    isSoc: false,
    badge: "MAIS ESCOLHIDO",
    items: [
      "Tudo do Plano START, mais:",
      "Varredura Semanal (4× mais frequente)",
      "Verificação SPF, DMARC e Anti-Phishing",
      "Análise HSTS e Anti-Clickjacking",
      "Histórico de Evolução de Segurança",
      "Suporte Prioritário via WhatsApp",
    ],
    cta: "Assinar Pro",
  },
  {
    name: "SOC ELITE",
    price: "Sob Consulta",
    desc: "Proteção de nível corporativo e resposta ativa em tempo real.",
    featured: false,
    isSoc: true,
    badge: "MDR / EXCLUSIVO",
    items: [
      "Proteção de Endpoints Corporativos",
      "Guilhotina Digital — corte em milissegundos",
      "Detecção e Resposta a Ransomware (SOC)",
      "Monitoramento 24/7 com Analista Dedicado",
      "Relatórios Executivos Mensais",
    ],
    cta: "Falar com Especialista",
  },
];

export default function LMAuditSec() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNiche, setActiveNiche] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="scanline-overlay" />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: GOLD }}>⬡</div>
            <span className="space-grotesk" style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 1.5 }}>LM <span style={{ color: GOLD }}>AuditSec</span></span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Riscos", "Como Funciona", "Planos"].map(item => (
              <span key={item} style={{ fontSize: 13, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: "rgba(226,232,240,0.7)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "rgba(226,232,240,0.7)"}
              >{item}</span>
            ))}
            <button className="cta-btn" style={{ padding: "10px 20px", fontSize: 12 }}>Diagnóstico Gratuito</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 72 }}>
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 400, height: 400, opacity: 0.15 }}>
          <div className="rotating-ring" style={{ width: "100%", height: "100%", top: 0, left: 0 }} />
          <div className="rotating-ring" style={{ width: "75%", height: "75%", top: "12.5%", left: "12.5%", animationDirection: "reverse", animationDuration: "15s" }} />
          <div className="rotating-ring" style={{ width: "50%", height: "50%", top: "25%", left: "25%", animationDuration: "10s" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: GOLD }}>⬡</div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 2 }}>
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
              Sistema Ativo — Monitoramento 24/7
            </span>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.3s", marginTop: 32 }}>
            <h1 className="space-grotesk" style={{ fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 900, color: "#fff" }}>
              A sua empresa está realmente preparada para um{" "}
              <span className="gold-shimmer">sequestro de dados?</span>
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.5s", marginTop: 24 }}>
            <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 650, color: "rgba(226,232,240,0.8)", fontWeight: 400 }}>
              Protegemos o lucro e a reputação do seu negócio contra ataques cibernéticos.
              Auditoria de elite e blindagem digital para empresas que não podem parar.
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.7s", marginTop: 48, display: "flex", gap: 20, flexWrap: "wrap" }}>
            <button className="cta-btn cta-btn-primary">
              <span>Solicitar Análise de Cenário</span>
              <span style={{ fontSize: 18 }}>→</span>
            </button>
            <button className="cta-btn">
              <span>Ver Diagnóstico Gratuito</span>
            </button>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.9s", marginTop: 72, display: "flex", gap: 56, flexWrap: "wrap" }}>
            {[["10.8K", "Ameaças Mapeadas"], ["45/100", "Score Médio Detectado"], ["24/7", "Monitoramento Ativo"]].map(([val, label]) => (
              <div key={label}>
                <div className="space-grotesk" style={{ fontSize: 32, fontWeight: 700, color: GOLD }}>{val}</div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(226,232,240,0.5)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL STRIP */}
      <div style={{ background: "rgba(197,160,89,0.05)", borderTop: "1px solid rgba(197,160,89,0.1)", borderBottom: "1px solid rgba(197,160,89,0.1)", padding: "16px 24px", overflow: "hidden" }}>
        <div className="terminal-text" style={{ whiteSpace: "nowrap" }}>
          {"[ SOC-ONLINE ] > VARREDURA_ATIVA > SPF:CHECK > DMARC:CHECK > SSL:VERIFY > HSTS:AUDIT > PORTAS:SCAN > RANSOMWARE:MONITOR > LGPD:COMPLIANCE > ".repeat(3)}
        </div>
      </div>

      {/* RISCOS REAIS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px", position: "relative" }}>
        <span className="section-number">01</span>
        <AnimatedSection>
          <span className="badge">Riscos Reais Para o Seu Negócio</span>
          <h2 className="space-grotesk" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, marginTop: 24, color: "#fff", lineHeight: 1.2 }}>
            Cada setor tem <span style={{ color: GOLD }}>vulnerabilidades específicas.</span>
            <br />Conheça as suas.
          </h2>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 60 }}>
          {niches.map((n, i) => (
            <AnimatedSection key={n.title} delay={i * 100}>
              <div
                className="card-elite"
                style={{ padding: 36, cursor: "pointer", height: "100%", borderRadius: 8 }}
                onMouseEnter={() => setActiveNiche(i)}
                onMouseLeave={() => setActiveNiche(null)}
              >
                <div className="hex-icon" style={{ marginBottom: 24, background: activeNiche === i ? "rgba(197,160,89,0.2)" : "rgba(197,160,89,0.08)" }}>
                  <span style={{ color: GOLD, fontSize: 20 }}>{n.icon}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>{n.sub}</div>
                <h3 className="space-grotesk" style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>{n.title}</h3>
                <div className="divider-gold" style={{ width: 40, marginLeft: 0, marginBottom: 20 }} />
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(226,232,240,0.7)" }}>{n.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="divider-gold" style={{ width: "80%", maxWidth: 800 }} />

      {/* COMO FUNCIONA */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px", position: "relative" }}>
        <span className="section-number">02</span>
        <AnimatedSection>
          <span className="badge">Metodologia</span>
          <h2 className="space-grotesk" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, marginTop: 24, color: "#fff", lineHeight: 1.2 }}>
            3 pilares para blindar seu negócio<br />
            <span style={{ color: GOLD }}>contra ameaças digitais.</span>
          </h2>
        </AnimatedSection>

        <div style={{ marginTop: 80 }}>
          {pillars.map((p, i) => (
            <AnimatedSection key={p.num} delay={i * 150}>
              <div style={{ display: "flex", gap: 48, alignItems: "flex-start", marginBottom: 60, flexWrap: "wrap" }}>
                <div style={{ flexShrink: 0, width: 120, textAlign: "center" }}>
                  <div className="space-grotesk" style={{ fontSize: 72, fontWeight: 900, color: "rgba(197,160,89,0.15)", lineHeight: 1 }}>{p.num}</div>
                  <div style={{ width: 2, height: 60, background: `linear-gradient(180deg, ${GOLD}, transparent)`, margin: "16px auto 0" }} />
                </div>
                <div className="card-elite" style={{ flex: 1, minWidth: 280, padding: 40, display: "flex", gap: 24, alignItems: "flex-start", borderRadius: 8 }}>
                  <div className="hex-icon" style={{ flexShrink: 0 }}>
                    <span style={{ color: GOLD, fontSize: 20 }}>{p.icon}</span>
                  </div>
                  <div>
                    <h3 className="space-grotesk" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{p.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(226,232,240,0.75)" }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="divider-gold" style={{ width: "80%", maxWidth: 800 }} />

      {/* PREÇOS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px", position: "relative" }}>
        <span className="section-number">03</span>
        <AnimatedSection style={{ textAlign: "center" }}>
          <span className="badge">Planos & Preços</span>
          <h2 className="space-grotesk" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, marginTop: 24, color: "#fff", lineHeight: 1.2 }}>
            Proteção digital automatizada<br />
            <span style={{ color: GOLD }}>e relatórios técnicos precisos.</span>
          </h2>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, marginTop: 72, alignItems: "start" }}>
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 120}>
              <div
                className={plan.featured ? "price-card-featured" : plan.isSoc ? "price-card-soc" : "card-elite"}
                style={{ padding: 48, borderRadius: 12, position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
              >
                {plan.badge && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
                    <span className="badge" style={{ fontSize: 11, padding: "6px 20px", background: plan.featured ? GOLD : "rgba(197,160,89,0.15)", color: plan.featured ? NAVY : GOLD, whiteSpace: "nowrap" }}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-grotesk" style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                  <span className="space-grotesk" style={{ fontSize: plan.price === "Sob Consulta" ? 32 : 44, fontWeight: 700, color: "#fff" }}>{plan.price}</span>
                  {plan.price !== "Sob Consulta" && <span style={{ fontSize: 16, color: "rgba(226,232,240,0.5)" }}>/mês</span>}
                </div>
                <p style={{ fontSize: 15, color: "rgba(226,232,240,0.6)", marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</p>

                <div className="divider-gold" style={{ marginLeft: 0, marginBottom: 32, width: "100%" }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, marginBottom: 48, flexGrow: 1 }}>
                  {plan.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      {item.startsWith("Tudo") ? (
                        <span style={{ fontSize: 15, color: GOLD, fontStyle: "italic", fontWeight: 600 }}>{item}</span>
                      ) : (
                        <>
                          <span style={{ color: GOLD, flexShrink: 0, marginTop: 2, fontSize: 14 }}>◆</span>
                          <span style={{ fontSize: 15, color: "rgba(226,232,240,0.8)", lineHeight: 1.5 }}>{item}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <button className={`cta-btn ${plan.featured ? "cta-btn-primary" : ""}`} style={{ width: "100%", justifyContent: "center", borderRadius: 4 }}>
                  {plan.cta}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="grid-bg" style={{ borderTop: "1px solid rgba(197,160,89,0.1)", borderBottom: "1px solid rgba(197,160,89,0.1)" }}>
        <AnimatedSection>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
            <div className="animate-float">
              <div style={{ width: 80, height: 80, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 40px", fontSize: 32, color: GOLD, borderRadius: "50%" }}>⬡</div>
            </div>
            <h2 className="space-grotesk" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, color: "#fff", marginBottom: 24, lineHeight: 1.2 }}>
              O risco digital não é uma possibilidade.<br />
              <span className="gold-shimmer">É uma questão de tempo.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(226,232,240,0.7)", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
              Não espere um incidente para descobrir que sua proteção falhou.
              Garanta a continuidade do seu negócio hoje com uma auditoria profissional.
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn cta-btn-primary">
                <span>Diagnóstico Gratuito Agora</span>
                <span style={{ fontSize: 18 }}>→</span>
              </button>
              <button className="cta-btn">Falar com Especialista</button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(197,160,89,0.1)", padding: "80px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 48, marginBottom: 80 }}>
            <div style={{ maxWidth: 400 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 32, height: 32, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: GOLD }}>⬡</div>
                <span className="space-grotesk" style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 1.5 }}>LM <span style={{ color: GOLD }}>AuditSec</span></span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(226,232,240,0.6)" }}>
                Proteção Digital Corporativa. Auditoria de elite e blindagem digital para empresas que não podem parar.
              </p>
              <div style={{ marginTop: 32, padding: "16px", background: "rgba(197,160,89,0.05)", borderRadius: 8, border: "1px solid rgba(197,160,89,0.1)" }}>
                <div className="terminal-text" style={{ fontWeight: 600 }}>CEO / Founder: Luca Marques</div>
                <div className="terminal-text" style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5 }}>
                  » Acadêmico de Direito<br/>
                  » Google Cybersecurity Certified<br/>
                  » Cisco Ethical Hacking
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 80, flexWrap: "wrap" }}>
              {[
                { title: "Serviços", items: ["Auditoria Digital", "Monitoramento SOC", "Conformidade LGPD", "Resposta a Incidentes"] },
                { title: "Setores", items: ["E-commerce", "Clínicas Médicas", "Escritórios Jurídicos", "Contabilidade"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="space-grotesk" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>{col.title}</div>
                  {col.items.map(item => (
                    <div key={item} style={{ fontSize: 15, color: "rgba(226,232,240,0.6)", marginBottom: 16, cursor: "pointer", transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = GOLD}
                      onMouseLeave={e => e.target.style.color = "rgba(226,232,240,0.6)"}
                    >{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="divider-gold" style={{ width: "100%", marginBottom: 32, opacity: 0.5 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div className="space-grotesk" style={{ fontSize: 15, color: "rgba(197,160,89,0.8)", fontStyle: "italic", letterSpacing: 1 }}>
              "Disciplina no código e força na defesa."
            </div>
            <div style={{ fontSize: 13, color: "rgba(226,232,240,0.4)", letterSpacing: 1 }}>
              &copy; {new Date().getFullYear()} LM AuditSec · Goiânia, GO · lmauditsec.com.br
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
