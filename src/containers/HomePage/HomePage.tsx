import React from 'react';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {EDIT_PAGE, NEW_MEAL_PAGE} from '../../constansts/routes';
import {Meal} from '../../types';
import {NotePencil, Trash} from '@phosphor-icons/react';

interface Props {
  meals: Meal[];
}

const HomePage: React.FC<Props> = ({meals}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  if (id){
    return <Outlet/>;
  }

  return (
    <>
      <div>
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
        <div className="my-3 flex flex-col gap-2">
          {
            meals.map((meal) => (
              <div
                className="border border-black p-3"
                key={meal.id}
              >
                <div className="grid grid-cols-5 items-center">
                  <div className="col-span-3">
                    <p className="text-gray-400 font-normal text-xl">{meal.type}</p>
                    <h4 className="text-2xl font-bold">{meal.name}</h4>
                  </div>
                  <div className="col-span-1 grid place-content-end">
                    <strong>{meal.calories}</strong>
                  </div>
                  <div className="col-span-1 grid place-content-end">
                    <button onClick={() => navigate(`/${meal.id}${EDIT_PAGE}`)}><NotePencil size={32}/></button>
                    <button><Trash className="text-red-500" size={32} /></button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default HomePage;