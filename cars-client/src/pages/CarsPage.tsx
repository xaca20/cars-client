import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';
import { useCarUiStore } from '../store/useCarUiStore';
import CarCard from '../components/CarCard';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = useCarUiStore((state) => state.searchTerm);
  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
  
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
  
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        setLoading(true);
        setError(null);
        const loadedCars = await getCars(controller.signal);
        setCars(loadedCars);
      } catch (caughtError) {
        if (axios.isCancel(caughtError)) return;
        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError('Wystapil nieznany blad.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadCars();
    return () => controller.abort();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten samochód?');
    if (!confirmed) return;

    try {
      await deleteCar(id);
      removeFavorite(id);
      setCars((currentCars) => currentCars.filter((car) => car.id !== id)); 
    } catch (err) {
      alert('Nie udało się usunąć samochodu.');
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  
  const visibleCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);

    const matchesFavorite =
      !showFavoritesOnly || favoriteCarIds.includes(car.id);

    return matchesSearch && matchesFavorite;
  });

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista samochodów</h2>
      
      <div className="cars-toolbar" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input
          type="search"
          placeholder="Szukaj po marce lub modelu..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <label className="favorite-filter" style={{ display: 'flex', alignItems: 'center', gap: '5px', flexDirection: 'row' }}>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(event) => setShowFavoritesOnly(event.target.checked)}
          />
          Tylko ulubione
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {visibleCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}