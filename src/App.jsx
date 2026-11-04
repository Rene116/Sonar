import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoDelfin from './assets/delfin.svg';          
import logoLetras from './assets/letras-sonar.svg';    
import Formulario from './Formulario.jsx';  

const TIEMPO_SPLASH_MS = 1800; 
const DURACION_VUELO = 1.3;    

function Encabezado({ splashTerminado }) {
  const aparecer = {
    initial: { opacity: 0 },
    animate: { opacity: splashTerminado ? 1 : 0 },
    transition: { duration: 0.6, delay: 0.9 },
  };

  return (
    <header className="bg-white sticky-top border-bottom" style={{ zIndex: 10 }}>
      <div className="container d-flex align-items-center justify-content-between" style={{ minHeight: '76px' }}>
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

        <motion.nav className="d-none d-md-flex align-items-center gap-4" {...aparecer}>
          <a href="#posibilidades" className="text-secondary text-decoration-none fw-medium" style={{ fontSize: '15px' }}>Posibilidades</a>
          <a href="#carrusel" className="text-secondary text-decoration-none fw-medium" style={{ fontSize: '15px' }}>Un vistazo</a>
          <a href="#demo" className="text-secondary text-decoration-none fw-medium" style={{ fontSize: '15px' }}>Solicitar demo</a>
        </motion.nav>

        <motion.a href="#demo" className="btn btn-primary fw-bold px-4 py-2" style={{ borderRadius: '10px' }} {...aparecer}>
          Conocer SONAR
        </motion.a>
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

  const irASiguiente = () => setDiapositivaActual((prev) => (prev + 1) % datosCarrusel.length);
  const irAAnterior = () => setDiapositivaActual((prev) => (prev - 1 + datosCarrusel.length) % datosCarrusel.length);

  return (
    <div className="position-relative overflow-hidden p-4 p-md-5" style={{ borderRadius: '22px', background: '#edf1fa', minHeight: '460px' }}>
      <AnimatePresence mode='wait'>
        <motion.article
          key={diapositivaActual}
          className="row align-items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="col-md-6 mb-4 mb-md-0 pe-md-5">
            <div className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '13px', letterSpacing: '1.5px' }}>
              {datosCarrusel[diapositivaActual].etiqueta}
            </div>
            <h3 className="fw-bold mb-3" style={{ fontSize: '34px', lineHeight: '1.1' }}>{datosCarrusel[diapositivaActual].titulo}</h3>
            <p className="text-secondary" style={{ fontSize: '17px' }}>{datosCarrusel[diapositivaActual].descripcion}</p>
          </div>
          <div className="col-md-6">
            <img
              src={datosCarrusel[diapositivaActual].imagen}
              alt={datosCarrusel[diapositivaActual].titulo}
              className="w-100 object-fit-cover shadow-sm"
              style={{ height: '300px', borderRadius: '15px', background: '#d7def1' }}
            />
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <div className="d-flex gap-2">
          {datosCarrusel.map((_, indice) => (
            <div key={indice} className={`dot-custom ${indice === diapositivaActual ? 'active' : ''}`} onClick={() => setDiapositivaActual(indice)}></div>
          ))}
        </div>
        <div className="d-flex gap-2">
          <button className="btn d-flex align-items-center justify-content-center bg-white text-primary border" style={{ width: '42px', height: '42px', borderRadius: '50%', borderColor: '#ccd4e8' }} onClick={irAAnterior}>←</button>
          <button className="btn d-flex align-items-center justify-content-center bg-white text-primary border" style={{ width: '42px', height: '42px', borderRadius: '50%', borderColor: '#ccd4e8' }} onClick={irASiguiente}>→</button>
        </div>
      </div>
    </div>
  );
}

