import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Meal, MealsList} from '../../types';
import {EDIT_PAGE, HOME_PAGE, NEW_MEAL_PAGE} from '../../constansts/routes';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import HomePage from '../HomePage/HomePage';
import Layout from '../../components/Layout/Layout';
import NewMeal from '../NewMeal/NewMeal';

const App = () => {
  const location = useLocation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const getMeals = useCallback( async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<MealsList | null>('/meals.json');
      const meals = mealsResponse.data;

      if (!meals) {
        setMeals([]);
      } else {
        const newMeals: Meal[] = Object.keys(meals).map((id) => {
          const meal = meals[id];
          return {
            ...meal,
            id
          };
        });

        setMeals(newMeals);
      }
    } catch (error) {
      alert('Error ' + error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (location.pathname === HOME_PAGE) {
      void getMeals();
    }
  }, [getMeals, location.pathname]);

  const removeMeal = async (id: string) => {
    try {
      setLoading(true);
      await axiosApi.delete(`/meals/${id}.json`);
      void getMeals();
    } catch (error) {
      alert('Error ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Routes>
        <Route path={HOME_PAGE} element={
          <HomePage meals={meals} remove={removeMeal} loading={loading}/>
        }>
          <Route path={`${HOME_PAGE}/:id${EDIT_PAGE}`} element={<NewMeal/>}/>
        </Route>
        <Route path={NEW_MEAL_PAGE} element={<NewMeal/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  );
};

export default App;