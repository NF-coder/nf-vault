import { BrowserRouter, Route, Routes } from "react-router";

import "./themes/default.css";
import "./App.css";
import { ErrorProvider } from "@/05-entities/error";
import { EditPage } from "@/02-pages/edit";

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/edit"
            element={
              <EditPage/>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;
