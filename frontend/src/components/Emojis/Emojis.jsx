// Emojis.jsx — UI unchanged, API integration added
import { useEffect, useState } from "react";
import styles from "./Emojis.module.css";
import API from "@/api/api"; // axios instance (same as you used elsewhere)

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

const normalize = (s = "") => String(s).trim().toLowerCase();

const Emojis = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [serverData, setServerData] = useState([]); // raw array from server
  const [loadingMap, setLoadingMap] = useState({}); // prevent double clicks per-label

  // Fetch server rows on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get("emojis/"); // default DRF list endpoint
        if (!mounted) return;
        const data = res?.data ?? res;
        setServerData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch emojis from server:", err);
        setServerData([]); // keep app functional
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const setItemLoading = (key, v) =>
    setLoadingMap((m) => ({ ...m, [key]: !!v }));

  const handleDotsClick = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenIndex(openIndex === index ? null : index);
  };

  // Find server row for a given label (tries several heuristics)
  const findServerRowForLabel = (label) => {
    const n = normalize(label);
    // try direct match on server `emoji` field or `label`
    let found = serverData.find(
      (row) =>
        normalize(row.emoji) === n ||
        normalize(row.label) === n ||
        // maybe server stores names with spaces/hyphens; compare normalized textual form
        normalize(String(row.emoji || row.label || "")) === n
    );
    if (found) return found;
    // fallback: try case-insensitive partial match
    found = serverData.find((row) =>
      String(row.emoji || row.label || "")
        .toLowerCase()
        .includes(n)
    );
    return found || null;
  };

  // Safe create server row when missing. Returns the created row object.
  const createServerRow = async (label, initialCount = 1) => {
    const payload = { emoji: label, count: initialCount }; // adjust fields if serializer differs
    const res = await API.post("emojis/", payload);
    const created = res?.data ?? res;
    // append to local serverData
    setServerData((cur) => [...cur, created]);
    return created;
  };

  // Increment logic: optimistic-ish, creates the row if missing
  const handleIncrement = async (index, e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const label = emojiItems[index].label;
    const key = normalize(label);
    if (loadingMap[key]) return; // request in-flight
    setItemLoading(key, true);

    try {
      let row = findServerRowForLabel(label);

      if (!row) {
        // If row missing, create it with count=1 so click has immediate effect.
        // That avoids needing a separate seeding step.
        row = await createServerRow(label, 1);
        // dispatch update event (optional)
        window.dispatchEvent(
          new CustomEvent("emojiCountsUpdated", {
            detail: {
              label: normalize(label),
              id: row.id,
              count: Number(row.count || 0),
            },
          })
        );
        setItemLoading(key, false);
        return;
      }

      // optimistic new count
      const prevCount = Number(row.count ?? 0);
      const newCount = prevCount + 1;

      // Update server (PATCH)
      const res = await API.patch(`emojis/${row.id}/`, { count: newCount });
      const updated = res?.data ?? res;
      // update our local serverData cache with authoritative server response
      setServerData((cur) =>
        cur.map((r) => (r.id === row.id ? { ...r, ...updated } : r))
      );

      // notify other parts (your countboard can listen and refetch or respond)
      window.dispatchEvent(
        new CustomEvent("emojiCountsUpdated", {
          detail: {
            label: normalize(label),
            id: row.id,
            count: Number(updated.count ?? newCount),
          },
        })
      );
    } catch (err) {
      console.error("Failed to increment emoji on server:", err);
    } finally {
      setItemLoading(key, false);
    }
  };

  // Reset count to zero (if row missing, just close menu)
  const handleReset = async (index) => {
    const label = emojiItems[index].label;
    const key = normalize(label);
    const row = findServerRowForLabel(label);
    if (!row) {
      console.warn(`No server entry found for "${label}".`);
      setOpenIndex(null);
      return;
    }
    if (loadingMap[key]) return;
    setItemLoading(key, true);

    try {
      const res = await API.patch(`emojis/${row.id}/`, { count: 0 });
      const updated = res?.data ?? res;
      setServerData((cur) =>
        cur.map((r) => (r.id === row.id ? { ...r, ...updated } : r))
      );
      window.dispatchEvent(
        new CustomEvent("emojiCountsUpdated", {
          detail: {
            label: normalize(label),
            id: row.id,
            count: Number(updated.count ?? 0),
          },
        })
      );
    } catch (err) {
      console.error("Failed to reset emoji on server:", err);
    } finally {
      setItemLoading(key, false);
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
                  disabled={!!loadingMap[normalize(it.label)]}
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
