export interface Meal {
  id: string;
  type: string;
  name: string;
  calories: number;
  date: string;
}

export type ApiMeal = Omit<Meal, 'id'>;
export type MutationMeal = Omit<Meal, 'id'>;

export interface MealsList {
  [id: string]: ApiMeal;
}
