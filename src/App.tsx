import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './routes/app-routes';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={new QueryClient({})}>
        <AppRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
