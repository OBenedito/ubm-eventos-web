import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const TIPOS = [
  "Congresso",
  "Workshop",
  "Palestra",
  "Competição",
  "Minicurso",
  "Feira",
];

const FORM_VAZIO = {
  titulo: "",
  tipo: "",
  data: "",
  local: "",
  vagas: "",
  descricao: "",
};

function paraDataBr(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function NovoEvento() {
  const [form, setForm] = useState(FORM_VAZIO);
  const [erros, setErros] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  function alterarCampo(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function salvar(e) {
    e.preventDefault();
    setEnviando(true);
    setErros([]);

    try {
      const resposta = await axios.post("http://localhost:3001/eventos", {
        ...form,
        data: paraDataBr(form.data),
        vagas: Number(form.vagas),
      });
      navigate(`/eventos/${resposta.data.id}`);
    } catch (erro) {
      if (erro.response?.status === 400) {
        setErros(erro.response.data.detalhes);
      } else {
        setErros(["Não foi possível salvar o evento. Tente novamente."]);
      }
      setEnviando(false);
    }
  }

  return (
    <section className="pagina">
      <h2>Novo evento</h2>

      {erros.length > 0 && (
        <ul className="form-erros">
          {erros.map((mensagem) => (
            <li key={mensagem}>{mensagem}</li>
          ))}
        </ul>
      )}

      <form className="formulario" onSubmit={salvar}>
        <label>
          Título
          <input
            name="titulo"
            value={form.titulo}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Tipo
          <select
            name="tipo"
            value={form.tipo}
            onChange={alterarCampo}
            required
          >
            <option value="">Selecione...</option>
            {TIPOS.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>

        <div className="form-linha">
          <label>
            Data
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={alterarCampo}
              required
            />
          </label>

          <label>
            Vagas
            <input
              type="number"
              name="vagas"
              min="1"
              value={form.vagas}
              onChange={alterarCampo}
              required
            />
          </label>
        </div>

        <label>
          Local
          <input
            name="local"
            value={form.local}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Descrição (opcional)
          <textarea
            name="descricao"
            rows="3"
            value={form.descricao}
            onChange={alterarCampo}
          />
        </label>

        <button type="submit" className="botao" disabled={enviando}>
          {enviando ? "Salvando..." : "Salvar evento"}
        </button>
      </form>
    </section>
  );
}

export default NovoEvento;