import { useNavigate } from "react-router-dom";

export default function ClassTile({ classObj }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/class/${classObj._id.toString()}/`)}>
      <h1> {classObj.title}</h1>
    </div>
  );
}
