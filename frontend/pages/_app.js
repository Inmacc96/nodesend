import "../styles/tailwind.css";
import Layout from "../components/Layout";
import AuthState from "../context/auth/authState";
import UploadState from "../context/upload/uploadState";

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <UploadState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UploadState>
    </AuthState>
  );
}

export default MyApp;
