import styles from "./Tracker.module.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

const Tracker = ({ dbEmojis }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [images, setImages] = useState({});

  const today = new Date();
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const todayDate = today.getDate();

  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Emoji mapping - maps emoji names from API to image sources
  const emojiMapping = {
    happy: "src/assets/happy.png",
    good: "src/assets/good.png",
    neutral: "src/assets/neutral.png",
    sad: "src/assets/sad.png",
    angry: "src/assets/angry.png",
  };

  const emojiItems = [
    { src: "src/assets/happy.png", label: "Happy" },
    { src: "src/assets/good.png", label: "Good" },
    { src: "src/assets/neutral.png", label: "Neutral" },
    { src: "src/assets/sad.png", label: "Sad" },
    { src: "src/assets/angry.png", label: "Angry" },
  ];

  // Load database emojis into images state when component mounts or dbEmojis changes
  useEffect(() => {
    const emojiArray = Array.isArray(dbEmojis) ? dbEmojis : [dbEmojis];
    if (emojiArray && emojiArray.length > 0) {
      const loadedImages = {};
      emojiArray.forEach((entry) => {
        // Map the emoji name to the image source
        const emojiSrc = emojiMapping[entry.emoji.toLowerCase()];
        if (emojiSrc) {
          loadedImages[entry.date] = emojiSrc;
        }
      });
      setImages(loadedImages);
    }
  }, [dbEmojis]);

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

  const startDay = (firstDayOfMonth.getDay() + 6) % 7;
  const cells = [];

  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  const handleSaveEntry = () => {
    if (!selectedEmoji) return;

    const dateKey = selectedDate.toISOString().split("T")[0];

    setImages((prev) => ({
      ...prev,
      [dateKey]: selectedEmoji,
    }));
  };

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.calendar}>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          view="month"
          className={styles.hiddenCalendar}
        />
        <div className={styles.monthNav}>
          <button
            onClick={() =>
              setSelectedDate(new Date(selectedYear, selectedMonth - 1, 1))
            }
          >
            ‹
          </button>

          <span className={styles.monthCalendar}>
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button
            onClick={() =>
              setSelectedDate(new Date(selectedYear, selectedMonth + 1, 1))
            }
          >
            ›
          </button>
        </div>

        <div className={styles.calendarHeader}>
          {weekdays.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className={styles.calendarBody}>
          {cells.map((day, index) => {
            if (!day) return <div key={index} className={styles.day}></div>;

            // Create date string in YYYY-MM-DD format for this day
            const dateKey = `${selectedYear}-${String(
              selectedMonth + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            return (
              <div key={index} className={styles.day}>
                <span className={styles.dayNumber}>{day}</span>
                {images[dateKey] && (
                  <img src={images[dateKey]} alt={`Day ${day}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.currentDate}>
        {`Today, ${weekdays[today.getDay() - 1]}`} {todayDate}
      </div>

      <div className={styles.feeling}>
        <h4>How are you feeling?</h4>
        <div className={styles.grayEmojis}>{emojis}</div>
      </div>

      <div className={styles.emojis}>{emojis}</div>

      <button className={styles.saveBtn} onClick={handleSaveEntry}>
        Save Entry
      </button>
    </div>
  );
};

export default Tracker;
