import { BrowserRouter, Route, Routes } from "react-router";

import "./themes/default.css";
import "./App.css";
import ErrorProvider from "@/06-shared/lib/error/ErrorProvider";
import { EditPage } from "@/02-pages/edit";
import { TreePage } from "@/02-pages/tree";

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/edit/:docId"
            element={<EditPage/>}
          />
          <Route
            path="/tree"
            element={<TreePage/>}
          />
          <Route
            path="/tree/:dirId"
            element={<TreePage/>}
          />
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;
