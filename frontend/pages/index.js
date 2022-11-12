import { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";

const Home = () => {
  // Extraer el usuario autenticado del storage
  const { getAuthenticatedUser } = useContext(authContext);

  useEffect(() => {
    getAuthenticatedUser();
  }, []);
  return <h1>Index</h1>;
};

export default Home;
