import { Input, Button, Row } from "@nextui-org/react";
import { useState } from "react";
import styled from "styled-components";
import { Column } from "../../components/element";
import axios from "axios";
import { addressdata } from "../../components/data/addressdata";
import SelectBox from "../../components/select";
import DatePicker from "react-datepicker";
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Memo,
} from "stellar-sdk";

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
    console.log(allinfo, "ASd");
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
  const [allinfosend, setAllInfoSend] = useState({
    jsonurl: "",
    level: "",
    key: "",
  });
  const [startDate, setStartDate] = useState(new Date("1993-03-03"));
  const [hash, setHash] = useState();
  const sourceKeypair = Keypair.fromSecret(
    "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG"
  );
  const sourcePublicKey = sourceKeypair.publicKey();
  const server = new Server("https://horizon.stellar.org");

  const [nonprofit, setNonprofit] = useState([]);

  const [nonprofitDetail, setNonprofitDetail] = useState(addressdata);
  const handleChange2 = (e) => {
    setAllInfoSend({ ...allinfosend, [e.target.name]: e.target.value });
  };
  const Submit = async (e) => {
    console.log(
      nonprofit[0]?.address,
      "nonprofit",
      (50 + +allinfo?.level) / Math.pow(10, 7),
      "level",
      allinfo?.jsonurl
    );

    const date = Math.floor(new Date(startDate) / 1000) + 300;
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.PUBLIC,
      timebounds: {
        minTime: date,
        maxTime: "0",
      },
    })
      .addOperation(
        Operation.payment({
          destination: nonprofit[0]?.address,
          asset: Asset.native(),
          amount: ((50 + +allinfo?.level) / Math.pow(10, 7)).toString(),
        })
      )
      .setTimeout(30)
      .addMemo(Memo.text(allinfo?.jsonurl))
      .build();

    transaction.sign(sourceKeypair);

    try {
      const transactionResult = await server.submitTransaction(transaction);
      console.log(transactionResult, "transactionResult");
      setHash(transactionResult.hash);
      return {
        transactionId: transactionResult.id,
        transactionSequence: transactionResult.source_account_sequence,
        transactionLink: transactionResult._links.transaction.href,
      };
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Wrapper>
        <Input
          clearable
          label="Enter Name of Artist"
          fullWidth
          name="artistname"
          onChange={handleChange}
        />
        <Input
          clearable
          label="Enter Title of Art"
          fullWidth
          name="title"
          onChange={handleChange}
        />
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
      <Wrapper>
        <SelectBox
          nonprofitDetail={nonprofitDetail}
          setNonprofit={setNonprofit}
          nonprofit={nonprofit}
        />
        <Input
          clearable
          label="Enter URL of JSON file"
          fullWidth
          name="jsonurl"
          onChange={handleChange2}
        />
        <Input
          clearable
          label="Enter Scarcity level 1-12"
          fullWidth
          onChange={handleChange2}
          name="level"
        />
        <Input
          clearable
          fullWidth
          onChange={handleChange2}
          label="Enter your Stellar Lumens private key OR leave blank to connect wallet (sending art requires a SL transaction)"
          name="key"
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date("1993-03-03")}
          maxDate={new Date("1999-12-31")}
        />
        <Button color="primary" auto ghost onClick={Submit}>
          SendArt
        </Button>
        <Row>{hash && hash}</Row>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(Column)`
  gap: 10px;
  width: 100%;
`;

export default UploadIndex;
