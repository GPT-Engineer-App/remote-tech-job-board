import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Text, Box, Button } from "@chakra-ui/react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/index.js';

const fetchJobById = async (id) => {
  const { data, error } = await supabase
    .from('Jobs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, error, isLoading } = useQuery(['job', id], () => fetchJobById(id));

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text fontSize="2xl" fontWeight="bold">Loading...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text fontSize="2xl" fontWeight="bold">Error loading job: {error.message}</Text>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text fontSize="2xl" fontWeight="bold">Job not found</Text>
      </Container>
    );
  }

  console.log("Job data:", job); // Log the job data to verify

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} mb={8}>
        <Text fontSize="4xl" fontWeight="bold">{job.job_title}</Text>
        <Text fontSize="lg" color="gray.500">{job.job_function}</Text>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Text>{job.job_description}</Text>
        </Box>
        <Button onClick={() => navigate(-1)} colorScheme="blue">Back</Button>
      </VStack>
    </Container>
  );
};

export default JobDetails;