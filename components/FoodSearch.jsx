"use client";
import { useState } from "react";

export default function FoodSearch() {
  const [foodId, setFoodId] = useState("");
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchFood() {
    if (!foodId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${foodId}?sprak=1`);
      if (!res.ok) throw new Error("Livsmedel hittades inte!");
      const data = await res.json();
      setFood(data);
    } catch (err) {
      setError(err.message);
      setFood(null);
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
          <h2>{foodId}</h2>
          <p><strong>Livsmedelsnamn:</strong> {food.namn}</p>
          <p><strong>Analys:</strong> {food.analys}</p>
        </div>
      )}
    </div>
  );
}
