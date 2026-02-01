import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
