import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarbershopProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Barbearia Elite",
    phone: "(11) 3456-7890",
    newPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Barbershop profile updated:", profileData);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-vh-100 bg-dark text-white">
      <nav className="navbar navbar-dark bg-secondary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ATHON HAIR</span>
          <div className="d-flex gap-3">
            <a href="/barbershop/dashboard" className="text-white text-decoration-none">CRIAR AGENDA</a>
            <a href="/barbershop/appointments" className="text-white text-decoration-none">AGENDA</a>
            <a href="/barbershop/profile" className="text-white text-decoration-none">MEU PERFIL</a>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-secondary">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">MEU PERFIL</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">NOME BARBEARIA</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">TELEFONE:</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">ALTERAR SENHA</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Nova senha"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    SALVAR ALTERAÇÕES
                  </button>
                  
                  <button type="button" onClick={handleLogout} className="btn btn-danger w-100">
                    SAIR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopProfile;
