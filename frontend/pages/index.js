import { useContext, useEffect } from "react";
import Dropzone from "../components/Dropzone";
import Alert from "../components/Alert";
import authContext from "../context/auth/authContext";
import uploadContext from "../context/upload/uploadContext";
import Link from "next/link";

const Home = () => {
  // Extraer el usuario autenticado del storage
  const { getAuthenticatedUser } = useContext(authContext);

  // Extraer el mensaje de error de la subida
  const { msg_file, url } = useContext(uploadContext);

  useEffect(() => {
    // Obtener el usuario autenticado si existen un token
    const token = localStorage.getItem("token");

    if (token) {
      getAuthenticatedUser();
    }
  }, []);

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ? (
        <>
          <p className="text-center text-2xl">
            <span className="font-bold text-red-700 text-3xl uppercase">
              Your URL is:
            </span>{" "}
            {`${process.env.frontendURL}/links/${url}`}
          </p>
          <button
            type="button"
            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer mt-10"
            onClick={() =>
              navigator.clipboard.writeText(
                `${process.env.frontendURL}/links/${url}`
              )
            }
          >
            Copy Link
          </button>
        </>
      ) : (
        <>
          {msg_file && <Alert message={msg_file} />}

          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone />

            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                Simple and private file sharing
              </h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend</span>{" "}
                allows you to share files with end-to-end encryption and a file
                is deleted after it is downloaded. So you can keep what you
                share private and make sure your stuff does not stay online
                forever.
              </p>
              <Link href="/signup">
                <p className="text-red-500 font-bold text-lg hover:text-red-700 hover:cursor-pointer">
                  Create an account for more benefits
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
