import { NavLink, Outlet } from 'react-router';
import { useCarUiStore } from '../store/useCarUiStore';

export default function RootLayout() {
  const favoriteCount = useCarUiStore((state) => state.favoriteCarIds.length);

  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/">Strona Główna</NavLink></li>
          <li><NavLink to="/cars">Lista samochodów</NavLink></li>
          <li><NavLink to="/cars/new">Dodaj nowy samochód</NavLink></li>
          <li className="favorite-counter">
            Ulubione: {favoriteCount}
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}