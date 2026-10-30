import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// LOGOS (todos viven en la carpeta src/assets/)
// ==========================================
// Para la animación el logo está partido en DOS archivos con el mismo tamaño de lienzo,
// así que al encimarlos quedan exactamente como el logo original:
import logoDelfin from './assets/delfin.svg';          // solo el delfín (sin letras)
import logoLetras from './assets/letras-sonar.svg';    // solo las letras "SONAR"
// El logo completo (delfín + letras juntos) se sigue usando en el footer:
import logoSonar from './assets/Sonar Nexus.svg';

// ==========================================
// TIEMPOS DE LA ANIMACIÓN (cámbialos a tu gusto)
// ==========================================
const TIEMPO_SPLASH_MS = 1800; // milisegundos que el delfín espera a la derecha antes de salir
const DURACION_VUELO = 1.3;    // segundos que tarda en viajar hasta la esquina superior izquierda

// ==========================================
// COMPONENTE: Encabezado (Header y Navbar)
// ==========================================
// Recibe una "prop" llamada splashTerminado: vale false mientras se ve la
// pantalla de carga y pasa a true cuando esta termina.
function Encabezado({ splashTerminado }) {
  // Configuración de aparición que comparten el menú y el botón.
  // Más abajo la "repartimos" en cada uno con {...aparecer}.
  const aparecer = {
    initial: { opacity: 0 },
    animate: { opacity: splashTerminado ? 1 : 0 },
    transition: { duration: 0.6, delay: 0.9 },
  };

  return (
    <header>
      <div className="container navbar">
        <a href="#inicio" className="logo-marca">
          {/*
            El logo es una caja con dos capas encimadas: el delfín y las letras.
            El delfín del navbar SOLO existe cuando la pantalla de carga terminó.
            Tiene el mismo layoutId que el delfín de la pantalla de carga, y por eso
            Framer Motion lo anima desde donde estaba el otro (a la derecha)
            hasta aquí (arriba a la izquierda).
          */}
          {splashTerminado && (
            <motion.div
              layoutId="delfin-sonar"
              className="logo-delfin"
              transition={{ duration: DURACION_VUELO, ease: [0.4, 0, 0.2, 1] }}
            >
              {/*
                El delfín llega nadando hacia la izquierda (volteado, scaleX: -1)
                y casi al llegar se voltea (scaleX: 1) para quedar como en tu logo.
              */}
              <motion.img
                src={logoDelfin}
                alt=""
                initial={{ scaleX: -1 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: DURACION_VUELO * 0.45, duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
          )}

          {/* Las letras aparecen cuando el delfín ya llegó a la esquina */}
          <motion.img
            src={logoLetras}
            alt="SONAR"
            className="logo-letras"
            initial={{ opacity: 0, y: 8 }}
            animate={splashTerminado ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: DURACION_VUELO }}
          />
        </a>

        <motion.nav className="nav-links" {...aparecer}>
          <a href="#posibilidades">Posibilidades</a>
          <a href="#carrusel">Un vistazo</a>
          <a href="#demo">Solicitar demo</a>
        </motion.nav>

        <motion.a href="#demo" className="button button-primary" {...aparecer}>
          Conocer SONAR
        </motion.a>
      </div>
    </header>
  );
}

// ==========================================
// COMPONENTE: Carrusel (Manejo de estado en React)
// ==========================================
function Carrusel() {
  // Variables en español (fáciles de identificar y cambiar)
  const [diapositivaActual, setDiapositivaActual] = useState(0);

  const datosCarrusel = [
    {
      etiqueta: "Espacio para mockup · 01",
      titulo: "La relación con tus clientes, a la vista.",
      descripcion: "Muestra aquí una captura del módulo de clientes, oportunidades o seguimiento comercial.",
      imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Ventas"
    },
    {
      etiqueta: "Espacio para mockup · 02",
      titulo: "El día a día, mejor organizado.",
      descripcion: "Muestra aquí una imagen de pedidos, tareas, proyectos o procesos operativos.",
      imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Operaciones"
    },
    {
      etiqueta: "Espacio para mockup · 03",
      titulo: "Existencias con más claridad.",
      descripcion: "Muestra aquí una captura del módulo de inventario, productos o abastecimiento.",
      imagen: "https://placehold.co/600x400/d7def1/445382?text=Modulo+Inventario"
    }
  ];

  const irASiguiente = () => {
    setDiapositivaActual((prev) => (prev + 1) % datosCarrusel.length);
  };

  const irAAnterior = () => {
    setDiapositivaActual((prev) => (prev - 1 + datosCarrusel.length) % datosCarrusel.length);
  };

  return (
    <div className="carousel">
      {/* Usamos AnimatePresence para animar el cambio entre diapositivas */}
      <AnimatePresence mode='wait'>
        <motion.article
          key={diapositivaActual}
          className="slide active"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'grid' }}
        >
          <div className="slide-content">
            <div className="eyebrow">{datosCarrusel[diapositivaActual].etiqueta}</div>
            <h3>{datosCarrusel[diapositivaActual].titulo}</h3>
            <p>{datosCarrusel[diapositivaActual].descripcion}</p>
          </div>

          <img
            src={datosCarrusel[diapositivaActual].imagen}
            alt={datosCarrusel[diapositivaActual].titulo}
            className="slide-image"
          />
        </motion.article>
      </AnimatePresence>

      <div className="carousel-controls">
        <div className="dots">
          {datosCarrusel.map((_, indice) => (
            <span
              key={indice}
              className={`dot ${indice === diapositivaActual ? 'active' : ''}`}
              onClick={() => setDiapositivaActual(indice)}
            ></span>
          ))}
        </div>

        <div className="carousel-buttons">
          <button className="carousel-button" onClick={irAAnterior}>←</button>
          <button className="carousel-button" onClick={irASiguiente}>→</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (App)
// ==========================================
export default function Aplicacion() {
  // Estado para la pantalla de carga (Splash)
  const [mostrandoSplash, setMostrandoSplash] = useState(true);

  useEffect(() => {
    // Después de TIEMPO_SPLASH_MS se quita la pantalla de carga y comienza el viaje del delfín
    const temporizador = setTimeout(() => {
      setMostrandoSplash(false);
    }, TIEMPO_SPLASH_MS);

    return () => clearTimeout(temporizador);
  }, []);

  return (
    <>
      {/*
        PANTALLA DE CARGA (Splash Screen)
        Mientras mostrandoSplash sea true, se ve el delfín solo (sin letras), pegado al
        lado derecho de la pantalla. Cuando pasa a false este bloque desaparece y el
        delfín "reaparece" en el navbar: ahí es donde ocurre el viaje.
      */}
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

      {/* El encabezado vive FUERA del bloque que se desvanece, para que el delfín no se vea transparente al viajar */}
      <Encabezado splashTerminado={!mostrandoSplash} />

      {/*
        CONTENIDO PRINCIPAL DEL LANDING
        Permanece oculto (invisible) mientras el splash está activo,
        para que los elementos no estorben la animación.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mostrandoSplash ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ visibility: mostrandoSplash ? 'hidden' : 'visible' }}
      >
        <main>
          <section className="hero" id="inicio">
            <div className="container hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="eyebrow">Conoce SONAR</div>
                <h1>Más claridad para hacer crecer tu negocio.</h1>
                <p className="hero-text">
                  SONAR conecta ventas, clientes, operaciones e inventario para que
                  las pequeñas y medianas empresas puedan trabajar con una visión
                  más clara de todo lo que sucede.
                </p>
                <div className="hero-buttons">
                  <a href="#carrusel" className="button button-primary">Descubre lo que puedes hacer</a>
                  <a href="#demo" className="button button-secondary">Solicitar una demostración</a>
                </div>
              </motion.div>

              <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src="https://placehold.co/600x450/dfe5f5/445382?text=Hero+Mockup" 
                  alt="Vista previa de la plataforma SONAR" 
                />
              </motion.div>
            </div>
          </section>

          <section className="intro">
            <div className="container">
              <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="eyebrow" style={{ color: '#cbd6f6' }}>Una plataforma, más perspectiva</div>
                <h2>Todo lo que necesitas para tomar mejores decisiones.</h2>
                <p>
                  SONAR está pensado para acercar la información que importa a las
                  personas que la necesitan, desde el primer contacto con un cliente
                  hasta el seguimiento de pedidos y existencias.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="posibilidades">
            <div className="container">
              <div className="section-heading">
                <div className="eyebrow">Posibilidades</div>
                <h2>Una forma más sencilla de entender tu negocio.</h2>
                <p>Explora algunas de las áreas en las que SONAR puede ayudar a tu equipo.</p>
              </div>

              <div className="proposals">
                {[
                  { num: "01", area: "VENTAS Y CLIENTES", titulo: "Conoce mejor cada oportunidad.", desc: "Organiza tus conversaciones comerciales, visualiza oportunidades y mantén cerca el contexto de cada cliente." },
                  { num: "02", area: "OPERACIONES", titulo: "Haz visible el trabajo que sigue.", desc: "Consulta pedidos, tareas y pendientes para que cada persona sepa qué requiere atención y cuándo actuar." },
                  { num: "03", area: "INVENTARIO", titulo: "Planea con más confianza.", desc: "Visualiza existencias, detecta necesidades y conecta tus decisiones de abastecimiento con el resto del negocio." }
                ].map((propuesta, indice) => (
                  <motion.article
                    key={indice}
                    className="proposal-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: indice * 0.15, duration: 0.5 }}
                  >
                    <div className="proposal-number">{propuesta.num} / {propuesta.area}</div>
                    <h3>{propuesta.titulo}</h3>
                    <p>{propuesta.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="showcase" id="carrusel">
            <div className="container">
              <div className="section-heading">
                <div className="eyebrow">Imagina SONAR en acción</div>
                <h2>Un vistazo a lo que podrás hacer.</h2>
                <p>Esta sección puede mostrar capturas, mockups o imágenes de las futuras funcionalidades de la plataforma.</p>
              </div>
              
              {/* Aquí mandamos llamar al componente de Carrusel */}
              <Carrusel />

            </div>
          </section>

          <section className="cta">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2>El siguiente capítulo de tu negocio empieza aquí.</h2>
                <p>Descubre cómo SONAR puede ayudarte a conectar mejor tus equipos, clientes y operaciones.</p>
                <a href="#demo" className="button button-secondary">Solicitar una demostración</a>
              </motion.div>
            </div>
          </section>

          <section className="form-section" id="demo">
            <div className="container">
              <motion.div
                className="form-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2>Conoce lo que SONAR puede hacer por ti.</h2>
                <p>Déjanos tus datos y nosotros nos contactaremos contigo.</p>

                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  alert("¡Gracias! Tu solicitud fue registrada."); 
                }}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="nombre">Tu nombre</label>
                      <input type="text" id="nombre" required placeholder="Escribe tu nombre" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="empresa">Empresa</label>
                      <input type="text" id="empresa" placeholder="Nombre de tu empresa" />
                    </div>
                    <div className="form-group full">
                      <label htmlFor="email">Correo electrónico</label>
                      <input type="email" id="email" required placeholder="tu@email.com" />
                    </div>
                    <div className="form-group full">
                      <label htmlFor="mensaje">¿Qué te gustaría conocer?</label>
                      <textarea id="mensaje" placeholder="Cuéntanos qué área de tu negocio quieres mejorar"></textarea>
                    </div>
                  </div>
                  <button type="submit" className="button button-primary" style={{ marginTop: '20px' }}>
                    Solicitar demostración
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        </main>

        <footer>
          <div className="container footer-content">
            <p>Una manera más clara de conectar tu negocio.</p>
            <p>© 2026 SONAR Nexus</p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
