import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarbershopLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Barbershop login:", formData);
    navigate("/barbershop/dashboard");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-secondary text-white">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">ATHON HAIR</h1>
                <h2 className="text-center mb-3">LOGIN</h2>
                <h4 className="text-center mb-4">LOGIN BARBEARIA</h4>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Usuário:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Senha:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    ENTRAR
                  </button>

                  <div className="text-center mt-3">
                    <a href="/barbershop/register" className="text-white">
                      Não tem conta? Registre-se
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopLogin;
