import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ReactNodeSend</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
