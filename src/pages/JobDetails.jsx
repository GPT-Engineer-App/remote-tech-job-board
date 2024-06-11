import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Text, Box, Button } from "@chakra-ui/react";

const jobs = [
  { id: 1, title: "Frontend Developer", category: "Engineering", description: "Detailed description for Frontend Developer" },
  { id: 2, title: "Product Manager", category: "Product", description: "Detailed description for Product Manager" },
  { id: 3, title: "UI/UX Designer", category: "Design", description: "Detailed description for UI/UX Designer" },
  { id: 4, title: "Backend Developer", category: "Engineering", description: "Detailed description for Backend Developer" },
  { id: 5, title: "Graphic Designer", category: "Design", description: "Detailed description for Graphic Designer" },
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text fontSize="2xl" fontWeight="bold">Job not found</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} mb={8}>
        <Text fontSize="4xl" fontWeight="bold">{job.title}</Text>
        <Text fontSize="lg" color="gray.500">{job.category}</Text>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Text>{job.description}</Text>
        </Box>
      <Button onClick={() => navigate(-1)} colorScheme="blue">Back</Button>
      </VStack>
    </Container>
  );
};

export default JobDetails;