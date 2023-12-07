import React from 'react';
import {EDIT_PAGE} from '../../constansts/routes';
import {NotePencil, Trash} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';
import {Meal} from '../../types';
import dayjs from 'dayjs';

interface Props {
  meal: Meal;
  remove: (id: string) => void;
}

const MealItem: React.FC<Props> = ({meal, remove}) => {
  const navigate = useNavigate();

  return (
    <div
      className="border border-black p-3"
      key={meal.id}
    >
      <div className="grid grid-cols-5 items-center">
        <div className="col-span-3">
          <p className="text-gray-400 font-normal text-xl">{meal.type} {dayjs(meal.date).format('HH:mm D MMMM YYYY')}</p>
          <h4 className="text-2xl font-bold">{meal.name}</h4>
        </div>
        <div className="col-span-1 grid place-content-end">
          <strong>{meal.calories}</strong>
        </div>
        <div className="col-span-1 grid place-content-end">
          <button onClick={() => navigate(`/${meal.id}${EDIT_PAGE}`)}><NotePencil size={32}/></button>
          <button onClick={() => remove(meal.id)}><Trash className="text-red-500" size={32}/></button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;