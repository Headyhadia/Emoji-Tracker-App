import Emojis from "@/components/Emojis/Emojis";
import EmojiCounts from "@/components/EmojiCounts/EmojiCounts";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Emojis />
      <EmojiCounts />
    </div>
  );
};

export default HomePage;
