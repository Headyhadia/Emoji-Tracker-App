import styles from "./Tracker.module.css";

const Tracker = () => {
  return (
    <div className={styles.trackerContainer}>
      <table className={styles.emojiCalender}>
        <tr className={styles.calenderRow}>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        <tr className={styles.calenderRow}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className={styles.calenderRow}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className={styles.calenderRow}>
          <td></td> <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className={styles.calenderRow}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div className={styles.date}></div>
      <div className={styles.feeling}>
        <h4>How are you feeling?</h4>
        <img className={styles.showEmoji} src="" alt="" />
      </div>
      <div className={styles.emojis}>
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Tracker;
