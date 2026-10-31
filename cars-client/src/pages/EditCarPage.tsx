import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { NewCar } from '../models/Car';
import { getCarById, updateCar } from '../services/carService';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<NewCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;
      try {
        const data = await getCarById(id);
        const { id: _removedId, ...carDataToEdit } = data;
        setFormData(carDataToEdit);
      } catch (err) {
        setError('Nie udało się pobrać danych samochodu do edycji.');
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData) return;
    
    try {
      await updateCar(id, formData);
      navigate(`/cars/${id}`);
    } catch (err) {
      alert('Wystąpił błąd podczas aktualizacji samochodu.');
    }
  };

  if (loading) return <div>Ładowanie danych...</div>;
  if (error) return <div>{error}</div>;
  if (!formData) return <div>Brak danych do edycji.</div>;

  return (
    <div>
      <h2>Edytuj samochód</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
        <label>
          Marka:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </label>
        <label>
          Liczba drzwi:
          <input type="number" name="doorsNumber" value={formData.doorsNumber} onChange={handleChange} required />
        </label>
        <label>
          Pojemność bagażnika (l):
          <input type="number" name="luggageCapacity" value={formData.luggageCapacity} onChange={handleChange} required />
        </label>
        <label>
          Pojemność silnika (cm³):
          <input type="number" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} required />
        </label>
        <label>
          Rodzaj paliwa:
          <input type="number" name="fuelType" value={formData.fuelType} onChange={handleChange} required />
        </label>
        <label>
          Data produkcji:
          <input type="date" name="productionDate" value={formData.productionDate} onChange={handleChange} required />
        </label>
        <label>
          Średnie spalanie:
          <input type="number" step="0.1" name="averageFuelConsumption" value={formData.averageFuelConsumption} onChange={handleChange} required />
        </label>
        <label>
          Typ nadwozia:
          <input type="number" name="bodyType" value={formData.bodyType} onChange={handleChange} required />
        </label>
        
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
}