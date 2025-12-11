// App.jsx
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar.jsx";
import HomePage from "@/pages/HomePage/homePage.jsx";
import API from "@/api/api"; // axios instance configured with baseURL

function App() {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemLoadingMap, setItemLoadingMap] = useState({});

  // utility: set per-item loading
  const setItemLoading = useCallback((id, v) => {
    setItemLoadingMap((m) => ({ ...m, [id]: !!v }));
  }, []);

  // fetch all emojis
  const fetchEmojis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("emojis/");
      setEmojis(res.data || []);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch emojis:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    // wrap fetchEmojis so component mount/unmount respected
    (async () => {
      try {
        const res = await API.get("emojis/");
        if (!mounted) return;
        setEmojis(res.data || []);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError(err);
        console.error("initial fetch error:", err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchEmojis]);

  // Create (add a new emoji record)
  const addEmoji = async (emojiPayload) => {
    setError(null);
    setLoading(true);
    try {
      const res = await API.post("emojis/", emojiPayload);
      // append server-created emoji (has id)
      setEmojis((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      console.error("addEmoji failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Increment an emoji's count (optimistic then reconcile)
  const incrementEmoji = async (id) => {
    setError(null);
    const idx = emojis.findIndex((e) => e.id === id);
    if (idx === -1) {
      // try refetch if missing
      await fetchEmojis();
      throw new Error("Emoji not found");
    }

    const prevCount = emojis[idx].count ?? 0;
    const optimisticCount = prevCount + 1;

    // optimistic UI
    setEmojis((cur) =>
      cur.map((e) => (e.id === id ? { ...e, count: optimisticCount } : e))
    );
    setItemLoading(id, true);

    try {
      //update count (default DRF)
      const res = await API.patch(`emojis/${id}/`, { count: optimisticCount });

      setEmojis((cur) =>
        cur.map((e) => (e.id === id ? { ...e, ...res.data } : e))
      );
      return res.data;
    } catch (err) {
      // rollback optimistic change
      setEmojis((cur) =>
        cur.map((e) => (e.id === id ? { ...e, count: prevCount } : e))
      );
      setError(err);
      console.error("incrementEmoji failed:", err);
      throw err;
    } finally {
      setItemLoading(id, false);
    }
  };

  // Reset count to 0 (optimistic)
  const resetEmoji = async (id) => {
    setError(null);
    const idx = emojis.findIndex((e) => e.id === id);
    if (idx === -1) {
      await fetchEmojis();
      throw new Error("Emoji not found");
    }

    const prevCount = emojis[idx].count ?? 0;

    // optimistic
    setEmojis((cur) => cur.map((e) => (e.id === id ? { ...e, count: 0 } : e)));
    setItemLoading(id, true);

    try {
      const res = await API.patch(`emojis/${id}/`, { count: 0 });
      setEmojis((cur) =>
        cur.map((e) => (e.id === id ? { ...e, ...res.data } : e))
      );
      return res.data;
    } catch (err) {
      // rollback
      setEmojis((cur) =>
        cur.map((e) => (e.id === id ? { ...e, count: prevCount } : e))
      );
      setError(err);
      console.error("resetEmoji failed:", err);
      throw err;
    } finally {
      setItemLoading(id, false);
    }
  };

  // Delete emoji
  const deleteEmoji = async (id) => {
    setError(null);
    setItemLoading(id, true);
    try {
      const res = await API.delete(`emojis/${id}/`);
      if (res.status >= 200 && res.status < 300) {
        setEmojis((cur) => cur.filter((e) => e.id !== id));
        return true;
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      setError(err);
      console.error("deleteEmoji failed:", err);
      throw err;
    } finally {
      setItemLoading(id, false);
    }
  };

  // Expose props to HomePage so it can render and call handlers
  return (
    <>
      <Navbar />
      <HomePage
        emojis={emojis}
        loading={loading}
        error={error}
        itemLoadingMap={itemLoadingMap}
        addEmoji={addEmoji}
        incrementEmoji={incrementEmoji}
        resetEmoji={resetEmoji}
        deleteEmoji={deleteEmoji}
        refreshEmojis={fetchEmojis}
      />
    </>
  );
}

export default App;
