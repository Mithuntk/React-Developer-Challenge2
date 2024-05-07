import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from "./Components/main/page1";
import Page2 from "./Components/new/page2";
import "./App.css";

function App() {
  const [invoiceData, setInvoiceData] = useState({});

  const handleSave = (data) => {
    setInvoiceData(data);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Page1 invoiceNumber={invoiceData.invoiceNumber} />}
        />
        <Route path="/page2" element={<Page2 onSave={handleSave} />} />
      </Routes>
    </Router>
  );
}

export default App;
