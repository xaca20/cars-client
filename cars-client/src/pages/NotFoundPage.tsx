import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div>
      <h2>Error 404 Page Not Found</h2>
      <p>Niestety, podany adres URL nie istnieje w naszej aplikacji.</p>
      <Link to="/">Wróć do strony głównej</Link>
    </div>
  );
}