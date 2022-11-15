import { useState } from "react";
import clientAxios from "../../config/axios";

// Los props estáticos van a ser la respuesta que vamos a obtener.
//Ejemplo: Visito una url y obtenemos el registro de ese link de la bd
export async function getServerSideProps(props) {
  const {
    params: { url },
  } = props;
  try {
    const { data } = await clientAxios(`/api/links/${url}`);
    return {
      props: {
        link: data,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}

// Static Path es el routing
// Va a generar todas las urls de todos los links de la db
export async function getSeverSidePaths() {
  try {
    const { data } = await clientAxios("/api/links");
    return {
      paths: data.links.map((link) => ({
        params: { url: link.url },
      })),
      fallback: false,
    };
  } catch (err) {
    console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }

  // Debes devolver un path: string de url o array de urls
  // Si fallback es true y una página no existe va a mostrar algo, si es false
  // muestra un 404
}

const Links = ({ link }) => {
  const [passwordAvailable, setPasswordAvailable] = useState(link.password);

  const verifyPassword = (e) => {
    e.preventDefault();

  };
  return (
    <>
      {passwordAvailable ? (
        <>
          <p className="text-center">
            This link is protected by a password, please enter it below
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={verifyPassword}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="passowrd"
                    placeholder="Link Password"
                  />
                </div>

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer mt-3"
                  value="Validate password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Download your file:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Here
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Links;
