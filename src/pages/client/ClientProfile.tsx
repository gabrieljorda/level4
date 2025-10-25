import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ClientProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    phone: "(11) 98765-4321",
    newPassword: "",
  });
  const [currentPlan, setCurrentPlan] = useState<string>("basic");

  useEffect(() => {
    const plan = localStorage.getItem("clientPlan") || "basic";
    setCurrentPlan(plan);
  }, []);

  const getPlanName = (planId: string) => {
    const plans: Record<string, string> = {
      basic: "BÁSICO - R$ 49,90/mês",
      premium: "PREMIUM - R$ 99,90/mês",
      vip: "VIP - R$ 149,90/mês",
    };
    return plans[planId] || "Nenhum plano";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
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
            <a href="/client/schedule" className="text-white text-decoration-none">AGENDAR</a>
            <a href="/client/profile" className="text-white text-decoration-none">MEU PERFIL</a>
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
                    <label className="form-label">NOME</label>
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

                  <div className="mb-4 p-3 bg-dark rounded">
                    <label className="form-label">PLANO ATUAL</label>
                    <p className="mb-2">{getPlanName(currentPlan)}</p>
                    <Button
                      type="button"
                      onClick={() => navigate("/client/plans")}
                      variant="outline"
                      className="w-100"
                    >
                      TROCAR DE PLANO
                    </Button>
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

export default ClientProfile;
