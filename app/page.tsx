"use client";

import { useEffect, useState } from "react";

type DetailKey = "retencao" | "conhecimento" | "nps" | "estrutura";

const details: Record<
  DetailKey,
  {
    title: string;
    value: string;
    copy: string;
    items: string[];
    accent: string;
  }
> = {
  retencao: {
    title: "Taxa de retenção",
    value: "35%",
    copy: "A taxa considera os participantes que efetivamente iniciaram o curso e chegaram à conclusão.",
    items: [
      "556 pessoas se inscreveram na oferta.",
      "288 participantes iniciaram as atividades.",
      "102 participantes concluíram o curso.",
      "A relação entre concluintes e participantes que iniciaram corresponde a aproximadamente 35%.",
    ],
    accent: "gauge",
  },
  conhecimento: {
    title: "Conhecimento e autoeficácia",
    value: "Resultados pré e pós",
    copy: "Foram avaliados 59 profissionais de saúde por meio do Questionário de Conhecimento e Autoeficácia sobre Cuidados Paliativos, aplicado antes e após o curso.",
    items: [
      "Conhecimento: 2,98 para 3,07; diferença média de 0,09 ponto (IC95%: 0,01 a 0,18; p = 0,032).",
      "Autoeficácia: 3,39 para 3,67; diferença média de 0,28 ponto (IC95%: 0,16 a 0,41; p < 0,001).",
      "Houve aumento estatisticamente significativo nos dois desfechos.",
      "Nenhum item isolado de conhecimento apresentou diferença significativa.",
      "Na autoeficácia, houve melhora significativa nos itens AE3, AE5, AE6, AE8, AE9, AE10 e AE11.",
    ],
    accent: "brain",
  },
  nps: {
    title: "Net Promoter Score",
    value: "+95",
    copy: "O Net Promoter Score mede a disposição dos participantes em recomendar a experiência formativa.",
    items: [
      "O curso alcançou NPS de +95.",
      "Satisfação geral com a experiência: média 9,7.",
      "Recomendação do curso a colegas: média 9,6.",
      "Organização do conteúdo: média 9,6; atividades e exercícios: 9,4.",
      "Aumento percebido do conhecimento: 9,1; aplicabilidade: 8,9; carga horária: 8,6.",
    ],
    accent: "smile",
  },
  estrutura: {
    title: "Estrutura do curso",
    value: "40 h",
    copy: "A formação foi ofertada no Moodle ao longo de cinco meses, combinando atividades síncronas gravadas, estudo e aplicação prática por Telessaúde.",
    items: [
      "Carga horária declarada de 40 horas.",
      "22 horas de atividades teóricas síncronas, gravadas e disponíveis na plataforma.",
      "Dessas atividades, 19 horas foram exclusivas para inscritos e três horas abertas ao público.",
      "Uma hora de atividade prática, com discussão de caso por teleconsultoria para profissionais da assistência.",
      "17 horas destinadas ao estudo.",
      "Módulo opcional de Cuidados Paliativos pediátricos com 10 horas.",
    ],
    accent: "book",
  },
};

const metricIcons: Record<DetailKey, string> = {
  retencao: "◔",
  conhecimento: "✦",
  nps: "⌣",
  estrutura: "▤",
};

