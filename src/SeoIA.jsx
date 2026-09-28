import React from "react";
import { ArrowUpRight, Search, Check, ArrowRight } from "lucide-react";
import "./SeoIA.css";

export const SEO_DESCRIPTION = "Posicionamiento SEO para IA y buscadores. Auditoría, contenido estratégico y mejoras técnicas para trabajar la visibilidad de tu empresa.";

export default function SeoIA({ t, onContact }) {
  const servicios = [
    ["01", t("Diagnóstico y prioridades", "Assessment and priorities"), t("Revisamos tu sitio y las búsquedas de tus clientes. Recibís un plan de trabajo ordenado por impacto y esfuerzo.", "We review your site and customer searches. You receive a work plan ranked by impact and effort.")],
    ["02", t("Contenido con criterio", "Content with purpose"), t("Desarrollamos páginas que responden dudas de compra. La IA apoya el trabajo; cada entrega lleva revisión humana.", "We develop pages that answer buying questions. AI supports the work; every deliverable receives human review.")],
    ["03", t("Una base técnica sólida", "A solid technical foundation"), t("Revisamos rastreo, indexación, enlaces internos y rendimiento. Los datos estructurados deben coincidir con el contenido visible.", "We review crawling, indexing, internal links and performance. Structured data must match visible content.")],
    ["04", t("Seguimiento y decisiones", "Tracking and decisions"), t("Acordamos indicadores y revisiones periódicas. Cada informe distingue lo implementado, lo observado y el siguiente paso.", "We agree on metrics and regular reviews. Each report separates completed work, observations and next steps.")],
  ];
  return (
    <article id="seo-ia" className="s2b-seop">
      <section className="s2b-sec s2b-seop-hero">
        <div className="s2b-wrap s2b-seop-layout">
          <div>
            <div className="s2b-eyebrow"><Search size={14} /> {t("Posicionamiento SEO para IA", "SEO for AI search")}</div>
            <h1 className="s2b-h2">{t("Posicionamiento SEO", "SEO positioning")} <b>{t("+ IA", "+ AI")}</b></h1>
            <p className="s2b-lead">{t("Trabajamos la visibilidad de tu empresa en buscadores y respuestas con IA. Una estrategia que conecta lo que sabés hacer con lo que tus próximos clientes necesitan resolver.", "We work on your company's visibility in search engines and AI answers. A strategy connecting your expertise with what your next customers need to solve.")}</p>
            <button className="s2b-btn s2b-btn--chrome" onClick={onContact}>{t("Consultar por mi posicionamiento", "Discuss my search visibility")} <ArrowUpRight size={17} /></button>
            <p className="s2b-seop-caption">{t("Propuesta a medida según tu sitio, mercado y objetivos.", "A tailored proposal based on your site, market and goals.")}</p>
          </div>
          <aside className="s2b-seop-map" aria-label={t("Enfoque del servicio", "Service approach")}>
            <span className="s2b-seop-kicker">{t("DE LA BÚSQUEDA A LA CONSULTA", "FROM SEARCH TO ENQUIRY")}</span>
            <div className="s2b-seop-question">“{t("¿Quién puede resolver lo que necesito?", "Who can solve what I need?") }”</div>
            <div className="s2b-seop-channels"><span>Google</span><span>ChatGPT</span><span>Gemini</span><span>Perplexity</span></div>
            <div className="s2b-seop-flow"><Search size={22} /><span>{t("Una pregunta concreta", "A specific question")}</span><ArrowRight size={18} /></div>
            <div className="s2b-seop-flow"><Check size={22} /><span>{t("Tu conocimiento, bien explicado", "Your expertise, clearly explained")}</span></div>
            <p className="s2b-seop-caption">{t("Nuestro foco: que cada visita encuentre una respuesta útil y un próximo paso claro.", "Our focus: a useful answer and a clear next step for every visitor.")}</p>
          </aside>
        </div>
      </section>
      <section className="s2b-sec s2b-sec--sm" aria-labelledby="seo-alcance">
        <div className="s2b-wrap">
          <div className="s2b-eyebrow">{t("Qué trabajamos", "What we work on")}</div>
          <h2 id="seo-alcance" className="s2b-h2">{t("Un plan claro.", "A clear plan.")} <b>{t("Trabajo verificable.", "Verifiable work.")}</b></h2>
          <div className="s2b-seop-services">{servicios.map(([n, title, desc]) => <section key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></section>)}</div>
        </div>
      </section>
      <section className="s2b-sec s2b-sec--sm s2b-seop-bottom">
        <div className="s2b-wrap s2b-seop-layout">
          <div>
            <div className="s2b-eyebrow">{t("Antes de empezar", "Before we start")}</div>
            <h2 className="s2b-h2">{t("Objetivos acordados.", "Agreed goals.")} <b>{t("Expectativas claras.", "Clear expectations.")}</b></h2>
            <p>{t("El SEO sigue siendo la base de la visibilidad en las funciones de IA de Google. No existe un marcado especial que asegure aparecer. Las posiciones, citas y plazos dependen de cada plataforma y no se garantizan.", "SEO remains the foundation of visibility in Google's AI features. No special markup ensures inclusion. Rankings, citations and timelines depend on each platform and are not guaranteed.")}</p>
          </div>
          <div className="s2b-seop-brief">
            <h3>{t("Empecemos por tu negocio", "Let's start with your business")}</h3>
            <p>{t("Compartinos tu web, qué vendés y a quién querés llegar. Definimos alcance, entregables, frecuencia de seguimiento y presupuesto antes de comenzar.", "Share your website, what you sell and who you want to reach. We define scope, deliverables, review frequency and budget before starting.")}</p>
            <button className="s2b-btn s2b-btn--primary" onClick={onContact}>{t("Quiero una propuesta SEO", "Request an SEO proposal")} <ArrowUpRight size={17} /></button>
          </div>
        </div>
      </section>
    </article>
  );
}
