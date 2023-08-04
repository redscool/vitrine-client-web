import { useNavigate } from "react-router-dom";

export default function SpaceTile({ spaceObj }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/space/${spaceObj._id.toString()}/`)}>
      <h1> {spaceObj.title}</h1>
    </div>
  );
}
