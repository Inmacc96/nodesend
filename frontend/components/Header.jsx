import Image from "next/image";

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Image
        width={256}
        height={0}
        className="mb-8 md:mb-0"
        src="/logo.svg"
        alt="logo"
      />
    </header>
  );
};

export default Header;
