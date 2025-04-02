import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Phone, Mail, Key, Shield } from 'lucide-react';
import { RiAdminFill, RiHeartFill, RiHomeFill } from 'react-icons/ri'
import '../../styles/dashboardEmpleado.css';
import '../../fonts/remixicon.css';
import { motion } from 'framer-motion';

const DashboardEmpleado = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [message, setMessage] = useState('');

  console.log("Datos del usuario:", user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('Perfil actualizado exitosamente');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };
  
  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
      <RiAdminFill size={32} />
        <h1>Bienvenido, {user.realName}</h1>
        <div className="role-info">
          <Shield className="h-4 w-4" />
          <span>Rol: {user.role}</span>
          {user.isVerified && <span className="verified">(Verificado)</span>}
        </div>
      </header>

      {message && <motion.div className="message success" animate={{ opacity: 1 }}>{message}</motion.div>}

      <section className="profile-section">
        {isEditing ? (
          <motion.form onSubmit={handleSubmit} className="profile-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label>Nombre
              <input name="realName" value={userData.realName} onChange={handleInputChange} />
            </label>
            <label>Apellidos
              <input name="lastName" value={userData.lastName} onChange={handleInputChange} />
            </label>
            <label>
              <Mail className="icon" /> Correo Electrónico
              <input name="email" type="email" value={userData.email} onChange={handleInputChange} />
            </label>
            <label>
              <Phone className="icon" /> Teléfono
              <input name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} />
            </label>
            <label>
              <Key className="icon" /> Palabra Secreta
              <input name="secretWord" type="password" value={userData.secretWord} onChange={handleInputChange} />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn save">Guardar</button>
              <button type="button" className="btn cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          </motion.form>
        ) : (
          <motion.div className="profile-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p><strong>Nombre:</strong> {user.realName}</p>
            <p><strong>Apellidos:</strong> {user.lastName}</p>
            <p><Mail className="h-4 w-4" /> {user.email}</p>
            <p> <Phone className="h-4 w-4" /> {user.phoneNumber}</p>
            <p> <Key className="h-4 w-4" /> ********</p>
            <button className="btn edit" onClick={() => setIsEditing(true)}>Editar Perfil</button>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};

export default DashboardEmpleado;
