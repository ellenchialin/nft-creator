import axios from 'axios';
import { useState, useEffect } from 'react';
// prettier-ignore
import { Flex, Button, Textarea, FormControl, FormLabel, useDisclosure, useToast, Text, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

import FileUpload from './FileUpload';
import FormInput from './FormInput';
import AttributeGroup from './AttributeGroup';
import Royalties from './Royalties';
import Preview from './Preview';
import AlertModal from '../shared/AlertModal';
import NFTcreator from '../../utils/NFTcreator.json';

const CONTRACT_ADDRESS = '0x72f1915e2Be8D2CbF1f2C19A3806EEa77fe6F8ef';
const PIN_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PIN_JSON_URL = 'https://api.pinata.cloud/pinning/pinJsonToIPFS';

const Form = ({ currentAccount }) => {
  const [file, setFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [attributes, setAttributes] = useState([
    { id: uuidv4(), trait_type: '', value: '' },
  ]);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertBody, setAlertBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const sendFileToIPFS = async () => {
    try {
      if (currentAccount === '') {
        toast({
          description: 'Please connect to wallet first.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const requiredData = {
        name,
        description,
        file,
      };

      if (Object.values(requiredData).some(value => !value)) {
        setAlertHeader('Oops.');
        setAlertBody(
          'File, Name and Description are required. Please check before submit.'
        );
        onAlertOpen();
        return;
      }

      let hasDuplicates =
        attributes.map(att => att.trait_type).length >
        new Set(attributes.map(att => att.trait_type)).size
          ? true
          : false;

      if (attributes.length > 1 && hasDuplicates) {
        setAlertHeader('Oops.');
        setAlertBody(
          "Attribute's type name can not be the same. Please check before submit."
        );
        onAlertOpen();
        return;
      }

      console.log('sending file to pinata...');
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      console.log('formData :', formData.get('file'));

      const resFile = await axios.post(PIN_FILE_URL, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      });

      console.log('resFile: ', resFile.data);

      const fileHash = `ipfs://${resFile.data.IpfsHash}`;
      console.log('fileHash: ', fileHash);

      sendJSONtoIPFS(fileHash);
    } catch (error) {
      toast({
        description: 'Fail to submit. Please check network and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const checkAttributesIsEmpty = attributesArray => {
    return attributesArray.some(attObject =>
      Object.values(attObject).some(value => !value)
    );
  };

  const sendJSONtoIPFS = async ipfsHash => {
    try {
      const attributesOmittedId = attributes.map(({ id, ...rest }) => rest);

      const isAttributesEmpty = checkAttributesIsEmpty(attributes);

      const jsonData = isAttributesEmpty
        ? JSON.stringify({
            name: name.trim(),
            description: description.trim(),
            image: ipfsHash,
          })
        : JSON.stringify({
            name: name.trim(),
            description: description.trim(),
            image: ipfsHash,
            attributes: attributesOmittedId,
          });

      console.log('jsonData: ', jsonData);
      console.log('ready to send JSON to pinata...');

      const resJSON = await axios.post(PIN_JSON_URL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      });

      console.log(resJSON.data);

      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
      console.log('Token URI: ', tokenURI);

      createNFT(tokenURI);
    } catch (error) {
      toast({
        description: 'Fail to submit. Please check network and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
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

        setAlertHeader('Hooray ????');
        setAlertBody(
          <Text>
            See transaction at{' '}
            <Link
              href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}
              color="linkedin.600"
              isExternal
            >
              here
            </Link>
            .
          </Text>
        );
        onAlertOpen();

        // reset form
        setName('');
        setDescription('');
        setFile('');
        setAttributes([{ id: uuidv4(), trait_type: '', value: '' }]);
      } else {
        toast({
          description: 'Please connect to wallet first and try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        description: 'Fail to submit. Please check network and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
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
    <Flex w="full" justify="space-between">
      <Flex w="600px" direction="column" gap="40px">
        <FileUpload fileUrl={fileUrl} setFile={setFile} />
        <FormInput
          label="Name"
          placeHolder="e.g. ???Ready? Go!???"
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
            placeholder="e.g. ???First NFT of Party Animals series???"
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
          placeHolder="e.g. ???Party Animals???"
          name="seriesName"
          value={seriesName}
          setValue={setSeriesName}
        />
        <AttributeGroup
          label="Attributes (optional)"
          attributes={attributes}
          setAttributes={setAttributes}
        />
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

      <AlertModal
        isAlertOpen={isAlertOpen}
        onAlertClose={onAlertClose}
        header={alertHeader}
        body={alertBody}
      />
    </Flex>
  );
};

export default Form;
