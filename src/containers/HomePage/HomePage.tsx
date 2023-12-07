import {useNavigate} from 'react-router-dom';
import {NEW_MEAL_PAGE} from '../../constansts/routes';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1">
          <p>Total calories: 400 kcal</p>
        </div>
        <div className="col-span-1 grid place-content-end">
          <button
            onClick={() => navigate(NEW_MEAL_PAGE)}
            className="text-gray-700 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add new meal
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;