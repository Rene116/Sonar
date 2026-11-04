import React from 'react';
import { motion } from 'framer-motion';

export default function Formulario() {
  // Todo el HTML debe ir obligatoriamente dentro del "return"
  return (
    <section className="py-5" id="demo" style={{ background: '#e9edf6' }}>
      <div className="container py-4">
        <motion.div 
          className="card border-0 mx-auto bg-white p-4 p-md-5" 
          style={{ maxWidth: '700px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(32, 41, 67, 0.08)' }} 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        >
          <h2 className="fw-bold mb-2">Conoce lo que SONAR puede hacer por ti.</h2>
          <p className="text-secondary mb-4">Déjanos tus datos y nosotros nos contactaremos contigo.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("¡Gracias! Tu solicitud fue registrada."); }}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label fw-bold" style={{ fontSize: '14px' }}>Tu nombre</label>
                <input type="text" id="nombre" className="form-control px-3 py-2" required placeholder="Escribe tu nombre" style={{ borderColor: '#d8deec', borderRadius: '9px' }} />
              </div>
              <div className="col-md-6">
                <label htmlFor="empresa" className="form-label fw-bold" style={{ fontSize: '14px' }}>Empresa</label>
                <input type="text" id="empresa" className="form-control px-3 py-2" placeholder="Nombre de tu empresa" style={{ borderColor: '#d8deec', borderRadius: '9px' }} />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label fw-bold" style={{ fontSize: '14px' }}>Correo electrónico</label>
                <input type="email" id="email" className="form-control px-3 py-2" required placeholder="tu@email.com" style={{ borderColor: '#d8deec', borderRadius: '9px' }} />
              </div>
              <div className="col-12">
                <label htmlFor="mensaje" className="form-label fw-bold" style={{ fontSize: '14px' }}>¿Qué te gustaría conocer?</label>
                <textarea id="mensaje" className="form-control px-3 py-2" rows="4" placeholder="Cuéntanos qué área de tu negocio quieres mejorar" style={{ borderColor: '#d8deec', borderRadius: '9px', resize: 'vertical' }}></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary fw-bold px-4 py-3 mt-4" style={{ borderRadius: '10px' }}>
              Solicitar demostración
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}