import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Meal, MutationMeal} from '../../types';
import {HOME_PAGE} from '../../constansts/routes';
import Form from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';

const NewMeal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MutationMeal>({
    name: '',
    type: '',
    date: '',
    calories: 0
  });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<string>(new Date().toString());

  const getMeal = useCallback( async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<Meal | null>(`/meals/${id}.json`);
      const meals = mealsResponse.data;

      if (!meals) {
        return;
      }
      setMeal(meals);
      setDate(meals.date);
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
      [name]: value,
    }));
  };

  const createMeal = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (id) {
        await axiosApi.put(`/meals/${id}.json`, {
          ...meal,
          date: date
        });
        navigate(HOME_PAGE);
      } else {
        await axiosApi.post('/meals.json', {
          ...meal,
          date
        });
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
            date={date}
            changeMeal={changeMeal}
            createMeal={createMeal}
            changeDate={(date) => setDate(date)}
            id={id ? id : ''}
            loading={loading}
          />
      }
    </div>
  );
};

export default NewMeal;