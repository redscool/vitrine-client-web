import { Route, Routes } from "react-router-dom";
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import ClassSpace from "./ClassSpace";
export default function AppWrapper() {
  return (
    <div>
      <Routes>
        <Route exact path="/teacher/*" element={<Teacher />} />
        <Route exact path="/student/*" element={<Student />} />
        <Route exact path="/class/:classId/*" element={<ClassSpace />} />
        <Route exact path="/*" element={<h1> not found app</h1>} />
      </Routes>
    </div>
  );
}
