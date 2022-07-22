import { useState } from 'react';
import axios from 'axios';

const FolderUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  // console.log('selectedFile: ', selectedFile);

  const changeHandler = event => {
    setSelectedFile(event.target.files);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    Array.from(selectedFile).forEach(file => {
      formData.append('file', file);
    });

    const metadata = JSON.stringify({
      name: 'Folder name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append('pinataOptions', options);

    console.log('formData from folder upload: ', [...formData.entries()]);

    // try {
    //   const res = await axios.post(
    //     'https://api.pinata.cloud/pinning/pinFileToIPFS',
    //     formData,
    //     {
    //       maxBodyLength: 'Infinity',
    //       headers: {
    //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    //         Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    //       },
    //     }
    //   );
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <label className="form-label">choose Folder</label>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default FolderUpload;
