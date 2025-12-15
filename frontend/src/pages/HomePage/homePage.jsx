import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Tracker />
      <DefaultEmoji />
    </div>
  );
};

export default HomePage;
