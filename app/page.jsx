import FoodSearchAddList from "@/components/FoodSearchAddList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <h1>NutriCalc Pro</h1>
      <FoodSearchAddList />
    </div>
  );
}
