import {
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';
import { Link } from 'react-router';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      setMessage(null);
      
      const result = await forgotPassword(email);
      setMessage(result || 'Instrukcje resetowania hasła zostały wysłane.');
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError('Wystąpił błąd podczas wysyłania linku.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Odzyskiwanie hasła</h1>
      
      {message && <p style={{ color: 'green', fontWeight: 500 }}>{message}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form className="car-form" onSubmit={handleSubmit}>
        <label>
          Adres e-mail konta
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij link do resetu'}
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        Pamiętasz hasło? <Link to="/login">Wróć do logowania</Link>
      </p>
    </section>
  );
}