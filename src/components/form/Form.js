import { useState } from 'react';
import {
  Flex,
  Button,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ethers } from 'ethers';

import ChainOptions from './ChainOptions';
import FileUpload from './FileUpload';
import FormInput from './FormInput';
import Attributes from './Attributes';
import Royalties from './Royalties';
import Preview from './Preview';
import NFTcreator from '../../utils/NFTcreator.json';

const CONTRACT_ADDRESS = '0x72f1915e2Be8D2CbF1f2C19A3806EEa77fe6F8ef';

const Form = () => {
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [attributes, setAttributes] = useState([]);

  const handleCreate = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          NFTcreator.abi,
          signer
        );

        console.log('connectedContract: ', connectedContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w="full" justify="space-between" mt="53px">
      <Flex w="600px" direction="column" gap="40px">
        <ChainOptions />
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
            placeholder="e.g. “First NFT of Party Animals series”"
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
          onClick={handleCreate}
        >
          Create
        </Button>
      </Flex>

      <Preview image={file} name={name} />
    </Flex>
  );
};

export default Form;
