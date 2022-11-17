import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }) => {
  console.log("ENV BACKENDURL", process.env.NEXT_PUBLIC_backendURL);
  console.log("ENV FRONTENDURL", process.env.NEXT_PUBLIC_frontendURL);
  return (
    <>
      <Head>
        <title>ReactNodeSend</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
