import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma.js";

// --- CONFIGURAÇÃO ---
const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10; // Custo de hash do bcrypt

// Middleware
app.use(express.json()); // Permite ler JSON no corpo da requisição

// Captura erros de JSON inválido e evita crash do servidor
app.use((err, req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    console.error("JSON parse error:", err.message);
    return res.status(400).json({ error: "Corpo JSON inválido." });
  }
  return next(err);
});

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);

// Rota de saúde: verifica se o servidor está funcionando
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Servidor Express ATIVO! 🚀",
    message:
      "Acesse as rotas da API: /api/clientes/login, /api/agendamentos etc.",
  });
});

// --- ROTAS DE AUTENTICAÇÃO E CLIENTES ---

// [POST] Rota de Cadastro de Cliente (Nome, Telefone, Senha)
app.post("/api/clientes/cadastro", async (req, res) => {
  const data = req.body;

  console.log(data);

  if (!data.name || !data.telefone || !data.senha) {
    return res
      .status(400)
      .json({ error: "Nome, telefone e senha são obrigatórios." });
  }

  try {
    // 1. Criptografa a senha antes de salvar
    const senha_hash = await bcrypt.hash(data.senha, saltRounds);

    // Schema Prisma usa: Cliente { name, telefone, password }
    await prisma.cliente.create({
      data: {
        name: data.name,
        telefone: Number(data.telefone),
        password: senha_hash,
      },
    });
    return res.status(201).json({
      message: "Cadastro realizado com sucesso.",
    });
  } catch (error) {
    console.error("ERRO no cadastro:", error.message || error);

    // Tratamento comum para unique constraint (ajustado ao nome gerado pelo Prisma)
    if (
      error.message &&
      (error.message.includes("Cliente_telefone_key") ||
        error.message.includes("telefone"))
    ) {
      return res
        .status(409)
        .json({ error: "Telefone já cadastrado. Por favor, faça login." });
    }

    return res.status(500).json({ error: "Falha interna no cadastro." });
  }
});

// [POST] Rota de Login (Telefone e Senha)
app.post("/api/clientes/login", async (req, res) => {
  const { telefone, senha } = req.body || {};

  if (!telefone || !senha) {
    return res
      .status(400)
      .json({ error: "Telefone e senha são obrigatórios para login." });
  }

  try {
    // 1. Busca o cliente pelo telefone usando Prisma
    const cliente = await prisma.cliente.findUnique({
      where: { telefone: Number(telefone) },
      select: { id: true, name: true, telefone: true, password: true },
    });

    if (!cliente) {
      return res.status(401).json({ error: "Telefone ou senha inválidos." });
    }

    // 2. Compara a senha fornecida com o hash salvo
    const match = await bcrypt.compare(senha, cliente.password);

    if (!match) {
      return res.status(401).json({ error: "Telefone ou senha inválidos." });
    }

    // 3. Login bem-sucedido. Retorna dados do cliente (SEM O HASH DA SENHA)
    const clienteResp = {
      id: cliente.id,
      name: cliente.name,
      telefone: cliente.telefone,
    };

    // Em produção, aqui seria gerado e retornado um Token JWT.
    return res.status(200).json({
      message: "Login bem-sucedido!",
      cliente: clienteResp,
    });
  } catch (error) {
    console.error("ERRO no login:", error.message || error);
    return res.status(500).json({ error: "Falha interna no login." });
  }
});

// [GET] Listar todos os clientes (Acesso ADM)
app.get("/api/clientes", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      select: { id: true, name: true, telefone: true },
      orderBy: { id: "desc" },
    });
    return res.status(200).json(clientes);
  } catch (error) {
    console.error("ERRO ao listar clientes:", error.message || error);
    return res.status(500).json({ error: "Falha ao buscar clientes." });
  }
});

// --- ROTAS DE AGENDAMENTOS ---

// [GET] Listar todos os agendamentos (Acesso ADM)
app.get("/api/agendamentos", async (req, res) => {
  try {
    // Usamos SQL bruto para trazer dados relacionados (tabelas criadas via Prisma)
    const agendamentos = await prisma.$queryRaw`
            SELECT a."id", a."dataHora" as "dataHora", a."barbeiroId", a."clienteId",
                   c."name" AS "cliente_nome", c."telefone" AS "cliente_telefone"
            FROM "Agendamento" a
            JOIN "Cliente" c ON a."clienteId" = c."id"
            ORDER BY a."dataHora" DESC;
        `;
    return res.status(200).json(agendamentos);
  } catch (error) {
    console.error("ERRO ao listar agendamentos:", error.message || error);
    return res.status(500).json({ error: "Falha ao buscar agendamentos." });
  }
});

// [POST] Agendar um novo horário (Acesso CLIENTE - Apenas Criação)
app.post("/api/agendamentos", async (req, res) => {
  // Schema atual do DB tem: Agendamento { clienteId, barbeiroId, dataHora }
  const { clienteId, barbeiroId, dataHora } = req.body;

  if (!clienteId || !dataHora) {
    return res.status(400).json({
      error: "Dados de agendamento incompletos. Requer clienteId e dataHora.",
    });
  }

  try {
    // 1. Verifica existência do cliente
    const clienteCheck = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!clienteCheck) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // 2. Insere o agendamento
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        clienteId: Number(clienteId),
        barbeiroId: barbeiroId ? Number(barbeiroId) : 0,
        dataHora: new Date(dataHora),
      },
      select: { id: true, clienteId: true, barbeiroId: true, dataHora: true },
    });

    return res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error("ERRO ao agendar horário:", error.message || error);
    return res
      .status(500)
      .json({ error: "Não foi possível realizar o agendamento." });
  }
});

// [PUT] Editar agendamento (Acesso ADM - Permite Mudar Status/Horário)
app.put("/api/agendamentos/:id", async (req, res) => {
  // Esta rota deve ser acessada apenas pelo administrador (logica de autenticacao seria adicionada aqui)
  const { id } = req.params;
  const { data_hora, servico, status } = req.body;

  if (!data_hora && !servico && !status) {
    return res
      .status(400)
      .json({ error: "Nenhum campo para atualização fornecido." });
  }

  try {
    // Monta o objeto de update dinamicamente para Prisma
    const dataToUpdate = {};
    if (data_hora) dataToUpdate.dataHora = new Date(data_hora);
    if (servico) dataToUpdate.servico = servico; // servico não existe no schema atual — ficará como campo extra se adicionado
    if (status) dataToUpdate.status = status; // idem

    const updated = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("ERRO ao editar agendamento:", error.message || error);
    // Checa erro de não encontrado
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Agendamento não encontrado." });
    }
    return res.status(500).json({ error: "Falha ao atualizar o agendamento." });
  }
});

// --- INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Server Express rodando em http://localhost:${PORT} 🚀`);
});
