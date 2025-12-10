import { useState } from "react";
import styles from "./Emojis.module.css";

const emojiItems = [
  { src: "./src/assets/happy-emoji.png", label: "Happy" },
  { src: "./src/assets/crying-emoji.png", label: "Crying" },
  { src: "./src/assets/angry_emoji.png", label: "Angry" },
  { src: "./src/assets/sad-emoji.png", label: "Sad" },
  { src: "./src/assets/hero-emoji.png", label: "Hero" },
  { src: "./src/assets/shocked-emoji.png", label: "Shocked" },
  { src: "./src/assets/smirk-emoji.png", label: "Smirk" },
  { src: "./src/assets/thinking-emoji.png", label: "Thinking" },
  { src: "./src/assets/yummy-emoji.png", label: "Yummy" },
  { src: "./src/assets/heart-eyes.png", label: "Lovely" },
  { src: "./src/assets/wink.png", label: "Wink" },
  { src: "./src/assets/laughing-with-tears-emoji.png", label: "LOL" },
];

const Emojis = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleDotsClick = (index, e) => {
    e.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleReset = (index) => {
    console.log("Reset clicked for:", emojiItems[index].label);
    setOpenIndex(null);
  };

  return (
    <div className={styles.emojisContainer}>
      <ul className={styles.emojisList}>
        {emojiItems.map((it, i) => (
          <li key={i}>
            <a href="#" onClick={(e) => handleDotsClick(i, e)}>
              <img
                className={styles.dots}
                src="./src/assets/3dots.png"
                alt="menu"
              />
            </a>

            {openIndex === i && (
              <div className={styles.menuBox}>
                <button
                  className={styles.menuItem}
                  onClick={() => handleReset(i)}
                >
                  Reset
                </button>
              </div>
            )}

            <div className={styles.emotion}>
              <img className={styles.emojiPic} src={it.src} alt={it.label} />
              <p>{it.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Emojis;
