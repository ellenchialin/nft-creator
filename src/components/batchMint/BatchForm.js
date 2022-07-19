import { useState } from 'react';
// prettier-ignore
import { Flex, TableContainer, Table, Thead, Th, Tbody, Tr, Td, Button, ButtonGroup, Text, Image, Box, Code } from '@chakra-ui/react';
import Papa from 'papaparse';

import BatchUpload from './BatchUpload';

const TABLE_HEADERS = [
  'image',
  'animation url',
  'name',
  'description',
  'properties',
  'external url',
  'background color',
];

const BatchForm = () => {
  // const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  const handleChange = e => {
    Papa.parse(e.target.files[0], {
      header: true,
      complete: results => {
        const formattedData = results.data.map(item => {
          const {
            image,
            animation_url,
            name,
            description,
            external_url,
            background_color,
            ...properties
          } = item;
          const imageIPFSHash = image.slice(7);
          const animationIPFSHash = animation_url.slice(7);
          const formattedProperties = JSON.stringify(properties)
            .slice(1, -1)
            .split(',')
            .join('\n');

          return {
            image: `https://minter.mypinata.cloud/ipfs/${imageIPFSHash}`,
            animation_url: `https://minter.mypinata.cloud/ipfs/${animationIPFSHash}`,
            name,
            description,
            properties: `{\n${formattedProperties}\n}`,
            external_url,
            background_color,
          };
        });
        console.log('formattedData: ', formattedData);
        setPreviewData(formattedData);

        setParsedData(results.data);
        console.log('results: ', results.data);
      },
    });
  };

  const handleReset = () => setParsedData([]);

  return (
    <Flex direction="column">
      {parsedData.length > 0 ? (
        <Flex direction="column" gap="4">
          <TableContainer>
            <Table variant="simple" color="#FAFAFA">
              <Thead>
                <Tr>
                  {TABLE_HEADERS.map(header => (
                    <Th key={header} color="#FAFAFA">
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {previewData.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Image
                        w="24"
                        h="24"
                        src={item.image}
                        objectFit="contain"
                      />
                    </Td>
                    <Td>
                      <Box
                        as="video"
                        w="24"
                        h="24"
                        src={item.animation_url}
                        autoPlay
                        loop
                        playsInline
                      />
                    </Td>
                    <Td>
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="pre-wrap"
                      >
                        {item.name}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="pre-wrap"
                        noOfLines={6}
                      >
                        {item.description}
                      </Text>
                    </Td>
                    <Td>
                      <Code
                        children={`${item.properties}`}
                        whiteSpace="pre"
                        p="2"
                      />
                    </Td>
                    <Td>
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="pre-wrap"
                        noOfLines={2}
                      >
                        {item.external_url}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="pre-wrap"
                        noOfLines={2}
                      >
                        {item.background_color}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ButtonGroup alignSelf="flex-end">
            <Button onClick={handleReset}>Reset</Button>
            <Button colorScheme="linkedin">Upload</Button>
          </ButtonGroup>
        </Flex>
      ) : (
        <BatchUpload handleChange={e => handleChange(e)} />
      )}
    </Flex>
  );
};

export default BatchForm;
