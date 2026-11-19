import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Formulario({ alCerrar }) {
  const [enviado, setEnviado] = useState(false);

  // Al abrir: deja el cursor en "Tu nombre" y bloquea el scroll de la página de atrás
  useEffect(() => {
    document.getElementById('nombre')?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Cerrar con la tecla Esc
  useEffect(() => {
    const alPulsarTecla = (evento) => {
      if (evento.key === 'Escape') alCerrar();
    };
    document.addEventListener('keydown', alPulsarTecla);
    return () => document.removeEventListener('keydown', alPulsarTecla);
  }, [alCerrar]);

  // Cerrar al hacer clic en el fondo oscuro (no dentro de la ventana)
  const cerrarSiEsElFondo = (evento) => {
    if (evento.target === evento.currentTarget) alCerrar();
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(evento.target));

    // AQUÍ se conecta tu backend o servicio, por ejemplo:
    // await fetch('https://tu-api.com/solicitudes', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(datos),
    // });
    console.log('Solicitud:', datos);

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
        aria-labelledby="titulo-formulario"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        <button type="button" className="btn-close ventana-cerrar" aria-label="Cerrar" onClick={alCerrar} />

        <h2 id="titulo-formulario" className="fw-bold mb-2 pe-4">Conoce lo que SONAR puede hacer por ti.</h2>
        <p className="text-secondary mb-4">Déjanos tus datos y nosotros nos contactaremos contigo.</p>

        <form onSubmit={manejarEnvio} onChange={() => setEnviado(false)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Tu nombre</label>
              <input type="text" id="nombre" name="nombre" className="form-control campo" required placeholder="Escribe tu nombre" />
            </div>
            <div className="col-md-6">
              <label htmlFor="empresa" className="form-label">Empresa</label>
              <input type="text" id="empresa" name="empresa" className="form-control campo" placeholder="Nombre de tu empresa" />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input type="email" id="email" name="email" className="form-control campo" required placeholder="tu@email.com" />
            </div>
            <div className="col-12">
              <label htmlFor="mensaje" className="form-label">¿Qué te gustaría conocer?</label>
              <textarea id="mensaje" name="mensaje" className="form-control campo" rows="4" placeholder="Cuéntanos qué área de tu negocio quieres mejorar"></textarea>
            </div>
          </div>

          {enviado && (
            <div className="alert alert-success mt-4 mb-0" role="status">
              ¡Gracias! Tu solicitud fue registrada.
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-sonar py-3 mt-4">
            Solicitar demostración
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}