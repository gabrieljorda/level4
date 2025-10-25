import { useState } from "react";

const BarbershopDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "",
    service: "",
  });

  const timeSlots = [
    { time: "8:00", service: "Disponível" },
    { time: "9:00", service: "Disponível" },
    { time: "10:00", service: "Disponível" },
  ];

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
        <h2 className="text-center mb-4">AGENDAMENTO DE HORÁRIOS</h2>
        
        <div className="table-responsive mb-4">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>DATA</th>
                <th>O QUE SERÁ FEITO</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.time}</td>
                  <td>{slot.service}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">AGENDAR</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button 
            className="btn btn-success btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            CRIAR AGENDAMENTO
          </button>
        </div>

        {showCreateModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content bg-secondary text-white">
                <div className="modal-header">
                  <h5 className="modal-title">Criar Novo Horário</h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white"
                    onClick={() => setShowCreateModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Data:</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newSlot.date}
                        onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Horário:</label>
                      <input
                        type="time"
                        className="form-control"
                        value={newSlot.time}
                        onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Serviço:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newSlot.service}
                        onChange={(e) => setNewSlot({ ...newSlot, service: e.target.value })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("Creating slot:", newSlot);
                      setShowCreateModal(false);
                    }}
                  >
                    Criar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarbershopDashboard;
