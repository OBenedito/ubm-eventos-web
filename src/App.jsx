import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventoDetalhe from "./pages/EventoDetalhe";
import NovoEvento from "./pages/NovoEvento";
import Sobre from "./pages/Sobre";
import NaoEncontrado from "./pages/NaoEncontrado";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/eventos/novo" element={<NovoEvento />} />
        <Route path="/eventos/:id" element={<EventoDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;