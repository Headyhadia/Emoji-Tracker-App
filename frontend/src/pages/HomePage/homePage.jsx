import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";
import { useState } from "react";

const HomePage = ({ dbEmojis, loading, error }) => {
  const [fallbackEnabled, setFallbackEnabled] = useState(() => {
    return localStorage.getItem("fallbackEnabled") === "true";
  });

  const [fallbackEmojiSrc, setFallbackEmojiSrc] = useState(
    "src/assets/good.png",
  );

  // 1. Handle Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // 2. Main Render (Always returns the UI)
  return (
    <div className={styles.homePage}>
      {/* Show error message at the top if there is one, but don't stop rendering the app */}
      {error && (
        <div className={styles.errorMessage}>⚠️ Could not load emoji data.</div>
      )}

      <Tracker
        dbEmojis={dbEmojis || []}
        fallbackEnabled={fallbackEnabled}
        fallbackEmojiSrc={fallbackEmojiSrc}
      />

      <DefaultEmoji setFallbackEnabled={setFallbackEnabled} />
    </div>
  );
};

export default HomePage;
