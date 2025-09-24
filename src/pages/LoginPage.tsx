import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="text-center mt-5">
      <h1>Welcome to Task Manager</h1>
      <p>Please log in to continue.</p>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </div>
  );
}
