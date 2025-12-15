// App.jsx
import "./App.css";

import Navbar from "@/components/Navbar/Navbar.jsx";
import HomePage from "@/pages/HomePage/homePage.jsx";
import API from "@/api/api"; // axios instance configured with baseURL

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}

export default App;
