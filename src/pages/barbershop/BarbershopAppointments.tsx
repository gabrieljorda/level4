const BarbershopAppointments = () => {
  const appointments = [
    { time: "8:00", clientName: "João Silva" },
    { time: "9:00", clientName: "Maria Santos" },
    { time: "10:00", clientName: "Pedro Costa" },
    { time: "14:00", clientName: "Ana Lima" },
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
        <h2 className="text-center mb-4">AGENDA</h2>
        
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>DATA</th>
                <th>NOME CLIENTE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt, index) => (
                <tr key={index}>
                  <td>{apt.time}</td>
                  <td>{apt.clientName}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => console.log("Unmarking:", apt)}
                    >
                      DESMARCAR
                    </button>
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

export default BarbershopAppointments;
