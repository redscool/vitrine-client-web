import { Route, Routes } from "react-router-dom";
import Dashboard from "../common/Dashboard";

export default function Student() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/dashboard/*"
          element={<Dashboard userType="student" />}
        />
        <Route path="/*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}
