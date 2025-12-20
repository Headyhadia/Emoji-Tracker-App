import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";
import { useState } from "react";

const HomePage = ({ dbEmojis, loading, error }) => {
  const [fallbackEnabled, setFallbackEnabled] = useState(false);
  const [fallbackEmojiSrc, setFallbackEmojiSrc] = useState(
    "src/assets/good.png"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className={styles.homePage}>
      <Tracker
        dbEmojis={dbEmojis}
        fallbackEnabled={fallbackEnabled}
        fallbackEmojiSrc={fallbackEmojiSrc}
      />
      <DefaultEmoji setFallbackEnabled={setFallbackEnabled} />
    </div>
  );
};

export default HomePage;
