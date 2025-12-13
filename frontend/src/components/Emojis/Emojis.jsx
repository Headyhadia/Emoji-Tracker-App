// Emojis.jsx — UI unchanged, API integration added
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

const Emojis = ({ emojis, incrementEmoji, resetEmoji }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const safeEmojis = Array.isArray(emojis) ? emojis : [];

  const getEmojiFromServer = (label) => {
    return safeEmojis.find(
      (e) => e.emoji?.toLowerCase() === label.toLowerCase()
    );
  };

  return (
    <div className={styles.emojisContainer}>
      <ul className={styles.emojisList}>
        {emojiItems.map((it, i) => {
          const serverEmoji = getEmojiFromServer(it.label);

          return (
            <li key={it.label}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? null : i);
                }}
              >
                <img className={styles.dots} src="./src/assets/3dots.png" />
              </a>

              {openIndex === i && (
                <div className={styles.menuBox}>
                  <button
                    onClick={() => serverEmoji && resetEmoji(serverEmoji.id)}
                    disabled={!serverEmoji}
                  >
                    Reset
                  </button>
                </div>
              )}
              <div
                className={styles.emotion}
                onClick={() => {
                  if (serverEmoji) {
                    incrementEmoji(serverEmoji.id);
                  } else {
                    console.warn("No matching emoji on server for", it.label);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <img className={styles.emojiPic} src={it.src} alt={it.label} />
                <p>{it.label}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Emojis;
