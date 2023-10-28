import { Button } from '@/components/ui/button';
import { useAuth } from '@/state/auth';

export function Login() {
  const { loginMutation } = useAuth();

  return (
    <div>
      <Button onClick={() => loginMutation.mutate()}>Login</Button>
    </div>
  );
}
