import styles from "./Tracker.module.css";
import { useState } from "react";

const Tracker = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based
  const todayDate = today.getDate();

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [images, setImages] = useState({});

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Array of weekdays to map days from date object
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // Array of all emoji pictures
  const emojiItems = [
    { src: "src/assets/happy.png", label: "Happy" },
    { src: "src/assets/good.png", label: "Good" },
    { src: "src/assets/neutral.png", label: "Neutral" },
    { src: "src/assets/sad.png", label: "Sad" },
    { src: "src/assets/angry.png", label: "Angry" },
  ];
  // Emojis mapped into img
  const emojis = emojiItems.map((item, index) => {
    return (
      <img
        key={index}
        src={item.src}
        alt={item.label}
        onClick={() => setSelectedEmoji(item.src)}
        data-selected={selectedEmoji === item.src}
        className={styles.emojiPic}
      />
    );
  });
  // Convert Sunday-first (0) to Monday-first (0)
  const startDay = (firstDayOfMonth.getDay() + 6) % 7;

  const cells = [];

  // Empty cells before month starts
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }
  const handleSaveEntry = () => {
    if (!selectedEmoji) return;

    setImages((prev) => ({
      ...prev,
      [todayDate]: selectedEmoji,
    }));
  };

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.calendar}>
        {/* Days header */}
        <div className={styles.calendarHeader}>
          {weekdays.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className={styles.calendarBody}>
          {cells.map((day, index) => (
            <div key={index} className={styles.day}>
              {day && (
                <>
                  <span className={styles.dayNumber}>{day}</span>
                  {images[day] && <img src={images[day]} alt={`Day ${day}`} />}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* After calender grids */}
      <div className={styles.currentDate}>
        {`Today, ${weekdays[today.getDay() - 1]}`} {todayDate}
      </div>

      <div className={styles.feeling}>
        <h4>How are you feeling?</h4>
        <div className={styles.grayEmojis}>{emojis}</div>
      </div>
      {/* Emojis to enter mood */}
      <div className={styles.emojis}>{emojis}</div>
      {/* Button to save entry */}
      <button className={styles.saveBtn} onClick={handleSaveEntry}>
        Save Entry
      </button>
    </div>
  );
};

export default Tracker;
