import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="text-center font-bold text-4xl">404 - Page Not Found</h1>
      <div className="flex items-center justify-center mt-10">
        <Link
          href="/"
          className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
        >
          Go back home
        </Link>
      </div>
    </>
  );
}
