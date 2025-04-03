"use client";
import { useState, useEffect } from "react";
import styles from "../components/FoodSearchByName.module.css";

export default function FoodSearchAddList() {
  const [foodList, setFoodList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [removedFoods, setRemovedFoods] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFoods() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=1000&sprak=1"
        );
        if (!res.ok) throw new Error("Kunde inte hämta livsmedelsdata");
        const data = await res.json();
        setFoodList(data.livsmedel || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      setFilteredFoods(
        foodList.filter((food) =>
          food.namn.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredFoods([]);
    }
  }, [searchTerm, foodList]);

  async function handleSelectFood(food) {
    setSearchTerm("");
    setFilteredFoods([]);

    if (selectedFoods.some((f) => f.nummer === food.nummer)) return;
    
    setLoading(true);
    try {
      const res = await fetch(
        `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${food.nummer}/naringsvarden?sprak=1`
      );
      if (!res.ok) throw new Error("Kunde inte hämta näringsvärden");
      const data = await res.json();
      setSelectedFoods([...selectedFoods, food]);
      setNutritionData([...nutritionData, { food: food.namn, values: data }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function calculateTotalNutrition() {
    const totalNutrition = {};

    nutritionData.forEach(({ values }) => {
      values.forEach(({ namn, varde, enhet }) => {
        if (varde > 0) {
          if (!totalNutrition[namn]) {
            totalNutrition[namn] = { total: 0, enhet };
          }
          totalNutrition[namn].total += varde;
        }
      });
    });
    return totalNutrition;
  }

  return (
    <div className={styles.container}>
      <h1>Food Nutrition Calculator</h1>
      <input
        className={styles.textInput}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Sök efter livsmedel..."
      />

      {loading && <p>Laddar...</p>}
      {error && <p>{error}</p>}

      {filteredFoods.length > 0 && (
        <ul>
          {filteredFoods.map((food) => (
            <li key={food.nummer} onClick={() => handleSelectFood(food)}>
              {food.namn}
            </li>
          ))}
        </ul>
      )}

      <h3><strong>Valda livsmedel:</strong></h3>
      <ul className={styles.selectedList}>
        {selectedFoods.map((food) => (
       <li key={food.nummer}>{food.namn}</li>
          
        ))}
      </ul>

      <h3>Totala Näringsvärden per 100g/livsmedel:</h3>
      <ul>
        {Object.entries(calculateTotalNutrition()).map(([key, { total, enhet }]) => (
          <li key={key}>
            <strong>{key}:</strong> {total.toFixed(2)} {enhet}
          </li>
        ))}
      </ul>
    </div>
  );
}
