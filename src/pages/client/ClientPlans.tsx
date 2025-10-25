import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ClientPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "BÁSICO",
      price: "R$ 49,90",
      features: [
        "1 corte por mês",
        "Atendimento padrão",
        "Agendamento online",
      ],
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: "R$ 99,90",
      features: [
        "2 cortes por mês",
        "Atendimento prioritário",
        "Agendamento online",
        "Desconto em produtos",
      ],
      highlighted: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: "R$ 149,90",
      features: [
        "Cortes ilimitados",
        "Atendimento VIP",
        "Agendamento prioritário",
        "Desconto em produtos",
        "Barbeiro exclusivo",
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem("clientPlan", planId);
    navigate("/client/profile");
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
        <h1 className="text-center mb-5">ESCOLHA SEU PLANO</h1>
        
        <div className="row g-4">
          {plans.map((plan) => (
            <div key={plan.id} className="col-md-4">
              <Card className={`h-100 ${plan.highlighted ? 'border-primary border-3' : ''}`}>
                <div className="card-body p-4 bg-secondary text-white">
                  {plan.highlighted && (
                    <div className="badge bg-primary mb-3">MAIS POPULAR</div>
                  )}
                  <h3 className="text-center mb-3">{plan.name}</h3>
                  <h2 className="text-center mb-4">{plan.price}/mês</h2>
                  
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2 d-flex align-items-center">
                        <Check className="me-2" size={20} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-100"
                    variant={plan.highlighted ? "default" : "secondary"}
                  >
                    SELECIONAR PLANO
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPlans;
