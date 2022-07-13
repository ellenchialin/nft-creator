import { useState, useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Flex,
  Image,
  Text,
  Button,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react';

const FileUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef();

  const handleUpload = (file, callback) => {
    const fileSize = file.size;
    if (fileSize > 1024 ** 2 * 30) {
      alert('File size is over 30 MB. Please try again.');
    } else {
      callback(file);
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
        {imageUrl !== '' ? (
          <Image rounded="md" fit="cover" src={imageUrl} alt="preview image" />
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
                onChange={e => handleUpload(e.target.files[0], setImageUrl)}
              />
            </VisuallyHidden>
          </Flex>
        )}
      </Flex>
    </FormControl>
  );
};

export default FileUpload;