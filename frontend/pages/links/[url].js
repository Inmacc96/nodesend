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
  console.log(link);
  return (
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
  );
};

export default Links;
