import { useState } from 'react';
// prettier-ignore
import { Flex, TableContainer, Table, Thead, Th, Tbody, Tr, Td, Button, ButtonGroup, Text, Image, Box, Code } from '@chakra-ui/react';
import Papa from 'papaparse';
import axios from 'axios';

import BatchUpload from './BatchUpload';
import FolderUpload from './FolderUpload';

const PIN_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

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
  const [parsedData, setParsedData] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  const generatePreviewData = data => {
    const formattedData = data.map(item => {
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

    setPreviewData(formattedData);
    setParsedData(data);
  };

  const handleChange = e => {
    Papa.parse(e.target.files[0], {
      header: true,
      complete: async results => {
        generatePreviewData(results.data);

        /* Convert csv to JSONs */
        const jsonFilesArray = results.data.map(item => {
          const {
            image,
            animation_url,
            name,
            description,
            external_url,
            background_color,
            ...attributes
          } = item;

          const formattedProperties = Object.keys(attributes).map(att => ({
            trait_type: att,
            value: attributes[att],
          }));

          const jsonFile = new File(
            [
              JSON.stringify({
                image,
                animation_url,
                name,
                description,
                attributes: formattedProperties,
                external_url,
                background_color,
              }),
            ],
            `${name}.json`,
            { type: 'application/json' }
          );

          return jsonFile;
        });
        console.log('JSON array: ', jsonFilesArray);

        const formData = new FormData();

        /* Append JSONs to the same key */
        for (let i = 0; i < jsonFilesArray.length; i++) {
          formData.append('file', jsonFilesArray[i]);
        }

        /* Set Pinata folder name */
        const metadata = JSON.stringify({
          name: 'Test with csv file',
        });
        formData.append('pinataMetadata', metadata);

        console.log('batchformData: ', [...formData.entries()]);

        try {
          console.log('sending to pinata...');

          const res = await axios.post(PIN_FILE_URL, formData, {
            maxBodyLength: 'Infinity',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            },
          });
          console.log('res: ', res.data);
        } catch (error) {
          console.log(error);
        }
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
                        w="30"
                        h="30"
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
        <>
          <BatchUpload handleChange={e => handleChange(e)} />
          {/* <FolderUpload /> */}
        </>
      )}
    </Flex>
  );
};

export default BatchForm;
