import axios from 'axios';
import { useState, useEffect } from 'react';
// prettier-ignore
import { Flex, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { ethers } from 'ethers';

import ChainOptions from './ChainOptions';
import FileUpload from './FileUpload';
import FormInput from './FormInput';
import Attributes from './Attributes';
import Royalties from './Royalties';
import Preview from './Preview';
import NFTcreator from '../../utils/NFTcreator.json';

const CONTRACT_ADDRESS = '0x72f1915e2Be8D2CbF1f2C19A3806EEa77fe6F8ef';
const PIN_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PIN_JSON_URL = 'https://api.pinata.cloud/pinning/pinJsonToIPFS';

const Form = ({ currentAccount, currentChainId }) => {
  const [file, setFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendFileToIPFS = async () => {
    try {
      if (file !== '') {
        console.log('sending file to pinata...');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        console.log('formData :', formData.get('file'));

        const resFile = await axios.post(PIN_FILE_URL, formData, {
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('resFile: ', resFile.data);

        const fileHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log('fileHash: ', fileHash);

        sendJSONtoIPFS(fileHash);
      }
    } catch (error) {
      console.log('Error sending File to IPFS: ');
      console.log(error);
      setIsLoading(false);
    }
  };

  const sendJSONtoIPFS = async ipfsHash => {
    try {
      const jsonData = JSON.stringify({
        name: name,
        description: description,
        image: ipfsHash,
      });

      console.log('jsonData: ', jsonData);
      console.log('ready to send JSON to pinata...');

      const resJSON = await axios.post(PIN_JSON_URL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.REACT_APP_PINATA_JWT,
        },
      });

      console.log('final: ', `ipfs://${resJSON.data.IpfsHash}`);

      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
      console.log('Token URI: ', tokenURI);

      createNFT(tokenURI);
    } catch (error) {
      console.log('Error sending JSON to IPFS: ');
      console.log(error);
      setIsLoading(false);
    }
  };

  const createNFT = async tokenURI => {
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

        // call contract function
        console.log('Going to pop wallet now to pay gas...');
        let nftTxn = await connectedContract.mintByAmount(1, [`${tokenURI}`]);

        await nftTxn;
        alert(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setIsLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error while creating NFT with contract');
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;

    setFileUrl('');
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = e => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileUrl(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Flex w="full" justify="space-between" mt="53px">
      <Flex w="600px" direction="column" gap="40px">
        <ChainOptions currentChainId={currentChainId} />
        <FileUpload fileUrl={fileUrl} setFile={setFile} />
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
        <Royalties label="Royalties (optional)" />
        <Button
          w="98px"
          p="22px"
          backgroundColor="#3C53A4"
          color="#D6D9E5"
          _hover={{ backgroundColor: '#D6D9E5', color: '#3C53A4' }}
          onClick={sendFileToIPFS}
          isLoading={isLoading}
        >
          Create
        </Button>
      </Flex>

      <Preview currentAccount={currentAccount} fileUrl={fileUrl} name={name} />
    </Flex>
  );
};

export default Form;
