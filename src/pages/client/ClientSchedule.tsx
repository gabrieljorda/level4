import { useState } from "react";

const ClientSchedule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  
  const timeSlots = [
    { time: "8:00", service: "Corte + Barba" },
    { time: "9:00", service: "Corte Simples" },
    { time: "10:00", service: "Barba" },
    { time: "11:00", service: "Corte + Barba" },
    { time: "13:00", service: "Corte Simples" },
    { time: "14:00", service: "Barba" },
    { time: "15:00", service: "Corte + Barba" },
  ];

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
        <h2 className="text-center mb-4">AGENDAMENTO DE HORÁRIOS</h2>
        
        <div className="mb-4">
          <label className="form-label">FILTRO DE DATA</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>HORÁRIO</th>
                <th>O QUE SERÁ FEITO</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot) => (
                <tr key={slot.time}>
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
      </div>
    </div>
  );
};

export default ClientSchedule;
