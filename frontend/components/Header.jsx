import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <Image
          width={256}
          height={0}
          className="mb-8 md:mb-0"
          src="/logo.svg"
          alt="logo"
        />
      </Link>

      <div>
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
      </div>
    </header>
  );
};

export default Header;
