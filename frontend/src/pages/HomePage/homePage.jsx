import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";
import { useState } from "react";

const HomePage = ({ dbEmojis, loading, error }) => {
  const [fallbackEnabled, setFallbackEnabled] = useState(() => {
    return localStorage.getItem("fallbackEnabled") === "true";
  });
  const [fallbackEmojiSrc, setFallbackEmojiSrc] = useState(
    "src/assets/good.png"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <div className={styles.homePage}>
        {error && (
          <div className={styles.errorMessage}>
            ⚠️ Could not load emoji data.
          </div>
        )}
        <Tracker
          dbEmojis={dbEmojis || []} // fallback to empty array
          fallbackEnabled={fallbackEnabled}
          fallbackEmojiSrc={fallbackEmojiSrc}
        />
        <DefaultEmoji setFallbackEnabled={setFallbackEnabled} />
      </div>
    );
};

export default HomePage;
