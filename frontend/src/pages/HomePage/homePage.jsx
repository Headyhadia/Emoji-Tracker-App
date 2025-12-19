import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";

const HomePage = ({ dbEmojis }) => {
  return (
    <div className={styles.homePage}>
      <Tracker dbEmojis={dbEmojis} />
      <DefaultEmoji />
    </div>
  );
};

export default HomePage;
