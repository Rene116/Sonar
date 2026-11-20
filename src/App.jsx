import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoDelfin from './assets/delfin.svg';
import logoLetras from './assets/letras-sonar.svg';
import Formulario from './Formulario.jsx';

const TIEMPO_SPLASH_MS = 1800;
const DURACION_VUELO = 1.3;

function Encabezado({ splashTerminado, alConocer }) {
  const aparecer = {
    initial: { opacity: 0 },
    animate: { opacity: splashTerminado ? 1 : 0 },
    transition: { duration: 0.6, delay: 0.9 },
  };

  return (
    <header className="encabezado bg-white sticky-top border-bottom">
      <div className="encabezado-contenido container d-flex align-items-center justify-content-between">
        <a href="#inicio" className="logo-marca">
          {splashTerminado && (
            <motion.div
              layoutId="delfin-sonar"
              className="logo-delfin"
              transition={{ duration: DURACION_VUELO, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.img
                src={logoDelfin}
                alt=""
                initial={{ scaleX: -1 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: DURACION_VUELO * 0.45, duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
          <motion.img
            src={logoLetras}
            alt="SONAR"
            className="logo-letras"
            initial={{ opacity: 0, y: 8 }}
            animate={splashTerminado ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: DURACION_VUELO }}
          />
        </a>

        <motion.div className="encabezado-acciones" {...aparecer}>
          <nav className="encabezado-nav" aria-label="Navegación principal">
            <a href="#posibilidades" className="nav-enlace">Posibilidades</a>
            <a href="#carrusel" className="nav-enlace">Un vistazo</a>
            <a href="/nosotros" className="nav-enlace">Nosotros</a>
          </nav>
          <button
            type="button"
            className="btn btn-primary btn-sonar"
            onClick={alConocer}
          >
            Conocer SONAR
          </button>
        </motion.div>
      </div>
    </header>
  );
}

function Carrusel() {
  const [diapositivaActual, setDiapositivaActual] = useState(0);

  const datosCarrusel = [
    { etiqueta: "Espacio para mockup · 01", titulo: "La relación con tus clientes, a la vista.", descripcion: "Muestra aquí una captura del módulo de clientes, oportunidades o seguimiento comercial.", imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Ventas" },
    { etiqueta: "Espacio para mockup · 02", titulo: "El día a día, mejor organizado.", descripcion: "Muestra aquí una imagen de pedidos, tareas, proyectos o procesos operativos.", imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Operaciones" },
    { etiqueta: "Espacio para mockup · 03", titulo: "Existencias con más claridad.", descripcion: "Muestra aquí una captura del módulo de inventario, productos o abastecimiento.", imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Inventario" }
  ];

  const { etiqueta, titulo, descripcion, imagen } = datosCarrusel[diapositivaActual];

  const irASiguiente = () => setDiapositivaActual((prev) => (prev + 1) % datosCarrusel.length);
  const irAAnterior = () => setDiapositivaActual((prev) => (prev - 1 + datosCarrusel.length) % datosCarrusel.length);

  return (
    <div className="carrusel position-relative overflow-hidden p-4 p-md-5">
      <AnimatePresence mode="wait">
        <motion.article
          key={diapositivaActual}
          className="row align-items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="col-md-6 mb-4 mb-md-0 pe-md-5">
            <div className="etiqueta">{etiqueta}</div>
            <h3 className="carrusel-titulo">{titulo}</h3>
            <p className="carrusel-texto text-secondary">{descripcion}</p>
          </div>
          <div className="col-md-6">
            <img src={imagen} alt={titulo} className="carrusel-imagen w-100 shadow-sm" />
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <div className="d-flex gap-2">
          {datosCarrusel.map((_, indice) => (
            <button
              key={indice}
              type="button"
              className={`dot-custom ${indice === diapositivaActual ? 'active' : ''}`}
              onClick={() => setDiapositivaActual(indice)}
              aria-label={`Ir a la diapositiva ${indice + 1}`}
            />
          ))}
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="carrusel-flecha" onClick={irAAnterior} aria-label="Anterior">←</button>
          <button type="button" className="carrusel-flecha" onClick={irASiguiente} aria-label="Siguiente">→</button>
        </div>
      </div>
    </div>
  );
}

function VentanaInformativa({ alCerrar }) {
  const contenido = {
    titulo: 'Términos y condiciones',
    secciones: [
      ['Uso de SONAR', 'SONAR ofrece herramientas digitales para consultar y organizar información de negocio. Al utilizar este sitio, aceptas hacerlo de forma responsable y conforme a la legislación aplicable.'],
      ['Cuentas e información', 'Cada usuario es responsable de la veracidad de la información que comparte y del cuidado de sus credenciales. No compartas datos de acceso con personas no autorizadas.'],
      ['Disponibilidad y cambios', 'Trabajamos para mantener nuestros servicios disponibles y actualizados; algunas funciones pueden cambiar o interrumpirse por mantenimiento o mejoras.'],
      ['Privacidad y contacto', 'La información que nos compartas se utilizará para atender tu solicitud y dar seguimiento a tu relación con SONAR. Si tienes dudas sobre estos términos, contáctanos en contacto@sonar-nexus.com.'],
    ],
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const alPulsarTecla = (evento) => {
      if (evento.key === 'Escape') alCerrar();
    };
    document.addEventListener('keydown', alPulsarTecla);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', alPulsarTecla);
    };
  }, [alCerrar]);

  const cerrarSiEsElFondo = (evento) => {
    if (evento.target === evento.currentTarget) alCerrar();
  };

  return (
    <motion.div
      className="ventana-fondo"
      onMouseDown={cerrarSiEsElFondo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="ventana-formulario ventana-informativa card bg-white p-4 p-md-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-ventana-informativa"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        <button type="button" className="btn-close ventana-cerrar" aria-label="Cerrar" onClick={alCerrar} />
        <h2 id="titulo-ventana-informativa" className="fw-bold mb-4 pe-4">{contenido.titulo}</h2>
        {contenido.secciones.map(([titulo, texto]) => (
          <section className="mb-3" key={titulo}>
            <h3 className="h6 fw-bold">{titulo}</h3>
            <p className="text-secondary mb-0">{texto}</p>
          </section>
        ))}
        <p className="small text-secondary mb-0">Contenido informativo de ejemplo; deberá revisarse antes de publicarse como documento legal.</p>
      </motion.div>
    </motion.div>
  );
}

function FormularioSoporte({ alCerrar }) {
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.getElementById('ticket-creador')?.focus();
    document.body.style.overflow = 'hidden';
    const alPulsarTecla = (evento) => {
      if (evento.key === 'Escape') alCerrar();
    };
    document.addEventListener('keydown', alPulsarTecla);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', alPulsarTecla);
    };
  }, [alCerrar]);

  const cerrarSiEsElFondo = (evento) => {
    if (evento.target === evento.currentTarget) alCerrar();
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setEnviado(true);
    evento.target.reset();
  };

  return (
    <motion.div
      className="ventana-fondo"
      onMouseDown={cerrarSiEsElFondo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="ventana-formulario card bg-white p-4 p-md-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-ticket"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        <button type="button" className="btn-close ventana-cerrar" aria-label="Cerrar" onClick={alCerrar} />
        <h2 id="titulo-ticket" className="fw-bold mb-2 pe-4">Crear un ticket de soporte</h2>
        <p className="text-secondary mb-4">Cuéntanos quién solicita ayuda, para quién es y qué problema presenta.</p>
        <form onSubmit={manejarEnvio} onChange={() => setEnviado(false)}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="ticket-creador" className="form-label">¿Quién hace el ticket?</label>
              <input id="ticket-creador" name="creador" className="form-control campo" required placeholder="Nombre de quien solicita soporte" />
            </div>
            <div className="col-12">
              <label htmlFor="ticket-destinatario" className="form-label">¿Para quién va dirigido?</label>
              <input id="ticket-destinatario" name="destinatario" className="form-control campo" required placeholder="Persona, equipo o área" />
            </div>
            <div className="col-12">
              <label htmlFor="ticket-problema" className="form-label">Describe el problema</label>
              <textarea id="ticket-problema" name="problema" className="form-control campo" rows="4" required placeholder="Explica qué sucede y cómo podemos ayudarte" />
            </div>
          </div>
          {enviado && (
            <div className="alert alert-info mt-4 mb-0" role="status">
              Este formulario es una demostración y todavía no envía tickets al equipo de soporte.
            </div>
          )}
          <button type="submit" className="btn btn-primary btn-sonar py-3 mt-4">Enviar ticket</button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AvisoCookies({ alResponder }) {
  return (
    <motion.aside
      className="aviso-cookies"
      role="dialog"
      aria-label="Aviso de cookies"
      aria-describedby="texto-cookies"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="aviso-cookies-texto">
        <h2>Tu privacidad importa</h2>
        <p id="texto-cookies" className="mb-0">
          Utilizamos cookies para mejorar tu experiencia en SONAR. Puedes aceptar o rechazar su uso.
        </p>
      </div>
      <div className="aviso-cookies-botones">
        <button type="button" className="btn btn-claro" onClick={() => alResponder('rechazadas')}>
          Denegar
        </button>
        <button type="button" className="btn btn-primary btn-sonar" onClick={() => alResponder('aceptadas')}>
          Aceptar
        </button>
      </div>
    </motion.aside>
  );
}

export default function Aplicacion() {
  const [mostrandoSplash, setMostrandoSplash] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [panelFooter, setPanelFooter] = useState(null);
  const [mostrarAvisoCookies, setMostrarAvisoCookies] = useState(false);

  useEffect(() => {
    let preferenciaGuardada = null;
    try {
      preferenciaGuardada = localStorage.getItem('preferencia-cookies-sonar');
    } catch {
      preferenciaGuardada = null;
    }

    const temporizador = setTimeout(() => {
      setMostrandoSplash(false);
      if (!preferenciaGuardada) setMostrarAvisoCookies(true);
    }, TIEMPO_SPLASH_MS);
    return () => clearTimeout(temporizador);
  }, []);

  const responderCookies = (preferencia) => {
    try {
      localStorage.setItem('preferencia-cookies-sonar', preferencia);
    } catch {
      // El aviso se oculta aunque el navegador no permita guardar preferencias.
    }
    setMostrarAvisoCookies(false);
  };

  // Solo abre: varios clics seguidos no lo duplican ni lo cierran
  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  return (
    <>
      {mostrandoSplash && (
        <div className="splash">
          <motion.div
            layoutId="delfin-sonar"
            className="splash-delfin"
            initial={{ x: 160, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img src={logoDelfin} alt="" />
          </motion.div>
        </div>
      )}

      <Encabezado splashTerminado={!mostrandoSplash} alConocer={abrirFormulario} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mostrandoSplash ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ visibility: mostrandoSplash ? 'hidden' : 'visible' }}
      >
        <main className="pagina-principal">
          {/* Hero principal: presenta el beneficio y la vista de SONAR. */}
          <section className="hero py-5" id="inicio">
            <div className="container py-4 py-md-5">
              <div className="superficie-liquida">
                <div className="row align-items-center gy-5">
                  <motion.div className="col-md-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h1 className="hero-titulo">Más claridad para hacer crecer y tener éxito en tu negocio.</h1>
                    <p className="hero-texto text-secondary mb-4">
                      SONAR conecta inventario, mapeo de redes, tickets y herramientas para controlar las auditorias.
                    </p>
                    <div className="d-flex flex-wrap gap-3">
                      <a href="#carrusel" className="btn btn-primary btn-sonar">Descubre lo que puedes hacer con SONAR</a>
                    </div>
                  </motion.div>
                  <motion.div className="col-md-6" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <div className="hero-panel">
                      <div className="hero-vista"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Introducción de la plataforma, con el panel azul para mantener el texto claro legible. */}
          <section className="bg-primary text-white py-5">
            <div className="container py-4">
              <div className="superficie-liquida superficie-liquida-azul">
                <motion.div className="intro-seccion" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="etiqueta etiqueta-clara">Una plataforma, más perspectiva</div>
                  <h2 className="titulo-seccion">Todo lo que necesitas para tomar mejores decisiones.</h2>
                  <p className="texto-lead texto-claro">
                    SONAR está pensado para acercar la información y tener mayor aprobación en las auditorias, para que tu equipo pueda trabajar con más claridad y confianza.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Posibilidades: áreas del negocio que SONAR puede ayudar a organizar. */}
          <section id="posibilidades" className="py-5">
            <div className="container py-4">
              <div className="superficie-liquida">
                <div className="intro-seccion mb-5">
                  <div className="etiqueta">Posibilidades</div>
                  <h2 className="titulo-seccion">Una forma más sencilla de entender tu negocio.</h2>
                  <p className="texto-lead text-secondary">Explora algunas de las áreas en las que SONAR puede ayudar a tu equipo.</p>
                </div>
                <div className="row g-4">
                  {[
                    { num: "01", area: "VENTAS Y CLIENTES", titulo: "Conoce mejor cada oportunidad.", desc: "Organiza tus conversaciones comerciales, visualiza oportunidades y mantén cerca el contexto de cada cliente." },
                    { num: "02", area: "OPERACIONES", titulo: "Haz visible el trabajo que sigue.", desc: "Consulta pedidos, tareas y pendientes para que cada persona sepa qué requiere atención y cuándo actuar." },
                    { num: "03", area: "INVENTARIO", titulo: "Planea con más confianza.", desc: "Visualiza existencias, detecta necesidades y conecta tus decisiones de abastecimiento con el resto del negocio." }
                  ].map((propuesta, indice) => (
                    <motion.article key={indice} className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: indice * 0.15, duration: 0.5 }}>
                      <div className="tarjeta h-100">
                        <div className="tarjeta-etiqueta">{propuesta.num} / {propuesta.area}</div>
                        <h3 className="tarjeta-titulo">{propuesta.titulo}</h3>
                        <p className="text-secondary mb-0">{propuesta.desc}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Un vistazo: carrusel para visualizar funciones y futuras capturas. */}
          <section className="bg-white py-5" id="carrusel">
            <div className="container py-4">
              <div className="superficie-liquida">
                <div className="intro-seccion mb-5">
                  <div className="etiqueta">Imagina SONAR en acción</div>
                  <h2 className="titulo-seccion">Un vistazo a lo que podrás hacer.</h2>
                  <p className="texto-lead text-secondary">Esta sección puede mostrar capturas, mockups o imágenes de las futuras funcionalidades de la plataforma.</p>
                </div>
                <Carrusel />
              </div>
            </div>
          </section>

        </main>

        {/* Footer: enlaces legales, contacto, soporte y navegación secundaria. */}
        <footer className="pie text-white">
          <section className="pie-cta text-white text-center" aria-labelledby="titulo-cta">
            <div className="container py-3">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 id="titulo-cta" className="titulo-seccion">El siguiente capítulo de tu negocio empieza aquí.</h2>
                <p className="cta-texto mx-auto mb-0">Descubre cómo SONAR puede ayudarte a conectar mejor tus equipos, clientes y operaciones.</p>
              </motion.div>
            </div>
          </section>
          <div className="container py-2">
            <div className="row g-2">
              <div className="col-6 col-md-3">
                <section aria-labelledby="pie-terminos">
                  <h2 id="pie-terminos" className="pie-titulo">Términos y condiciones</h2>
                  <button type="button" className="pie-enlace" onClick={() => setPanelFooter('terminos')}>Consulta nuestros términos</button>
                </section>
              </div>
              <div className="col-6 col-md-3">
                <section aria-labelledby="pie-contacto">
                  <h2 id="pie-contacto" className="pie-titulo">Contáctanos</h2>
                  <a className="pie-enlace" href="mailto:contacto@sonar-nexus.com">contacto@sonar-nexus.com</a>
                  <a className="pie-enlace" href="tel:+525500000000">+52 55 0000 0000</a>
                  <a className="pie-enlace" href="https://wa.me/525500000000" target="_blank" rel="noreferrer">WhatsApp: +52 55 0000 0000</a>
                </section>
              </div>
              <div className="col-6 col-md-3">
                <section aria-labelledby="pie-soporte">
                  <h2 id="pie-soporte" className="pie-titulo">Soporte</h2>
                  <button type="button" className="pie-enlace" onClick={() => setPanelFooter('soporte')}>Crear un ticket</button>
                </section>
              </div>
              <div className="col-6 col-md-3">
                <section aria-labelledby="pie-nosotros">
                  <h2 id="pie-nosotros" className="pie-titulo">Nosotros</h2>
                  <a className="pie-enlace" href="/nosotros">Conoce SONAR Nexus</a>
                </section>
              </div>
            </div>
            <div className="pie-final mt-2 pt-2">
              <span>Una manera más clara de impulsar tu negocio</span>
              <span>© 2026 SONAR Nexus</span>
            </div>
          </div>
        </footer>
      </motion.div>

      {/* Ventana emergente: solo existe mientras mostrarFormulario sea true */}
      <AnimatePresence>
        {mostrarFormulario && <Formulario alCerrar={cerrarFormulario} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {panelFooter === 'soporte' && <FormularioSoporte key="soporte" alCerrar={() => setPanelFooter(null)} />}
        {panelFooter === 'terminos' && (
          <VentanaInformativa key="terminos" alCerrar={() => setPanelFooter(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mostrarAvisoCookies && <AvisoCookies alResponder={responderCookies} />}
      </AnimatePresence>
    </>
  );
}