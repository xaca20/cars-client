import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        setError('Nie udało się pobrać szczegółów samochodu.');
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [id]);

  if (loading) return <div>Ładowanie danych...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>Nie znaleziono samochodu.</div>;

  return (
    <div>
      <h2>Szczegóły samochodu</h2>
      <ul>
        <li><strong>Marka:</strong> {car.brand}</li>
        <li><strong>Model:</strong> {car.model}</li>
        <li><strong>Liczba drzwi:</strong> {car.doorsNumber}</li>
        <li><strong>Pojemność bagażnika:</strong> {car.luggageCapacity} l</li>
        <li><strong>Pojemność silnika:</strong> {car.engineCapacity} cm3</li>
        <li><strong>Rodzaj paliwa:</strong> {car.fuelType}</li>
        <li><strong>Data produkcji:</strong> {car.productionDate}</li>
        <li><strong>Średnie spalanie:</strong> {car.averageFuelConsumption} l/100km</li>
        <li><strong>Typ nadwozia:</strong> {car.bodyType}</li>
      </ul>
      <br />
      <Link to="/cars">Powrót do listy</Link>
      {' | '}
      <Link to={`/cars/${car.id}/edit`}>Edytuj</Link>
    </div>
  );
}