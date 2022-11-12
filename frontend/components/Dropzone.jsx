import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clientAxios from "../config/axios";

const Dropzone = () => {
  // La subida genera muchos re-renders(se sube bytes por bytes), por ello usamos useCallback
  const onDrop = useCallback(async (acceptedFiles) => {
    // Crear un form data
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await clientAxios.post("/files", formData);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Extraer contenido de dropzone
  // isDragActive: Detecta cuando el usuario hace el evento de drag
  // onDrop: Funcion que se ejecuta cuando sueltas un archivo
  // acceptedFiles: Para leer los archivos que se van subiendo
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
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
    </div>
  );
};

export default Dropzone;
