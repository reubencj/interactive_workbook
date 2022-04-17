import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorDashboard from "./views/author/AuthorDashboard";
import CreateWorkbook from "./views/author/CreateWorkbook";
import CreateChapter from "./views/author/CreateChapter";
import AuthorChaptersView from "./views/author/AuthorChaptersView";
import LoginPage from "./views/LoginPage";
import UserDashboard from "./views/user/UserDashboard";
import UserChaptersView from "./views/user/UserChaptersView";
import UserChapter from "./views/user/UserChapter";
import EditSummary from "./views/author/EditSummary";
import EditChapter from "./views/author/EditChapter";
import TextEditor from "./components/TextEditor";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/author_dashboard" element={<AuthorDashboard />} />
          <Route path="/user_dashboard" element={<UserDashboard />} />
          <Route path="/create_workbook" element={<CreateWorkbook />} />
          <Route
            path="/create_chapter/:workbooks_id/:chapter_number"
            element={<CreateChapter />}
          />
          <Route
            path="/author_chapters_view/:workbook_id"
            element={<AuthorChaptersView />}
          />
          <Route
            path="/user_chapters_view/:workbook_id"
            element={<UserChaptersView />}
          />
          <Route
            path="/user_chapter/:workbook_id/:chapter_id"
            element={<UserChapter />}
          />
          <Route path="/edit_summary/:workbook_id" element={<EditSummary />} />
          <Route
            path="/edit_chapter/:workbook_id/:chapter_id"
            element={<EditChapter />}
          />
          <Route path="/test" element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
