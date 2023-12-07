import React from 'react';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {NEW_MEAL_PAGE} from '../../constansts/routes';
import {Meal} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import MealView from '../../components/MealView/MealView';

interface Props {
  meals: Meal[];
  remove: (id: string) => void;
  loading: boolean;
}

const HomePage: React.FC<Props> = ({meals, remove, loading}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  if (id){
    return <Outlet/>;
  }

  const totalCalories = meals.reduce((sum, meal) => {
    return sum + Number(meal.calories);
  }, 0);

  return (
    <>
      <div>
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-1">
            <p>Total calories: {totalCalories} kcal</p>
          </div>
          <div className="col-span-1 grid place-content-end">
            <button
              onClick={() => navigate(NEW_MEAL_PAGE)}
              className="text-gray-700 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={loading}
            >
              Add new meal
            </button>
          </div>
        </div>
        <div className="my-3 flex flex-col gap-2">
          {
            loading ? <Spinner/> : <MealView meals={meals} remove={remove}/>
          }
        </div>
      </div>
    </>
  );
};

export default HomePage;