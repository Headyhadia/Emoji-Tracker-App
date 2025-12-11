// Emojis.jsx
import { useEffect, useState } from "react";
import styles from "./Emojis.module.css";
import API from "@/api/api"; // adjust path if your alias differs

const emojiItems = [
  { src: "./src/assets/happy-emoji.png", label: "Happy" },
  { src: "./src/assets/crying-emoji.png", label: "Crying" },
  { src: "./src/assets/angry_emoji.png", label: "Angry" },
  { src: "./src/assets/sad-emoji.png", label: "Sad" },
  { src: "./src/assets/hero-emoji.png", label: "Hero" },
  { src: "./src/assets/shocked-emoji.png", label: "Shocked" },
  { src: "./src/assets/smirk-emoji.png", label: "Smirk" },
  { src: "./src/assets/thinking-emoji.png", label: "Thinking" },
  { src: "./src/assets/yummy-emoji.png", label: "Yummy" },
  { src: "./src/assets/heart-eyes.png", label: "Lovely" },
  { src: "./src/assets/wink.png", label: "Wink" },
  { src: "./src/assets/laughing-with-tears-emoji.png", label: "LOL" },
];

const normalizeLabel = (s) =>
  typeof s === "string" ? s.trim().toLowerCase() : "";

const Emojis = () => {
  const [openIndex, setOpenIndex] = useState(null);
  // map labelLower -> { id, count }
  const [serverMap, setServerMap] = useState({});
  // per-item loading map by labelLower to avoid double clicks
  const [loadingMap, setLoadingMap] = useState({});

  // fetch server data and store mapping by label (lowercase)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get("emojis/"); // expects array
        if (!mounted) return;
        const data = res?.data ?? res;
        const map = {};
        (data || []).forEach((item) => {
          // item may have label or emoji field — try both
          const label = normalizeLabel(
            item.label ?? item.emoji ?? item.name ?? ""
          );
          if (!label) return;
          map[label] = { id: item.id, count: Number(item.count ?? 0) };
        });
        setServerMap(map);
      } catch (err) {
        // keep silent
        console.error("Failed to fetch emoji counts:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const setItemLoading = (labelKey, v) =>
    setLoadingMap((m) => ({ ...m, [labelKey]: !!v }));

  const handleDotsClick = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenIndex(openIndex === index ? null : index);
  };

  // increment handler: optimistic, then PATCH server
  const handleIncrement = async (index, e) => {
    // no UI changes — this only updates server state and internal mapping
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const label = normalizeLabel(emojiItems[index].label);
    const serverItem = serverMap[label];

    // if server doesn't have this emoji entry, we can't increment reliably
    if (!serverItem) {
      console.warn(`No server entry found for "${emojiItems[index].label}".`);
      return;
    }

    if (loadingMap[label]) return; // already in-flight

    const prevCount = serverItem.count ?? 0;
    const optimistic = prevCount + 1;

    // optimistic local update
    setServerMap((m) => ({
      ...m,
      [label]: { ...m[label], count: optimistic },
    }));
    setItemLoading(label, true);

    try {
      // PATCH /api/emojis/<id>/ with new count
      const res = await API.patch(`emojis/${serverItem.id}/`, {
        count: optimistic,
      });
      const updated = (res?.data ?? res) || {};
      const newCount = Number(updated.count ?? optimistic);
      setServerMap((m) => ({
        ...m,
        [label]: { id: serverItem.id, count: newCount },
      }));

      // useful hook: notify other parts of app (optional)
      window.dispatchEvent(
        new CustomEvent("emojiCountsUpdated", {
          detail: { label, id: serverItem.id, count: newCount },
        })
      );
    } catch (err) {
      // rollback
      setServerMap((m) => ({
        ...m,
        [label]: { ...m[label], count: prevCount },
      }));
      console.error("Failed to increment on server:", err);
    } finally {
      setItemLoading(label, false);
    }
  };

  // reset handler: set count to 0
  const handleReset = async (index) => {
    const label = normalizeLabel(emojiItems[index].label);
    const serverItem = serverMap[label];
    if (!serverItem) {
      console.warn(`No server entry found for "${emojiItems[index].label}".`);
      setOpenIndex(null);
      return;
    }
    if (loadingMap[label]) return;

    const prevCount = serverItem.count ?? 0;
    setServerMap((m) => ({ ...m, [label]: { ...m[label], count: 0 } }));
    setItemLoading(label, true);

    try {
      const res = await API.patch(`emojis/${serverItem.id}/`, { count: 0 });
      const updated = (res?.data ?? res) || {};
      const newCount = Number(updated.count ?? 0);
      setServerMap((m) => ({
        ...m,
        [label]: { id: serverItem.id, count: newCount },
      }));
      window.dispatchEvent(
        new CustomEvent("emojiCountsUpdated", {
          detail: { label, id: serverItem.id, count: newCount },
        })
      );
    } catch (err) {
      // rollback
      setServerMap((m) => ({
        ...m,
        [label]: { ...m[label], count: prevCount },
      }));
      console.error("Failed to reset on server:", err);
    } finally {
      setItemLoading(label, false);
      setOpenIndex(null);
    }
  };

  return (
    <div className={styles.emojisContainer}>
      <ul className={styles.emojisList}>
        {emojiItems.map((it, i) => (
          <li key={i}>
            <a href="#" onClick={(e) => handleDotsClick(i, e)}>
              <img
                className={styles.dots}
                src="./src/assets/3dots.png"
                alt="menu"
              />
            </a>

            {openIndex === i && (
              <div className={styles.menuBox}>
                <button
                  className={styles.menuItem}
                  onClick={() => handleReset(i)}
                  disabled={!!loadingMap[normalizeLabel(it.label)]}
                >
                  Reset
                </button>
              </div>
            )}

            <div className={styles.emotion}>
              <img
                className={styles.emojiPic}
                src={it.src}
                alt={it.label}
                onClick={(e) => handleIncrement(i, e)}
                style={{ cursor: "pointer" }}
              />
              <p>{it.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Emojis;
