import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clientAxios from "../config/axios";

const Dropzone = () => {
  // Extraer contenido de dropzone
  // isDragActive: Detecta cuando el usuario hace el evento de drag
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      <div {...getRootProps({ className: "dropzone w-full py-32" })}>
        <input className="h-100" {...getInputProps()} />

        {isDragActive ? (
          <p className="text-2xl text-center text-gray-600">Drop file</p>
        ) : (
          <div className="text-center">
            <p className="text-2xl text-center text-gray-600">
              Select a file and drag it here
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
