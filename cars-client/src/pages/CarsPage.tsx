import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (err) {
        setError('Wystąpił błąd podczas pobierania listy samochodów.');
      } finally {
        setLoading(false);
      }
    }
    
    loadCars();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten samochód?'); // Potwierdzenie usuniecia
    if (!confirmed) return; // Przerwanie w razie anulacji

    try {
      await deleteCar(id); // Wywołanie zadania usuniecia
      // Aktualizacja listy
      setCars(cars.filter(car => car.id !== id)); 
    } catch (err) {
      alert('Nie udało się usunąć samochodu.');
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (cars.length === 0) return <div>Lista jest pusta.</div>;

  return (
    <div>
      <h2>Lista samochodów</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id} style={{ marginBottom: '10px' }}>
            <strong>{car.brand} {car.model}</strong>
            {' | '}
            <Link to={`/cars/${car.id}`}>Szczegóły</Link>
            {' | '}
            <button onClick={() => handleDelete(car.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}