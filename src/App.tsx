import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { setUser } from './store/slices/userSlice';
import AppRouter from './components/router/AppRouter';
import './index.css';

// Mock user data - replace with actual authentication
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin' as const,
  avatar: undefined,
};

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize with mock user - replace with actual auth logic
    // dispatch(setUser(mockUser));
  }, [dispatch]);

  return <AppRouter />;
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;