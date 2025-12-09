//import { useState } from "react";
import "./App.css";
import Emojis from "./components/Emojis/Emojis";
import Navbar from "./components/Navbar/Navbar.jsx";
import EmojiCounts from "./components/EmojiCounts/EmojiCounts.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Emojis />
      <EmojiCounts />
    </>
  );
}

export default App;
