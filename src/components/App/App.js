import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../Home/Home";
import Contact from "../Contact/Contact";

function App() {

  return (
    <div className="font-bold text-bold">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
