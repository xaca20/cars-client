import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { NewCar } from '../models/Car';
import { createCar } from '../services/carService';

export default function CreateCarPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<NewCar>({
    brand: '',
    model: '',
    doorsNumber: 5,
    luggageCapacity: 500,
    engineCapacity: 1500,
    fuelType: 1,
    productionDate: '',
    averageFuelConsumption: 6.5,
    bodyType: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createCar(formData);
      navigate('/cars');
    } catch (error) {
      alert('Wystąpił błąd podczas dodawania samochodu.');
    }
  };

  return (
    <div>
      <h2>Dodaj nowy samochód</h2>
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
        
        <button type="submit">Zapisz samochód</button>
      </form>
    </div>
  );
}