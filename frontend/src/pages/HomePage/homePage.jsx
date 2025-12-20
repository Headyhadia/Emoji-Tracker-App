import Tracker from "@/components/Tracker/Tracker";
import DefaultEmoji from "@/components/DefaultEmoji/DefaultEmoji";
import styles from "./homePage.module.css";

const HomePage = ({ dbEmojis, loading, error }) => {
  console.log("HomePage received dbEmojis:", dbEmojis);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className={styles.homePage}>
      <Tracker dbEmojis={dbEmojis} />
      <DefaultEmoji />
    </div>
  );
};

export default HomePage;
