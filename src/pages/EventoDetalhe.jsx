import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";

function EventoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    async function carregarEvento() {
      try {
        const resposta = await axios.get(`http://localhost:3001/eventos/${id}`);
        setEvento(resposta.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setErro("Evento não encontrado.");
        } else {
          setErro("Erro ao carregar os detalhes do evento.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarEvento();
  }, [id]);

  async function excluir() {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir o evento "${evento.titulo}"?`
    );
    if (!confirmou) return;

    setExcluindo(true);
    setErro("");

    try {
      await axios.delete(`http://localhost:3001/eventos/${id}`);
      navigate("/");
    } catch {
      setErro("Não foi possível excluir o evento. Tente novamente.");
      setExcluindo(false);
    }
  }

  if (carregando) {
    return (
      <section className="pagina">
        <p>Carregando evento...</p>
      </section>
    );
  }

  if (erro && !evento) {
    return (
      <section className="pagina">
        <p>{erro}</p>
        <Link to="/" className="voltar">
          ← Voltar para eventos
        </Link>
      </section>
    );
  }

  return (
    <section className="pagina">
      <Link to="/" className="voltar">
        ← Voltar para eventos
      </Link>

      {erro && <p className="form-erros">{erro}</p>}

      <article className="detalhe-card">
        <span className="badge">{evento.tipo}</span>
        <h2>{evento.titulo}</h2>

        <ul className="detalhe-lista">
          <li>
            <strong>Data:</strong> {evento.data}
          </li>
          <li>
            <strong>Local:</strong> {evento.local}
          </li>
          <li>
            <strong>Vagas:</strong> {evento.vagas}
          </li>
        </ul>

        {evento.descricao && <p className="detalhe-desc">{evento.descricao}</p>}

        <button
          type="button"
          className="botao-perigo"
          onClick={excluir}
          disabled={excluindo}
        >
          {excluindo ? "Excluindo..." : "Excluir evento"}
        </button>
      </article>
    </section>
  );
}

export default EventoDetalhe;