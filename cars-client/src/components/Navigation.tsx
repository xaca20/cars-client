import { NavLink } from 'react-router';
import { useCarUiStore } from '../store/useCarUiStore';

export default function Navigation() {
  const favoriteCount = useCarUiStore(
    (state) => state.favoriteCarIds.length
  );

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', padding: 10, alignItems: 'center' }}>
        <li><NavLink to="/">Strona główna</NavLink></li>
        <li><NavLink to="/cars">Lista samochodów</NavLink></li>
        <li><NavLink to="/cars/new">Dodaj samochód</NavLink></li>
        <li>
          <span className="favorite-counter">
            Ulubione: {favoriteCount}
          </span>
        </li>
      </ul>
    </nav>
  );
}