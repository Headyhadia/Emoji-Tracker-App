import { useState, useMemo } from "react";
import styles from "./EmojiCounts.module.css";

/*
  emojiList is same order as your UI — use ids if possible.
  For now we use labels as keys for simplicity.
*/
const EMOJIS = [
  { id: "happy", label: "Happy", img: "./src/assets/happy-emoji.png" },
  { id: "crying", label: "Crying", img: "./src/assets/crying-emoji.png" },
  { id: "angry", label: "Angry", img: "./src/assets/angry_emoji.png" },
  { id: "sad", label: "Sad", img: "./src/assets/sad-emoji.png" },
  { id: "hero", label: "Hero", img: "./src/assets/hero-emoji.png" },
  { id: "shocked", label: "Shocked", img: "./src/assets/shocked-emoji.png" },
  { id: "smirk", label: "Smirk", img: "./src/assets/smirk-emoji.png" },
  { id: "thinking", label: "Thinking", img: "./src/assets/thinking-emoji.png" },
  { id: "Yummy", label: "Yummy", img: "./src/assets/yummy-emoji.png" },
  { id: "lovely", label: "Lovely", img: "./src/assets/heart-eyes.png" },
  { id: "wink", label: "Wink", img: "./src/assets/wink.png" },
  {
    id: "lol",
    label: "LOL",
    img: "./src/assets/laughing-with-tears-emoji.png",
  },
];

const fakeApiCounts = {
  happy: 9,
  crying: 4,
  angry: 2,
  /* ... defaults for demo ... */
};

const EmojiCounts = () => {
  // counts would come from API; start with fake values for demo
  const [counts, setCounts] = useState(fakeApiCounts);
  // track which emoji was clicked most recently (simulate fetching that emoji data)
  const [activeId, setActiveId] = useState(null);

  // compute max once per render — used to calculate relative percent
  const maxValue = useMemo(() => {
    const values = Object.values(counts);
    return values.length ? Math.max(...values) : 0;
  }, [counts]);

  // Simulated "fetch" when user clicks an emoji's dots or tile:
  const handleClickFetch = async (id) => {
    // set active for UI (optional)
    setActiveId(id);

    // simulate API update/response (replace with real API call)
    // e.g. const res = await fetch(`/api/emojis/${id}/count`); const newCount = await res.json();
    // For demo we increment value to show fill change.
    setCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      return next;
    });
  };

  // percent calculation with guards
  const getPercent = (value) => {
    if (!maxValue) return 0;
    // clamp to 0-100
    return Math.min(100, Math.round((value / maxValue) * 100));
  };

  return (
    <div className={styles.countsBoard}>
      <ul className={styles.countList}>
        {EMOJIS.map((e) => {
          const value = counts[e.id] || 0;
          const percent = getPercent(value);

          return (
            <li className={styles.countItem} key={e.id}>
              <img
                className={styles.emoji}
                src={e.img}
                alt={`${e.label} emoji`}
              />
              {/* outer track */}
              <div
                className={styles.countBar}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={maxValue || 100}
                aria-valuenow={value}
                aria-label={`${e.label} count ${value}`}
              >
                {/* inner fill uses transform for smooth performant scaling */}
                <div
                  className={styles.countFill}
                  style={{ transform: `scaleX(${percent / 100})` }}
                />
              </div>

              <p className={styles.countValue}>{value}</p>

              {/* demo: clicking this simulates fetching new value for that emoji */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmojiCounts;
