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
          className={styles.switch}
          control={
            <Switch
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          }
        />
      </div>
    </div>
  );
};
export default DefaultEmoji;
