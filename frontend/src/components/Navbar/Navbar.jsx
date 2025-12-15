import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <h1 className={styles.title}>Emoji Journal</h1>
      </a>
      <div className={styles.options}>
        <img
          className={styles.themeButton}
          src="src/assets/brightness.png"
          alt="theme button"
        />
        <img
          className={styles.searchIcon}
          src="src/assets/magnifying-glass.png"
          alt="search icon"
        />
        <img
          className={styles.menuButton}
          src="src/assets/more.png"
          alt="menu button"
        />
      </div>
    </nav>
  );
};
export default Navbar;
