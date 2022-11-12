import { useContext, useEffect } from "react";
import Dropzone from "../components/Dropzone";
import authContext from "../context/auth/authContext";
import Link from "next/link";

const Home = () => {
  // Extraer el usuario autenticado del storage
  const { getAuthenticatedUser } = useContext(authContext);

  useEffect(() => {
    getAuthenticatedUser();
  }, []);
  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
        <Dropzone />

        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
          <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
            Simple and private file sharing
          </h2>
          <p className="text-lg leading-loose">
            <span className="text-red-500 font-bold">ReactNodeSend</span> allows
            you to share files with end-to-end encryption and a file is deleted
            after it is downloaded. So you can keep what you share private and
            make sure your stuff does not stay online forever.
          </p>
          <Link href="/signup">
            <p className="text-red-500 font-bold text-lg hover:text-red-700 hover:cursor-pointer">
              Create an account for more benefits
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
