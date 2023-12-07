import React, {useCallback, useEffect, useState} from 'react';
import {Meal, MutationMeal} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {HOME_PAGE} from '../../constansts/routes';
import Form from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';

const NewMeal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MutationMeal>({
    name: '',
    type: '',
    calories: 0
  });
  const [loading, setLoading] = useState(false);

  const getMeal = useCallback( async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<Meal | null>(`/meals/${id}.json`);
      const meals = mealsResponse.data;

      if (!meals) {
        return;
      }
      setMeal(meals);
    } catch (error) {
      alert('Error ' + error);
    } finally {
      setLoading(false);
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
      setLoading(true);

      if (id) {
        await axiosApi.put(`/meals/${id}.json`, meal);
        navigate(HOME_PAGE);
      } else {
        await axiosApi.post('/meals.json', meal);
        navigate(HOME_PAGE);
      }
    } catch (error) {
      alert('Error ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      {
        loading ?
          <Spinner/>
          :
          <Form
            meal={meal}
            changeMeal={changeMeal}
            createMeal={createMeal}
            id={id ? id : ''}
            loading={loading}
          />
      }
    </div>
  );
};

export default NewMeal;