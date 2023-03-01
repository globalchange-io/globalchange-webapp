import { Input, Button, Row } from "@nextui-org/react";
import { useState } from "react";
import styled from "styled-components";
import { Column } from "../../components/element";
import axios from "axios";

const UploadIndex = () => {
  const [allinfo, setAllInfo] = useState({
    artistname: "",
    title: "",
    jpgfile: "",
    videofile: "",
    resales: "",
    text: "",
  });
  const [url, setUrl] = useState();
  const handleChange = (e) => {
    setAllInfo({ ...allinfo, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    axios
      .post(url, allinfo, {
        headers: {
          contentType: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ODVkYjc1My1jM2UyLTQ2YTItYmVhMC1iMmUyNGI3MmRlY2MiLCJlbWFpbCI6InRha3VzLnN1cGVyZGV2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiOWI2MDAyMmE3NjgzNzhmNzdlNiIsInNjb3BlZEtleVNlY3JldCI6Ijc2YTA5YzU5YmFkMmViNDFlZTcxMTdkYzlkMDU4ZGQ0ZDUyMjlmYTQ0YzAwMTY3ZTE5YmZlOTUyMWM4YWYxNDYiLCJpYXQiOjE2Nzc1NTMyMTR9.W3uhoxCIFsjLFNVrGNJBhgbZlILFNVuHbOzd82Xyx0Y",
        },
      })
      .then(async (response) => {
        const pinataurl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        // const pinataurl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

        const url = `https://tinyurl.com/api-create.php?url=${pinataurl}`;
        const tinyresponse = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(tinyresponse, "tinyresponse");
        const data = await tinyresponse.text();
        setUrl(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Wrapper>
      <Input
        clearable
        label="Enter Name of Artist"
        fullWidth
        name="artistname"
      />
      <Input clearable label="Enter Title of Art" fullWidth name="title" />
      <Input
        clearable
        label="Ente URL of image to appear on bill (e.g. small .jpg, .gif, moving gif)"
        fullWidth
        onChange={handleChange}
        name="jpgfile"
      />
      <Input
        clearable
        fullWidth
        onChange={handleChange}
        label="Enter URL of full image or other media or file (e.g. .mov, .mp3, .exe)"
        name="videofile"
      />
      <Input
        clearable
        onChange={handleChange}
        label="Enter additional URL, text, message, etc."
        fullWidth
        name="text"
      />
      <Input
        clearable
        onChange={handleChange}
        fullWidth
        name="resales"
        label="Enter Stellar Lumens account number to receive % of future resales "
      />

      <Button color="primary" auto ghost onClick={handleClick}>
        Generate JSON
      </Button>
      <Row>{url && url}</Row>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  gap: 10px;
  width: 100%;
`;

export default UploadIndex;
