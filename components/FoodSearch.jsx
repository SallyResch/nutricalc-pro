"use client";
import { useState } from "react";

export default function FoodSearch() {
  const [foodId, setFoodId] = useState("");
  const [food, setFood] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchFood() {
    if (!foodId) return;
    setLoading(true);
    setError("");
    setFood(null);
    setNutrition(null);

    try {
      // Hämta livsmedelsinformation
      const foodRes = await fetch(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${foodId}?sprak=1`);
      if (!foodRes.ok) throw new Error("Livsmedel hittades inte!");
      const foodData = await foodRes.json();
      setFood(foodData);

      // Hämta näringsvärden
      const nutritionRes = await fetch(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${foodId}/naringsvarden?sprak=1`);
      if (!nutritionRes.ok) throw new Error("Näringsvärden kunde inte hämtas!");
      const nutritionData = await nutritionRes.json();

      // Extrahera endast namn och värde för näringsvärdena
      const filteredNutrition = nutritionData.map(item => ({
        namn: item.namn,
        varde: item.varde
      }));

      setNutrition(filteredNutrition);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1>Sök Livsmedel</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="number"
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
          placeholder="Ange ett ID..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={fetchFood} style={{ padding: "8px", backgroundColor: "blue", color: "white", border: "none" }}>
          Sök
        </button>
      </div>

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {food && (
        <div style={{ padding: "10px", border: "1px solid #ccc", marginTop: "10px", backgroundColor: "#f9f9f9" }}>
          <h2>Livsmedelsnamn: {food.namn}</h2>
          <p><strong>Analys:</strong> {food.analys}</p>
        </div>
      )}

      {nutrition && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", backgroundColor: "#eef" }}>
          <h3>Näringsvärden (per 100g)</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {nutrition.map((item, index) => (
              <li key={index}>
                <strong>{item.namn}:</strong> {item.varde}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
