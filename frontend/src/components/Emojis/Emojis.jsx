import styles from "./Emojis.module.css";

const Emojis = () => {
  return (
    <div classnmae={styles.emojisContainer}>
      <ul className={styles.emojisList}>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/happy-emoji.png"
              alt="Happy Emoji"
            />
            <p>Happy</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/crying-emoji.png"
              alt="Crying Emoji"
            />
            <p>Crying</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/angry_emoji.png"
              alt="Angry Emoji"
            />
            <p>Angry</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/sad-emoji.png"
              alt="Sad Emoji"
            />
            <p>Sad</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/hero-emoji.png"
              alt="Hero Emoji"
            />
            <p>Hero</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/shocked-emoji.png"
              alt="Shocked Emoji"
            />
            <p>Shocked</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/smirk-emoji.png"
              alt="Smirk Emoji"
            />
            <p>Smirk</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/thinking-emoji.png"
              alt="Thinking Emoji"
            />
            <p>Thinking</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/yummy-emoji.png"
              alt="Yummy Emoji"
            />
            <p>Yummy</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/heart-eyes.png"
              alt="Heart Eyes Emoji"
            />
            <p>Lovely</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/wink.png"
              alt="Crazy Emoji"
            />
            <p>Wink</p>
          </div>
        </li>
        <li>
          <a href="">
            <img
              className={styles.dots}
              src="./src/assets/3dots.png"
              alt="menu"
            />
          </a>
          <div className={styles.emotion}>
            <img
              className={styles.emojiPic}
              src="./src/assets/laughing-with-tears-emoji.png"
              alt="Laughing with tears emoji"
            />
            <p>LOL</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Emojis;
