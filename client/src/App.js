import "./App.css";
import { useEffect, useState, React } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./views/UserPage";
import CreateWorkbook from "./views/CreateWorkbook";
import CreateChapter from "./views/CreateChapter";

import LoginPage from "./views/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/create_workbook/:author_id"
            element={<CreateWorkbook />}
          />
          <Route
            path="/create_chapter/:workbook_id/:chapter_id"
            element={<CreateChapter />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
