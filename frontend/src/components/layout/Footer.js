import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        <span className="bold">Toth</span> &copy; 2023
      </p>
    </footer>
  );
}

export default Footer;
