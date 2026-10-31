import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/">Strona Główna</NavLink></li>
          <li><NavLink to="/cars">Lista samochodów</NavLink></li>
          <li><NavLink to="/cars/new">Dodaj nowy samochód</NavLink></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}