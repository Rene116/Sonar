import logoLetras from './assets/letras-sonar.svg';

export default function PaginaNosotros() {
  return (
    <>
      <header className="encabezado bg-white sticky-top border-bottom">
        <div className="encabezado-contenido container d-flex align-items-center justify-content-between">
          <a href="/" className="logo-marca" aria-label="SONAR, ir al inicio">
            <img src={logoLetras} alt="SONAR" className="logo-letras" />
          </a>
          <div className="encabezado-acciones">
            <nav className="encabezado-nav" aria-label="Navegación principal">
              <a href="/" className="nav-enlace">Inicio</a>
              <a href="/#posibilidades" className="nav-enlace">Posibilidades</a>
              <a href="/#carrusel" className="nav-enlace">Un vistazo</a>
            </nav>
            <a href="/" className="btn btn-primary btn-sonar">Conocer SONAR</a>
          </div>
        </div>
      </header>

      <main className="nosotros-pagina">
        <section className="nosotros-hero">
          <div className="container py-5">
            <div className="intro-seccion">
              <div className="etiqueta">Conoce SONAR Nexus</div>
              <h1 className="hero-titulo">Tecnología para trabajar con más claridad.</h1>
              <p className="texto-lead text-secondary">
                Ayudamos a las empresas a conectar la información que sus equipos necesitan para tomar mejores decisiones.
              </p>
            </div>
          </div>
        </section>

        <section className="container nosotros-contenido py-5" aria-label="Acerca de SONAR Nexus">
          <div className="row g-4">
            <article className="col-md-4">
              <div className="tarjeta h-100">
                <h2 className="tarjeta-titulo">Nuestra misión</h2>
                <p className="text-secondary mb-0">
                  En SONAR Nexus ayudamos a las empresas a trabajar con más claridad, conectando la información que sus equipos necesitan para tomar mejores decisiones.
                </p>
              </div>
            </article>
            <article className="col-md-4">
              <div className="tarjeta h-100">
                <h2 className="tarjeta-titulo">Lo que hacemos</h2>
                <p className="text-secondary mb-0">
                  Creamos soluciones digitales para facilitar la gestión de clientes, operaciones e inventario, con herramientas pensadas para adaptarse a las necesidades de cada negocio.
                </p>
              </div>
            </article>
            <article className="col-md-4">
              <div className="tarjeta h-100">
                <h2 className="tarjeta-titulo">Cómo trabajamos</h2>
                <p className="text-secondary mb-0">
                  Creemos en la colaboración, la mejora continua y la tecnología útil. Acompañamos a nuestros clientes para que puedan enfocarse en hacer crecer sus proyectos.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="pie text-white">
        <div className="container py-3">
          <a className="pie-enlace" href="/">Volver al inicio</a>
          <div className="pie-final mt-2 pt-2">
            <span>Una manera más clara de impulsar tu negocio</span>
            <span>© 2026 SONAR Nexus</span>
          </div>
        </div>
      </footer>
    </>
  );
}
