import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import authContext from "../context/auth/authContext";
import uploadContext from "../context/upload/uploadContext";

const Dropzone = () => {
  // Context uploadContext
  const { showAlert, uploadFiles, loading, createLink } =
    useContext(uploadContext);

  // Context authContext
  const { isAuth, user } = useContext(authContext);

  const onDropRejected = () => {
    showAlert(
      "The file could not be uploaded, the limit is 1MB. Get a free account for uploading larger files"
    );
  };
  // La subida genera muchos re-renders(se sube bytes por bytes), por ello usamos useCallback
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // Crear un form data
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    uploadFiles(formData, acceptedFiles[0].path);
  }, []);

  // Extraer contenido de dropzone
  // isDragActive: Detecta cuando el usuario hace el evento de drag
  // onDrop: Funcion que se ejecuta cuando sueltas un archivo
  // acceptedFiles: Para leer los archivos que se van subiendo
  // onDrop se ejecuta todas la veces sin ningúna validación,
  // onDropAccepted: todos los que pasen ciertas reglas
  // onDropReject: caen los archivos que han sido rechazados bajo ciertas reglas
  // Reglas puede ser: Un formato, un tamaño de archivo minimo o máximo
  // La regla en este caso es que el maximo de tamaño es 1mb
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1024 * 1024 });

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <li
                key={file.lastModified}
                className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
              >
                <p className="font-bold text-xl">{file.path}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
                </p>
              </li>
            ))}
          </ul>

          {isAuth ? <p>Is authenticated</p> : ""}

          {loading ? (
            <p className="my-10 text-center text-gray-600">Uploading file...</p>
          ) : (
            <button
              type="button"
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={createLink}
            >
              Create link
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Drop the files here{" "}
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Drag and drop some files here, or click to select file
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Select files to upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
