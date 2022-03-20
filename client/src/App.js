import "./App.css";
import { useEffect, useState, React } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./views/UserPage";
import CreateWorkbook from "./views/CreateWorkbook";
import CreateChapter from "./views/CreateChapter";
import { UserContextWrapper } from "./context/UserContext";
import LoginPage from "./views/LoginPage";

function App() {
  return (
    <>
      <UserContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route
              path="/create_workbook/:author_id"
              element={<CreateWorkbook />}
            />
            <Route
              path="/create_chapter/:workbooks_id/:chapter_number"
              element={<CreateChapter />}
            />
          </Routes>
        </BrowserRouter>
      </UserContextWrapper>
    </>
  );
}

export default App;