export default function Aplicacion() {
  const [mostrandoSplash, setMostrandoSplash] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrandoSplash(false);
    }, TIEMPO_SPLASH_MS);
    return () => clearTimeout(temporizador);
  }, []);

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

      <Encabezado splashTerminado={!mostrandoSplash} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mostrandoSplash ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ visibility: mostrandoSplash ? 'hidden' : 'visible' }}
      >
        <main>
          {/* Hero */}
          <section className="py-5" id="inicio" style={{ background: 'radial-gradient(circle at 85% 15%, #dce3f8 0, transparent 30%)' }}>
            <div className="container py-4 py-md-5">
              <div className="row align-items-center gy-5">
                <motion.div className="col-md-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <div className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '13px', letterSpacing: '1.5px' }}>Conoce SONAR</div>
                  <h1 className="fw-bold text-dark" style={{ fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '25px' }}>
                    Más claridad para hacer crecer y tener éxito en tu negocio.
                  </h1>
                  <p className="text-secondary mb-4" style={{ fontSize: '19px', maxWidth: '570px' }}>
                    SONAR conecta inventario, mapeo de redes, tickets y herramientas para controlar las auditorias.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <a href="#carrusel" className="btn btn-primary fw-bold px-4 py-2" style={{ borderRadius: '10px' }}>Descubre lo que puedes hacer con SONAR</a>
                    <a href="#demo" className="btn bg-white text-primary fw-bold px-4 py-2" style={{ border: '1px solid #d9dfef', borderRadius: '10px' }}>Solicita más información</a>
                  </div>
                </motion.div>
                <motion.div className="col-md-6" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <div className="bg-primary p-4 shadow-lg" style={{ borderRadius: '24px' }}>
                    <div className="w-100" style={{ borderRadius: '15px', background: '#dfe5f5', minHeight: '320px' }}></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-primary text-white py-5">
            <div className="container py-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '650px' }}>
                <div className="fw-bold text-uppercase mb-3" style={{ fontSize: '13px', letterSpacing: '1.5px', color: '#cbd6f6' }}>Una plataforma, más perspectiva</div>
                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.1' }}>Todo lo que necesitas para tomar mejores decisiones.</h2>
                <p style={{ fontSize: '18px', color: '#d9e1fa' }}>
                  SONAR está pensado para acercar la información y tener mayor aprobación en las auditorias, para que tu equipo pueda trabajar con más claridad y confianza.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Posibilidades */}
          <section id="posibilidades" className="py-5">
            <div className="container py-4">
              <div className="mb-5" style={{ maxWidth: '650px' }}>
                <div className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '13px', letterSpacing: '1.5px' }}>Posibilidades</div>
                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.1' }}>Una forma más sencilla de entender tu negocio.</h2>
                <p className="text-secondary" style={{ fontSize: '18px' }}>Explora algunas de las áreas en las que SONAR puede ayudar a tu equipo.</p>
              </div>
              <div className="row g-4">
                {[
                  { num: "01", area: "VENTAS Y CLIENTES", titulo: "Conoce mejor cada oportunidad.", desc: "Organiza tus conversaciones comerciales, visualiza oportunidades y mantén cerca el contexto de cada cliente." },
                  { num: "02", area: "OPERACIONES", titulo: "Haz visible el trabajo que sigue.", desc: "Consulta pedidos, tareas y pendientes para que cada persona sepa qué requiere atención y cuándo actuar." },
                  { num: "03", area: "INVENTARIO", titulo: "Planea con más confianza.", desc: "Visualiza existencias, detecta necesidades y conecta tus decisiones de abastecimiento con el resto del negocio." }
                ].map((propuesta, indice) => (
                  <motion.article key={indice} className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: indice * 0.15, duration: 0.5 }}>
                    <div className="card h-100 p-4 border bg-white hover-shadow" style={{ borderRadius: '18px', borderColor: '#e4e8f2' }}>
                      <div className="text-primary fw-bold mb-3" style={{ fontSize: '13px', letterSpacing: '1px' }}>{propuesta.num} / {propuesta.area}</div>
                      <h3 className="fw-bold mb-3" style={{ fontSize: '23px' }}>{propuesta.titulo}</h3>
                      <p className="text-secondary mb-0">{propuesta.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* Showcase Carrusel */}
          <section className="bg-white py-5" id="carrusel">
            <div className="container py-4">
              <div className="mb-5" style={{ maxWidth: '650px' }}>
                <div className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '13px', letterSpacing: '1.5px' }}>Imagina SONAR en acción</div>
                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.1' }}>Un vistazo a lo que podrás hacer.</h2>
                <p className="text-secondary" style={{ fontSize: '18px' }}>Esta sección puede mostrar capturas, mockups o imágenes de las futuras funcionalidades de la plataforma.</p>
              </div>
              <Carrusel />
            </div>
          </section>

          {/* CTA */}
          <section className="bg-dark text-white text-center py-5">
            <div className="container py-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(32px, 4vw, 50px)' }}>El siguiente capítulo de tu negocio empieza aquí.</h2>
                <p className="mx-auto mb-4" style={{ color: '#ccd4e8', maxWidth: '600px', fontSize: '18px' }}>Descubre cómo SONAR puede ayudarte a conectar mejor tus equipos, clientes y operaciones.</p>
                <a href="#demo" className="btn bg-white text-primary fw-bold px-4 py-2 mt-2" style={{ borderRadius: '10px' }}>Solicitar una demostración</a>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white py-4" style={{ borderTop: '1px solid #e4e8f2' }}>
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-secondary" style={{ fontSize: '14px' }}>
            <p className="mb-0">Una manera más clara de impulsar tu negocio</p>
            <p className="mb-0">© 2026 SONAR Nexus</p>
            <p className="mb-0">Redes sociales</p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}