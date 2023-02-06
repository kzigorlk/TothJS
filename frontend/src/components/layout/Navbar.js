import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/toth.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Toth" />
        <h2>Toth</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Página inicial</Link>
        </li>
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
