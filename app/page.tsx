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
      "Conhecimento: o escore médio passou de 2,98 para 3,07, aumento absoluto de 0,09 ponto (p = 0,032).",
      "Autoeficácia: o escore médio passou de 3,39 para 3,67, aumento absoluto de 0,28 ponto (p < 0,001).",
      "Houve aumento estatisticamente significativo nos dois desfechos.",
      "Os resultados indicam ganho modesto de conhecimento e evolução mais acentuada da autoeficácia.",
    ],
    accent: "brain",
  },
  nps: {
    title: "Net Promoter Score",
    value: "95%",
    copy: "O Net Promoter Score mede a disposição dos participantes em recomendar a experiência formativa.",
    items: [
      "O curso alcançou NPS de 95%.",
      "O resultado demonstra ampla predominância de participantes promotores.",
      "A pontuação situa a experiência em uma faixa de excelência.",
      "Os depoimentos positivos destacam organização, presença da equipe, clareza, objetividade e caráter lúdico.",
    ],
    accent: "smile",
  },
  estrutura: {
    title: "Estrutura do curso",
    value: "40 h",
    copy: "A formação combinou atividades síncronas, conteúdos gravados e aplicação prática por Telessaúde.",
    items: [
      "Carga horária total de 40 horas.",
      "19 horas de aulas síncronas exclusivas para os participantes.",
      "Aulas gravadas disponibilizadas no Moodle.",
      "Três encontros síncronos abertos ao público.",
      "Uma hora de atividade prática por teleconsultoria.",
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
              src="/logo-unifesp.png"
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
              src="/logo-telenordeste.png"
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
              src="/logo-bp.png"
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
          <div className="course-visual" aria-hidden="true">
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
          </div>
          <div className="course-copy">
            <h2 id="course-title">O curso</h2>
            <p>
              O II Curso de Abordagem Paliativa na APS foi ofertado para as
              equipes multidisciplinares das UBS dos estados do Maranhão,
              Alagoas e Piauí no primeiro semestre de 2025.
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

        <section className="feedbacks" aria-label="Feedbacks dos participantes">
          <article className="feedback feedback-positive">
            <span className="feedback-label">Feedback positivo</span>
            <blockquote>
              “O melhor curso que já realizei. Nunca vi um curso a distância ser
              tão presente, tão organizado, com uma equipe dos melhores e mais
              capacitados profissionais. Que venham mais cursos como este:
              claro, objetivo, enriquecedor e lúdico. Parabéns a todos os
              envolvidos.”
            </blockquote>
          </article>
          <article className="feedback feedback-negative">
            <span className="feedback-label">Feedbacks negativos</span>
            <blockquote>
              “Tem que se pensar nos alunos que de alguma forma não têm acesso a
              notebooks ou computadores, apenas celular.”
            </blockquote>
            <blockquote>
              “Tive dificuldade no decorrer do curso para entrar nas aulas.
              Acesso complexo, tendo que entrar duas vezes no e-mail para anexar
              código. Isso atrapalha o acesso.”
            </blockquote>
          </article>
        </section>

        <section className="recommendations" aria-labelledby="recommendations">
          <h2 id="recommendations">Sugestões do pesquisador</h2>
          <ol>
            <li>
              Melhorar a usabilidade da plataforma, tornando-a mais simples e
              acessível, especialmente em dispositivos móveis.
            </li>
            <li>
              Ampliar estratégias práticas, como estudos de caso e simulações.
            </li>
            <li>
              Adaptar o conteúdo conforme a categoria profissional, com trilhas
              específicas.
            </li>
            <li>
              Implementar acompanhamento pós-curso para reforço e manutenção do
              aprendizado.
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