export default function Home() {
  const [active, setActive] = useState<DetailKey | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const detailPanel = (key: DetailKey, compact = false) => (
    <>
      <button
        type="button"
        className="panel-backdrop"
        onClick={() => setActive(null)}
        aria-label="Fechar painel"
        tabIndex={-1}
      />
      <section
        id={`detail-${key}`}
        className={`detail-panel detail-${details[key].accent}${compact ? " detail-compact" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-title-${key}`}
        aria-live="polite"
      >
        <button
          type="button"
          className="close-detail"
          onClick={() => setActive(null)}
          aria-label={`Fechar detalhes de ${details[key].title}`}
        >
          ×
        </button>
        <span className="detail-kicker">Detalhes</span>
        <h2 id={`detail-title-${key}`}>{details[key].title}</h2>
        {key === "conhecimento" ? (
          <div className="split-results" aria-label="Resultados discriminados">
            <article>
              <span>Conhecimento</span>
              <strong>2,98 → 3,07</strong>
              <p>Variação de +0,09 ponto · p = 0,032.</p>
            </article>
            <article>
              <span>Autoeficácia</span>
              <strong>3,39 → 3,67</strong>
              <p>Variação de +0,28 ponto · p &lt; 0,001.</p>
            </article>
          </div>
        ) : (
          <strong className="detail-value">{details[key].value}</strong>
        )}
        <p>{details[key].copy}</p>
        <ul className="detail-list">
          {details[key].items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );

  return (
    <main className="site-shell">
      <article className="infographic">
        <nav className="institutional-logos" aria-label="Instituições">
          <a
            href="https://www.unifesp.br/"
            target="_blank"
            rel="noreferrer"
            aria-label="Universidade Federal de São Paulo"
          >
            <img
              className="logo-unifesp"
              src={`${basePath}/logo-unifesp.png`}
              alt="UNIFESP — Universidade Federal de São Paulo"
            />
          </a>
          <span className="logo-divider" aria-hidden="true" />
          <a
            href="https://www.telenordeste.com.br/"
            target="_blank"
            rel="noreferrer"
            aria-label="Projeto TeleNordeste"
          >
            <img
              className="logo-telenordeste"
              src={`${basePath}/logo-telenordeste.png`}
              alt="Projeto TeleNordeste"
            />
          </a>
          <a
            href="https://www.bp.org.br/"
            target="_blank"
            rel="noreferrer"
            aria-label="BP — A Beneficência Portuguesa de São Paulo"
          >
            <img
              className="logo-bp"
              src={`${basePath}/logo-bp.png`}
              alt="BP — A Beneficência Portuguesa de São Paulo"
            />
          </a>
        </nav>

        <header className="hero">
          <span className="eyebrow">Projeto TeleNordeste-BP</span>
          <h1>
            II Curso de Abordagem Paliativa
            <br />
            na Atenção Primária à Saúde
          </h1>
          <p>
            Análise dos resultados do curso por Telessaúde ministrado pelo
            projeto TeleNordeste-BP
          </p>
          <p className="academic-note">
            Produto educacional · Mestrado Profissional PPGECS-MP
            <small>
              Turma 2025–2027 · ISS · Campus Baixada Santista (CBS) · UNIFESP
            </small>
            <small>Autoria: Bruno Belo Lima</small>
            <small>
              Orientadora: Profa. Dra. Rosângela Soares Chriguer
            </small>
            <small>
              Coorientadora: Profa. Dra. Lúcia da Rocha Uchôa Figueiredo
            </small>
            <a
              href="https://docs.google.com/document/d/1ZnI59wfPUVP6AJq5ulFN-AE6fHSgSYVX7f4t5foUwcY/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Acessar dissertação completa ↗
            </a>
          </p>
        </header>

        <section className="course-overview" aria-labelledby="course-title">
          <div className="course-visual">
            <div className="sun" />
            <div className="cactus cactus-one" />
            <div className="cactus cactus-two" />
            <a
              className="play-button"
              href="https://www.youtube.com/shorts/r2shqsTNuHo"
              target="_blank"
              rel="noreferrer"
              aria-label="Assistir ao vídeo do curso no YouTube"
            >
              ▶
            </a>
            <p className="course-question">
              Qual foi o impacto do II Curso de Abordagem Paliativa na APS?
            </p>
          </div>
          <div className="course-copy">
            <h2 id="course-title">O curso</h2>
            <p>
              O II Curso de Abordagem Paliativa na APS foi ofertado para as
              profissionais da assistência e da gestão nos estados do Maranhão,
              Alagoas e Piauí, atendidos pelo TeleNordeste de responsabilidade
              da BP.
            </p>
            <p>
              Teve <strong>556 inscritos</strong> e houve o interesse de{" "}
              <strong>116 pessoas de outros estados</strong>.
            </p>
            <button
              className="structure-trigger"
              type="button"
              aria-expanded={active === "estrutura"}
              aria-controls="detail-estrutura"
              onClick={() => setActive("estrutura")}
            >
              + Estrutura do curso
            </button>
            {active === "estrutura" && detailPanel("estrutura", true)}
          </div>
        </section>

        <section className="course-facts" aria-label="Dados gerais do curso">
          <article>
            <strong>MA · AL · PI</strong>
            <span>Estados participantes</span>
          </article>
          <article>
            <strong>1º semestre</strong>
            <span>Período de oferta em 2025</span>
          </article>
          <article>
            <strong>556</strong>
            <span>Pessoas inscritas</span>
          </article>
          <article>
            <strong>116</strong>
            <span>Interessados de outros estados</span>
          </article>
        </section>

        <section className="metrics" aria-label="Indicadores do curso">
          {(Object.keys(details) as DetailKey[])
            .filter((key) => key !== "estrutura")
            .map((key) => (
              <div className="metric-group" key={key}>
                <button
                  type="button"
                  className="metric"
                  aria-expanded={active === key}
                  aria-controls={`detail-${key}`}
                  onClick={() => setActive(active === key ? null : key)}
                >
                  <span className="metric-icon" aria-hidden="true">
                    {metricIcons[key]}
                  </span>
                  <span className="metric-label">{details[key].title}</span>
                  <strong>
                    {key === "conhecimento" ? "Pré × pós" : details[key].value}
                  </strong>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </button>
                {active === key && detailPanel(key, true)}
              </div>
            ))}
        </section>

        <section className="feedbacks" aria-label="Perfil dos participantes">
          <article className="feedback feedback-positive">
            <span className="feedback-label">Perfil da amostra · n = 59</span>
            <blockquote>
              83,05% eram mulheres, com idade média de 39,25 anos. A distribuição
              foi: Maranhão 45,76%, Piauí 33,90% e Alagoas 20,34%.
            </blockquote>
          </article>
          <article className="feedback feedback-negative">
            <span className="feedback-label">Atuação e experiência</span>
            <blockquote>
              72,88% atuavam na APS e 67,80% estavam vinculados a Unidades
              Básicas de Saúde. Enfermeiros representaram 38,98% e médicos,
              22,03%.
            </blockquote>
            <blockquote>
              67,80% não possuíam formação prévia em cuidados paliativos, embora
              61,02% já tivessem cuidado de pacientes nessa condição.
            </blockquote>
          </article>
        </section>

        <section className="recommendations" aria-labelledby="recommendations">
          <h2 id="recommendations">Síntese dos resultados</h2>
          <ol>
            <li>
              Estudo quase-experimental de grupo único, com avaliação pré e
              pós-intervenção, sem randomização e sem grupo controle.
            </li>
            <li>
              O aumento foi significativo nos escores totais de conhecimento e
              autoeficácia, com evolução mais acentuada da autoeficácia.
            </li>
            <li>
              O tempo mediano de resposta passou de 10,25 para 10,40 minutos,
              sem diferença estatisticamente significativa (p = 0,173).
            </li>
            <li>
              A avaliação qualitativa dos comentários abertos dos participantes
              está em andamento.
            </li>
          </ol>
        </section>

        <footer>
          <span className="brand-mark">TeleNordeste-BP</span>
          <span>
            Bruno Belo Lima · Produto educacional · PPGECS-MP · ISS · CBS ·
            UNIFESP
          </span>
        </footer>
      </article>
    </main>
  );
}
