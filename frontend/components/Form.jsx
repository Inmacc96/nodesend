const Form = () => {
  return (
    <div className="w-ful mt-20">
      <div>
        <label className="text-lg text-gray-800"> Delete after:</label>
        <select className="appearance-none w-full mt-2 bg-white border boder-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus: outline-none  focus:border-gray-500">
          <option value="" selected disabled>
            -- Select --
          </option>
          <option value="1"> 1 Download</option>
          <option value="5"> 5 Downloads</option>
          <option value="10"> 10 Downloads</option>
          <option value="20"> 20 Downloads</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
