import { Route, Routes } from "react-router-dom";
import Dashboard from "../common/Dashboard";

export default function Teacher() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/dashboard/*"
          element={<Dashboard userType="teacher" />}
        />
        <Route path="/*" element={<h1>Not found1</h1>} />
      </Routes>
    </div>
  );
}
