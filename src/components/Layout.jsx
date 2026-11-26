import { NavLink, Outlet } from "react-router";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <nav className="app-nav">
        <NavLink to="/" end>
          Eventos
        </NavLink>
        <NavLink to="/eventos/novo">Novo evento</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;