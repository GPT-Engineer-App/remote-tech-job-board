import { useState } from 'react';
import { Container, VStack, Input, Button, Text } from '@chakra-ui/react';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth';

const AdminLogin = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return (
      <Container centerContent>
        <VStack spacing={4}>
          <Text>Welcome, Admin!</Text>
          <Button onClick={logout}>Logout</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Admin Login</Text>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Container>
  );
};

export default AdminLogin;