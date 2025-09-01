import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <div>
        <h1>home page</h1>
      </div>
    </>
  );
};

export default Home;
