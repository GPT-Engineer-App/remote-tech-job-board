import { useState } from 'react';
import { Container, VStack, Text, Button, Input, Box } from '@chakra-ui/react';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth';

const AdminLogin = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome, Admin!</Text>
          <Button onClick={logout} colorScheme="blue">Logout</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Admin Login</Text>
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
        <Button onClick={handleLogin} colorScheme="blue">Login</Button>
      </VStack>
    </Container>
  );
};

export default AdminLogin;