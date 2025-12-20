// App.jsx
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar.jsx";
import HomePage from "@/pages/HomePage/homePage.jsx";
import API from "@/api/api";

function App() {
  const [dbEmojis, setDbEmojis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Accessing the API data
  useEffect(() => {
    API.get("emojis/")
      .then((res) => {
        setDbEmojis(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <HomePage dbEmojis={dbEmojis} loading={loading} error={error} />
    </>
  );
}

export default App;
