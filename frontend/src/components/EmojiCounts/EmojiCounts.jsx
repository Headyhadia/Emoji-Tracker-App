import styles from "./EmojiCounts.module.css";

const EmojiCounts = () => {
  return (
    <div className={styles.countsBoard}>
      <ul className={styles.countList}>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/happy-emoji.png"
            alt=" happy emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/crying-emoji.png"
            alt=" crying emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/angry_emoji.png"
            alt="angry emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/sad-emoji.png"
            alt=" Sad emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/hero-emoji.png"
            alt=" hero emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/shocked-emoji.png"
            alt=" shocked emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/smirk-emoji.png"
            alt=" smirk emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/thinking-emoji.png"
            alt=" thinking emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/yummy-emoji.png"
            alt=" yummy emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
        <li className={styles.countItem}>
          <img
            className={styles.emoji}
            src="./src/assets/heart-eyes.png"
            alt=" heart eyes emoji"
          />
          <div className={styles.countBar}></div>
          <p>9</p>
        </li>
      </ul>
    </div>
  );
};
export default EmojiCounts;
