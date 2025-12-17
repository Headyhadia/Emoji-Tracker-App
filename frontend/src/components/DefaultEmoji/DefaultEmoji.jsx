import styles from "./DefaultEmoji.module.css";
import { Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";

const DefaultEmoji = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className={styles.defaultEmojiContainer}>
      <div className={styles.headingBtnContainer}>
        <h2>DEFAULT EMOJI</h2>
        <FormControlLabel
          className={styles.switchRoot}
          control={
            <Switch
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          }
        />
      </div>
      <div className={styles.lineEmojiContainer}>
        <h4 className={styles.defaultDesc}>Set as default for missed days</h4>
        <img
          className={enabled ? styles.smiley : styles.noDefaultEmoji}
          src="src/assets/good.png"
          alt="smiley"
        />
      </div>
    </div>
  );
};
export default DefaultEmoji;
