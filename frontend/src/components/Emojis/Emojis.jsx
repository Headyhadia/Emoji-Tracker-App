import styles from "./Emojis.module.css";

const Emojis = () => {
  return (
    <div classnmae={styles.emojisContainer}>
      <ul>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/happy-emoji.png" alt="Happy Emoji" />
          <p>Happy</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/crying-emoji.png" alt="Crying Emoji" />
          <p>Crying</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/angry_emoji.png" alt="Angry Emoji" />
          <p>Angry</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/sad-emoji.png" alt="Sad Emoji" />
          <p>Sad</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/hero-emoji.png" alt="Hero Emoji" />
          <p>Hero</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/shocked-emoji.png" alt="Shocked Emoji" />
          <p>Shocked</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/smirk-emoji.png" alt="Smirk Emoji" />
          <p>Smirk</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/thinking-emoji.png" alt="Thinking Emoji" />
          <p>Thinking</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/yummy-emoji.png" alt="Yummy Emoji" />
          <p>Yummy</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/heart-eyes.png" alt="Heart Eyes Emoji" />
          <p>Lovely</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img src="./src/assets/crazy-emoji.png" alt="Crazy Emoji" />
          <p>Crazy</p>
        </li>
        <li>
          <img src="./src/assets/3dots.png" alt="menu" />
          <img
            src="./src/assets/laughing-with-tears-emoji.png"
            alt="Laughing with tears emoji"
          />
          <p>LOL</p>
        </li>
      </ul>
    </div>
  );
};

export default Emojis;
