import React, {useCallback, useEffect, useState} from 'react';
import {Meal, MutationMeal} from '../../types';
import {typesMeal} from '../../constansts/typesMeal';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {HOME_PAGE} from '../../constansts/routes';

const NewMeal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MutationMeal>({
    name: '',
    type: '',
    calories: 0
  });

  const getMeal = useCallback( async () => {
    try {
      const mealsResponse = await axiosApi.get<Meal | null>(`/meals/${id}.json`);
      const meals = mealsResponse.data;

      if (!meals) {
        return;
      }
      setMeal(meals);
    } catch (error) {
      alert('Error ' + error);
    }
  }, [id]);


  useEffect(() => {
    void getMeal();
  }, [getMeal]);


  const changeMeal = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setMeal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createMeal = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (id) {
        await axiosApi.put(`/meals/${id}.json`, meal);
        navigate(HOME_PAGE);
      } else {
        await axiosApi.post('/meals.json', meal);
      }
    } catch (error) {
      alert('Error ' + error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <form onSubmit={createMeal} className="w-full">
        <div className="grid grid-cols-2 gap-5 mb-3">
          <div className="col-span-1">
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="type"
              value={meal.type}
              onChange={changeMeal}
            >
              <option value={''}>Choose a type meal</option>
              {
                typesMeal.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))
              }
            </select>
          </div>
          <div className="col-span-1">
            <input
              placeholder="Name meal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={meal.name}
              onChange={changeMeal}
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Enter Calories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            name="calories"
            value={meal.calories}
            onChange={changeMeal}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="text-gray-700 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {id ? 'Save' : 'Add'}
          </button>
          {
            id ?
              <button
                onClick={() => navigate(HOME_PAGE)}
                className="ms-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Cancel
              </button>
              :
              null
          }
        </div>
      </form>
    </div>
  );
};

export default NewMeal;