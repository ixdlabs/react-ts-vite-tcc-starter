import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useAuth } from '@/state/auth';

export function Home() {
  const { logoutMutation } = useAuth();
  return (
    <div>
      <Typography variant="h4" className="mb-4">
        You are logged in.
      </Typography>
      <Button variant="secondary" onClick={() => logoutMutation.mutate()}>
        Logout
      </Button>
    </div>
  );
}
