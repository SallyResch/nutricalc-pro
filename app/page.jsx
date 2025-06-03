import FoodSearch from "@/components/FoodSearch";
import FoodSearchAddList from "@/components/FoodSearchAddList";
import FoodSearchByName from "@/components/FoodSearchByName";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>NutriCalc Pro</h1>
      <FoodSearchAddList />
      <FoodSearchByName />
      <FoodSearch />
    </div>
  );
}
