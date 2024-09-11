import React, { useState } from "react";
import { ChakraProvider, Box, Container, Input, VStack, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { CubeProvider } from "@cubejs-client/react";
import cube from "@cubejs-client/core";
import CustomeTableChart from "./components/CustomeTableChart";
import CustomeLinechart from "./components/CustomeLinechart";
import CustomeAreachart from "./components/CustomeAreachart";
import CustomeBarchart from "./components/CustomeBarchart";
import "./App.css"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const cubeApi = cube(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU5OTE5ODd9.USQ7bfVBHzcrWOf9afxHmAst9Cp4pF9dnAFkJoKERKI",
    {
      apiUrl: "https://exciting-marmot.aws-us-east-1.cubecloudapp.dev/user/rutikkhandekar123%40gmail.com/1/cubejs-api/v1",
    }
  );

  const chartComponents = [
    { name: "Line Chart", component: <CustomeLinechart searchTerm={searchTerm} /> },
    { name: "Area Chart", component: <CustomeAreachart searchTerm={searchTerm} /> },
    { name: "Bar Chart", component: <CustomeBarchart searchTerm={searchTerm} /> },
    { name: "Table Chart", component: <CustomeTableChart searchTerm={searchTerm} /> },
  ];

  const filteredCharts = chartComponents.filter((chart) =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider>
      <CubeProvider cubeApi={cubeApi}>
        <Container
          maxW="100vw"
          p={4}
          bg="gray.50"
          height="100vh"
          overflow="auto"
          centerContent
        >
          <VStack spacing={8} align="stretch" w="full" maxW="1400px">
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Data Visualization Dashboard
            </Heading>

            <Input
              placeholder="Search for charts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              bg="white"
              borderRadius="md"
              boxShadow="md"
              maxW="800px"
              mx="auto"
              mb={6}
            />

            <Grid
              className="chart-container"
              templateColumns={{ md: "repeat(2, 1fr)" }}
              gap={6}
              w="full"
            >
              {filteredCharts.length > 0 ? (
                filteredCharts.map((chart, index) => (
                  <GridItem key={index}>
                    <Box
                      bg="white"
                      borderRadius="md"
                      boxShadow="md"
                      p={6}
                      minH="300px"
                      transition="transform 0.3s ease"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      <Heading as="h3" size="md" mb={4}>
                        {chart.name}
                      </Heading>
                      {chart.component}
                    </Box>
                  </GridItem>
                ))
              ) : (
                <GridItem colSpan={2}>
                  <Box textAlign="center" p={10} bg="white" borderRadius="md" boxShadow="md">
                    <Text fontSize="lg">
                      No charts found for <strong>"{searchTerm}"</strong>.
                    </Text>
                  </Box>
                </GridItem>
              )}
            </Grid>
          </VStack>
        </Container>
      </CubeProvider>
    </ChakraProvider>
  );
};

export default App;
