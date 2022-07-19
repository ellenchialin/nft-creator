import { useRef } from 'react';
// prettier-ignore
import { FormControl, FormLabel, Box, Flex, Image, Text, Button, IconButton, Input, VisuallyHidden } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const FileUpload = ({ fileUrl, setFile }) => {
  const fileInputRef = useRef();

  const handleDeleteMedia = () => {
    setFile('');
  };

  const handleUpload = (uploadedFile, callback) => {
    const fileSize = uploadedFile.size;
    if (fileSize > 1024 ** 2 * 30) {
      alert('File size is over 30 MB. Please try again.');
    } else {
      callback(uploadedFile);
    }
  };

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        Upload file
      </FormLabel>
      <Flex
        mt={1}
        justify="center"
        px={6}
        pt={5}
        pb={6}
        rounded="md"
        backgroundColor="#2B3954"
      >
        {fileUrl !== '' ? (
          <Box position="relative">
            <IconButton
              aria-label="Delete media"
              icon={<CloseIcon color="#BEC3CD" />}
              variant="unstyled"
              position="absolute"
              right="2"
              top="2"
              onClick={handleDeleteMedia}
            />
            <Image rounded="md" fit="cover" src={fileUrl} alt="media preview" />
          </Box>
        ) : (
          <Flex
            fontSize="sm"
            direction="column"
            justify="center"
            align="center"
            gap="12px"
          >
            <Text fontSize="14px" color="#617293">
              Item may be JPG, PNG, GIF, MP4, MP3 or GLB. Max 30 MB.
            </Text>

            <Button
              fontWeight="bold"
              color="#BEC3CD"
              backgroundColor="#475571"
              _hover={{ color: '#475571', backgroundColor: '#BEC3CD' }}
              onClick={() => fileInputRef.current.click()}
            >
              Browse files
            </Button>
            <VisuallyHidden>
              <Input
                ref={fileInputRef}
                id="media"
                name="media"
                type="file"
                onChange={e => handleUpload(e.target.files[0], setFile)}
                isRequired
              />
            </VisuallyHidden>
          </Flex>
        )}
      </Flex>
    </FormControl>
  );
};

export default FileUpload;
