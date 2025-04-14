import React, { useState } from 'react';

const InicioSesion = ({registro}) => {

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  // Estado para errores
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: !/^\S+@\S+\.\S+$/.test(value)
      }));
    }
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 6
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación final
    if (!formData.email || !formData.password || errors.email || errors.password) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    // Aquí iría la lógica de autenticación (API, etc.)
    registro(formData);
    console.log('Datos enviados:', formData);
    alert(`Bienvenido ${formData.nombre || 'usuario'}!`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        
          <div className="container shadow">
            <div className="container p-4">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Campo Nombre (opcional) */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>
  
                {/* Campo Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email*</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">Email no válido</div>
                  )}
                </div>
  
                {/* Campo Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña*</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">Mínimo 6 caracteres</div>
                  )}
                </div>
  
                {/* Botón de envío */}
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={errors.email || errors.password}
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        
      </div>
    </div>
  );
};


export default InicioSesion;