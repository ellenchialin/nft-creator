import { useState } from 'react';
import {
  Flex,
  Button,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import ChainOptions from './ChainOptions';
import FileUpload from './FileUpload';
import FormInput from './FormInput';
import Attributes from './Attributes';
import Royalties from './Royalties';
import Preview from './Preview';

const Form = () => {
  const [walletChainId, setWalletChainId] = useState(null);
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [attributes, setAttributes] = useState([]);

  return (
    <Flex w="full" justify="space-between" mt="53px">
      <Flex w="600px" direction="column" gap="40px">
        <ChainOptions chainId={walletChainId} />
        <FileUpload />
        <FormInput
          label="Name"
          placeHolder="e.g. “Ready? Go!”"
          name="name"
          value={name}
          setValue={setName}
        />
        <FormControl>
          <FormLabel
            as="legend"
            fontSize="14px"
            fontWeight="bold"
            color="#FAFAFA"
          >
            Description
          </FormLabel>
          <Textarea
            type="text"
            name="description"
            placeHolder="e.g. “First NFT of Party Animals series”"
            backgroundColor="#2B3954"
            color="white"
            border="none"
            py="14px"
            px="16px"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
        <FormInput
          label="Series name (optional)"
          placeHolder="e.g. “Party Animals”"
          name="seriesName"
          value={seriesName}
          setValue={setSeriesName}
        />
        <Attributes label="Attributes (optional)" />
        <Royalties label="Royalties" />
        <Button
          w="98px"
          p="22px"
          backgroundColor="#3C53A4"
          color="#D6D9E5"
          _hover={{ backgroundColor: '#D6D9E5', color: '#3C53A4' }}
        >
          Create
        </Button>
      </Flex>

      <Preview image={file} name={name} />
    </Flex>
  );
};

export default Form;
