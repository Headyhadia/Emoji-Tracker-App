import Emojis from "@/components/Emojis/Emojis";
import EmojiCounts from "@/components/EmojiCounts/EmojiCounts";
import styles from "./homePage.module.css";

/**
 Props expected from App:
 - emojis: array of { id, emoji, count }
 - loading, error
 - itemLoadingMap: { [id]: boolean }
 - incrementEmoji(id), resetEmoji(id), deleteEmoji(id), refreshEmojis()
*/
const HomePage = (props) => {
  return (
    <div className={styles.homePage}>
      <Emojis
        emojis={props.emojis}
        loading={props.loading}
        itemLoadingMap={props.itemLoadingMap}
        incrementEmoji={props.incrementEmoji}
        resetEmoji={props.resetEmoji}
        deleteEmoji={props.deleteEmoji}
        refreshEmojis={props.refreshEmojis}
      />
      <EmojiCounts emojis={props.emojis} />
    </div>
  );
};

export default HomePage;
