import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';
import { useAuthStore } from '../store/useAuthStore';

interface CarCardProps {
  car: Car;
  onDelete: (id: string) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  const user = useAuthStore((state) => state.user);
  const favoriteCarIdsByUser = useCarUiStore((state) => state.favoriteCarIdsByUser);
  
  const favoriteCarIds = user
    ? favoriteCarIdsByUser[user.id] ?? []
    : [];
    
  const isFavorite = favoriteCarIds.includes(car.id);
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);
  return (
    <div style={{ marginBottom: '10px', padding: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <strong>{car.brand} {car.model}</strong>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <Link to={`/cars/${car.id}`}>Szczegóły</Link>
        <button onClick={() => onDelete(car.id)}>Usuń</button>
        <button
          type="button"
          className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
          onClick={() => { if (user) { toggleFavorite(user.id, car.id); } }}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>
      </div>
    </div>
  );
}