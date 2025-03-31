"use client";
import { useState, useEffect } from "react";

export default function FoodSearchByName() {
  const [foodList, setFoodList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hämta alla livsmedel vid första inladdningen
  useEffect(() => {
    async function fetchFoods() {
      setLoading(true);
      try {
        const res = await fetch("https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=1000&sprak=1");
        if (!res.ok) throw new Error("Kunde inte hämta livsmedelsdata");
        const data = await res.json();
        console.log(data); // Debugging: se vad API:et returnerar
        setFoodList(data.livsmedel || []); // Säkerställ att vi har en array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  // Filtrera livsmedel baserat på användarens sökning
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = foodList.filter(food =>
        food.namn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(results);
    } else {
      setFilteredFoods([]);
    }
  }, [searchTerm, foodList]);

  // Hämta näringsvärden för valt livsmedel
  useEffect(() => {
    if (!selectedFood) return;
    async function fetchNutrition() {
      setLoading(true);
      try {
        const res = await fetch(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${selectedFood.nummer}/naringsvarden?sprak=1`);
        if (!res.ok) throw new Error("Kunde inte hämta näringsvärden");
        const data = await res.json();
        setNutrition(data || []);
        setFilteredFoods([]); // Ta bort listan när ett livsmedel har valts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNutrition();
  }, [selectedFood]);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1>Sök Livsmedel</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Skriv livsmedlets namn..."
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredFoods.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredFoods.map(food => (
            <li key={food.id} style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #ccc" }}
                onClick={() => setSelectedFood(food)}>
              {food.namn}
            </li>
          ))}
        </ul>
      )}

      {selectedFood && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", backgroundColor: "#f9f9f9" }}>
          <h2>{selectedFood.namn}</h2>
          <p><strong>Livsmedels ID:</strong> {selectedFood.nummer || "Ingen analysinfo"}</p>
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
