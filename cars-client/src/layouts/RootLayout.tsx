import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

export default function RootLayout() {
  return (
    <div>
      <Navigation />
      
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}