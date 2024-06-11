import { useState } from "react";
import { Link } from "react-router-dom"; // Ensure Link is correctly imported
import { Container, VStack, Text, Button, HStack, Box, SimpleGrid } from "@chakra-ui/react";
import { useJobs, useDeleteJob } from "../integrations/supabase/index.js"; // Import the useJobs and useDeleteJob hooks
import { useSupabaseAuth } from "../integrations/supabase/auth"; // Import useSupabaseAuth hook

const Index = () => {
  const [filter, setFilter] = useState("All");
  const { data: jobs, error, isLoading } = useJobs(); // Use the useJobs hook to fetch jobs data
  const { session } = useSupabaseAuth(); // Get session from useSupabaseAuth hook
  const deleteJobMutation = useDeleteJob(); // Get deleteJob mutation

  const handleDelete = (id) => {
    deleteJobMutation.mutate(id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading jobs: {error.message}</Text>;
  }

  console.log("Jobs data:", jobs); // Log the jobs data to verify

  const filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.job_function === filter);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} mb={8}>
        <Text fontSize="4xl" fontWeight="bold">Remote Tech Jobs</Text>
        <Text fontSize="lg">Find your next remote job in tech. Filter by category to narrow down your search.</Text>
      </VStack>
      <HStack spacing={4} mb={8}>
        <Button onClick={() => setFilter("All")} colorScheme={filter === "All" ? "blue" : "gray"}>All</Button>
        <Button onClick={() => setFilter("Product")} colorScheme={filter === "Product" ? "blue" : "gray"}>Product</Button>
        <Button onClick={() => setFilter("Design")} colorScheme={filter === "Design" ? "blue" : "gray"}>Design</Button>
        <Button onClick={() => setFilter("Engineering")} colorScheme={filter === "Engineering" ? "blue" : "gray"}>Engineering</Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filteredJobs.map(job => (
          <Box key={job.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Link to={`/job/${job.id}`}>
              <Text fontSize="xl" fontWeight="bold">{job.job_title}</Text>
              <Text mt={2}>{job.job_function}</Text>
            </Link>
            {session && (
              <Button mt={2} colorScheme="red" onClick={() => handleDelete(job.id)}>Delete</Button>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;