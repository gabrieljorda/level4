const Home = () => {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white">
      <div className="container text-center">
        <h1 className="display-1 fw-bold mb-5">ATHON HAIR</h1>
        
        <div className="row justify-content-center gap-4 mb-5">
          <div className="col-md-4">
            <a href="/client/login" className="btn btn-outline-light btn-lg w-100 py-3">
              LOGIN/CLIENTE
            </a>
          </div>
          <div className="col-md-4">
            <a href="/barbershop/login" className="btn btn-outline-light btn-lg w-100 py-3">
              LOGIN/BARBEARIA
            </a>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="fw-normal">ATHON HAIR É A FERRAMENTA PARA ALAVANCAR O SEU NEGÓCIO</h4>
          <p className="lead mt-3">
            Athon Hair conecta as pessoas aos melhores parceiros que ofertam serviços de barbearia 
            com uma única assinatura que custa menos e oferece muito mais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
