import {
  NavLink,
  useNavigate,
} from 'react-router';
import {
  useCarUiStore,
} from '../store/useCarUiStore';
import {
  useAuthStore,
} from '../store/useAuthStore';

export default function Navigation() {
  const navigate = useNavigate();
  const user =
    useAuthStore(
      (state) => state.user,
    );
  const favoriteCount =
    useCarUiStore(
      (state) =>
        user
          ? (
              state.favoriteCarIdsByUser[
                user.id
              ] ?? []
            ).length
          : 0,
    );
  const logout =
    useAuthStore(
      (state) => state.logout,
    );

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navigation">
      <NavLink to="/">
        Strona główna
      </NavLink>
      {user && (
        <>
          <NavLink to="/cars" end>
            Samochody
          </NavLink>
          <NavLink to="/cars/new">
            Dodaj samochód
          </NavLink>
        </>
      )}
      <NavLink to="/about">
        O aplikacji
      </NavLink>
      {user ? (
        <>
          <span className="favorite-counter">
            Ulubione: {favoriteCount}
          </span>
          <span className="user-info">
            {user.userName}
            {' ('}
            {user.roles.join(', ')}
            {')'}
          </span>
          <button
            type="button"
            className="nav-button"
            onClick={handleLogout}
          >
            Wyloguj
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login">
            Logowanie
          </NavLink>
          <NavLink to="/register">
            Rejestracja
          </NavLink>
        </>
      )}
    </nav>
  );
}