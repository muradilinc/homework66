import React from 'react';
import {Meal} from '../../types';
import MealItem from './MealItem';

interface Props {
  meals: Meal[];
  remove: (id: string) => void;
}

const MealView: React.FC<Props> = ({meals, remove}) => {
  return (
    <>
      {
        meals.map((meal) =>
          <MealItem
            key={meal.id}
            remove={remove}
            meal={meal}/>
        )
      }
    </>
  );
};

export default MealView;