const HomePage = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1">
          <p>Total calories: 400 kcal</p>
        </div>
        <div className="col-span-1 grid place-content-end">
          <button
            className="text-gray-700 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add new meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;