import React from "react";
import { ArrowUpRight, Search } from "lucide-react";
import "./SeoIA.css";

export const SEO_DESCRIPTION = "Posicionamiento SEO + IA profesional. Actualizamos tu web con contenido estratégico, mejoras técnicas y seguimiento para las nuevas formas de búsqueda.";

export default function SeoIA({ t, onContact }) {
  const servicios = [
    ["01", t("Auditoría SEO y oportunidades", "SEO audit and opportunities"), t("Analizamos tu web, tu competencia y las preguntas de tus clientes. Detectamos qué actualizar, qué corregir y qué contenido falta para presentar mejor tu oferta.", "We analyze your website, competitors and customer questions. We identify what to update, what to fix and which content is missing to better present your offer.")],
    ["02", t("Contenido preparado para nuevas búsquedas", "Content for new ways of searching"), t("Creamos y actualizamos páginas de servicios, comparativas y respuestas claras. Usamos IA como apoyo, con revisión profesional y datos reales de tu negocio.", "We create and update service pages, comparisons and clear answers. We use AI as a supporting tool, with professional review and real information about your business.")],
    ["03", t("Mejoras técnicas en tu web", "Technical website improvements"), t("Optimizamos velocidad, estructura, enlaces internos y acceso al contenido. Revisamos que los buscadores puedan rastrear e indexar tus páginas y que los datos estructurados representen lo que ofrecés.", "We improve speed, structure, internal links and content access. We check that search engines can crawl and index your pages and that structured data reflects your offering.")],
    ["04", t("Medición y actualización continua", "Measurement and ongoing updates"), t("Seguimos la evolución de visitas, consultas y páginas clave. Revisamos cambios en las búsquedas y ajustamos el plan con prioridades concretas, según los resultados y el alcance contratado.", "We track visits, enquiries and key pages. We review changes in search and adjust the plan with concrete priorities based on results and the agreed scope.")],
  ];
  return (
    <article id="seo-ia" className="s2b-seop">
      <section className="s2b-sec s2b-seop-hero">
        <div className="s2b-wrap s2b-seop-intro">
          <div>
            <div className="s2b-eyebrow"><Search size={14} /> {t("Estrategia profesional para la nueva búsqueda", "Professional strategy for the new search landscape")}</div>
            <h1 className="s2b-h2">{t("Posicionamiento SEO", "SEO positioning")} <b>{t("+ IA", "+ AI")}</b></h1>
            <p className="s2b-lead">{t("Actualizá el posicionamiento de tu empresa para las nuevas formas de buscar. Combinamos SEO profesional e inteligencia artificial para mejorar tu web, fortalecer tu contenido y trabajar tu visibilidad en buscadores y respuestas con IA.", "Update your company's search strategy for new ways of finding information. We combine professional SEO and artificial intelligence to improve your website, strengthen your content and work on visibility in search engines and AI answers.")}</p>
            <button className="s2b-btn s2b-btn--chrome" onClick={onContact}>{t("Consultar por mi posicionamiento", "Discuss my search visibility")} <ArrowUpRight size={17} /></button>
            <p className="s2b-seop-caption">{t("Propuesta a medida según tu sitio, mercado y objetivos.", "A tailored proposal based on your site, market and goals.")}</p>
          </div>
        </div>
      </section>
      <section className="s2b-sec s2b-sec--sm" aria-labelledby="seo-alcance">
        <div className="s2b-wrap">
          <div className="s2b-eyebrow">{t("Qué mejoramos en tu posicionamiento", "How we improve your search presence")}</div>
          <h2 id="seo-alcance" className="s2b-h2">{t("Tu web, actualizada.", "Your website, updated.")} <b>{t("Tu estrategia, en evolución.", "Your strategy, evolving.")}</b></h2>
          <div className="s2b-seop-services">{servicios.map(([n, title, desc]) => <section key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></section>)}</div>
        </div>
      </section>
      <section className="s2b-sec s2b-sec--sm s2b-seop-bottom">
        <div className="s2b-wrap s2b-seop-layout">
          <div>
            <div className="s2b-eyebrow">{t("Qué hay de nuevo", "What's new")}</div>
            <h2 className="s2b-h2">{t("La búsqueda cambia.", "Search is changing.")} <b>{t("Tu empresa puede prepararse.", "Your business can prepare.")}</b></h2>
            <p>{t("Google incorpora respuestas con IA y búsquedas más conversacionales. Por eso trabajamos con preguntas completas, contenido útil y una web técnicamente preparada. El SEO sigue siendo la base; la estrategia se adapta a estas nuevas experiencias.", "Google incorporates AI answers and more conversational searches. We focus on complete questions, helpful content and a technically sound website. SEO remains the foundation while the strategy adapts to these new experiences.")}</p>
            <p className="s2b-seop-caption">{t("Las posiciones y menciones dependen de cada plataforma y no se garantizan.", "Rankings and mentions depend on each platform and are not guaranteed.")}</p>
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
