import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <h1 className={styles.title}>Emoji Tracker</h1>
      </a>
    </nav>
  );
};
export default Navbar;
