import { useContext, useState } from "react";
import uploadContext from "../context/upload/uploadContext";

const Form = () => {
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const { password, savePassword, downloads, saveNDownloads } =
    useContext(uploadContext);

  return (
    <div className="w-ful mt-20">
      <div>
        <label className="text-lg text-gray-800"> Delete after:</label>
        <select
          className="appearance-none w-full mt-2 bg-white border boder-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus: outline-none  focus:border-gray-500"
          value={downloads}
          onChange={(e) => saveNDownloads(parseInt(e.target.value))}
        >
          <option value="" disabled>
            -- Select --
          </option>
          <option value="1"> 1 Download</option>
          <option value="5"> 5 Downloads</option>
          <option value="10"> 10 Downloads</option>
          <option value="20"> 20 Downloads</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">Password protect</label>
          <input
            type="checkbox"
            onChange={() => setPasswordEnabled(!passwordEnabled)}
          />
        </div>

        {passwordEnabled && (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400  text-black py-3 px-4 pr-8 rounded leading-none focus: outline-none focus:border-gray-500"
            value={password}
            onChange={(e) => savePassword(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
