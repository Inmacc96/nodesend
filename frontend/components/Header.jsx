import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import authContext from "../context/auth/authContext";
import uploadContext from "../context/upload/uploadContext";

const Header = () => {
  // Context auth y upload
  const { user, logOut } = useContext(authContext);
  const { cleanState } = useContext(uploadContext);

  // Routing
  const router = useRouter();

  const redirect = () => {
    router.push("/");
    cleanState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Image
        width={256}
        height={0}
        className="mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
        alt="logo"
        onClick={redirect}
      />

      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-3">Hello {user.name}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
            >
              Sing up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
