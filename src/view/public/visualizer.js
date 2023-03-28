import { Input } from "@nextui-org/react";
import { useState } from "react";
import Button from "../../components/element/button";
import { Column, DefaultImage, Row } from "../../components/element";
import styled from "styled-components";
import {
  artOutCome,
  getOperation,
  ImageCheck,
  layerGifOnImage,
  ScarcityLevel,
} from "../../utills";
import ArtImage from "../../components/artimage";

const Visualizer = () => {
  const columns = [
    {
      address: "Bali Food Bank",
      label: "nonprofit1",
    },
    {
      address: "Heifer International",
      label: "nonprofit2",
    },
    {
      address: "Crypto for the Homeless",
      label: "nonprofit3",
    },
    {
      address: "Women Who Code",
      label: "nonprofit4",
    },
    {
      address: "Global Emancipation Network",
      label: "nonprofit5",
    },
  ];
  const [bill, setBill] = useState(
    "3fefa61141485441f3e65069bebf814b4e8449a89d8b1244a73bdbd42037d18a"
  );
  const [allinfo, setAllInfo] = useState();
  const [alldata, setAllData] = useState();
  const [scarcitylevelvalue, setScarcityLevel] = useState();
  const [artList, setArtList] = useState();
  const handleClick = async () => {
    getOperation(bill);
    const res = await artOutCome(bill);
    let artOutComeNumber = [];
    let artOutComeLevel = [];
    console.log(res, "res data");
    const scarcity = ScarcityLevel(res.memoname, res.numbersOnly);
    setScarcityLevel(scarcity);
    setAllInfo(res);
    artOutComeNumber.push(res.numbersOnly);
    artOutComeLevel.push(ScarcityLevel(res.memoname, res.numbersOnly));
    console.log(
      artOutComeLevel,
      "artOutComeLevel",
      "artOutComeNumber",
      artOutComeNumber
    );
    if (artOutComeLevel[0] !== 0) {
      ArtImage(artOutComeNumber, artOutComeLevel, res.flag).then((res) => {
        setArtList(res[0].artlistdata[0]);
        setAllData(res[0].alldata[0]);
        console.log(
          res,
          "image url array... if app didn't find url, in modal it output question mark image with some info. "
        );
      });
    }
  };
  return (
    <Wrapper>
      <BillInput>
        <Input
          clearable
          label="Enter bill serial number (Stellar Lumens mainnet)"
          fullWidth
          onChange={(e) => setBill(e.target.value)}
        />
        <Button onClick={handleClick}>See Bill</Button>
      </BillInput>
      <div>
        Bill's Serial Number (new) :
        6b1bc7715a56d6b1b57c69613a85246f37daf3ed58a245d3634c3472087b0fe0
      </div>
      <div>Account that minted bill : {allinfo?.account}</div>
      <div>Bill's memo : {allinfo?.allmemo}</div>
      <div>Bill's denomination : {allinfo?.memoname}</div>
      <div>Bill's sequence number: {allinfo?.sequence}</div>
      <div>Bill's ledger #: {allinfo?.redger}</div>
      <div>Bill's ledger's hash: {allinfo?.redgerhash}</div>
      <div>Bill's ArtSeed: {allinfo?.billartseed}</div>
      <div>ArtOutcome: {allinfo?.numbersOnly}</div>
      <div>Bill's Scarcity Level: {scarcitylevelvalue}</div>
      {scarcitylevelvalue === 0 ? (
        <>
          Background Image :
          <DefaultImage
            src={ImageCheck(allinfo?.memoname.replace(/[a-z]/gi, ""), 1)}
          />
          <div>Date :{allinfo?.created_at}</div>
          <div>Serial Number : {bill}</div>
          <div>
            Image :
            <DefaultImage
              src={ImageCheck(
                allinfo?.memoname.replace(/[a-z]/gi, ""),
                scarcitylevelvalue
              )}
            />
          </div>
          Artist Name: Rian Firdaus
          <div>Title of Art: depends on Denomination : {allinfo?.allmemo}</div>
          <div>
            {allinfo?.memoname} : {allinfo?.memoname}
          </div>
        </>
      ) : (
        <>
          <div>
            Background Image :
            <DefaultImage
              src={ImageCheck(allinfo?.memoname.replace(/[a-z]/gi, ""), 1)}
            />
          </div>
          <div>Date :{allinfo?.created_at}</div>
          <div>Serial Number : {bill}</div>
          <div>Image :{alldata?.jpgfile}</div>
          <div>Artist Name: {alldata?.artistname}</div>
          <div>Title of Art (from JSON) : {alldata?.title}</div>
        </>
      )}
      <>
        Artlist:
        {artList &&
          artList.map((item, key) => <div key={key}>{item.memo}</div>)}
      </>
      {console.log(allinfo, "s")}
      <ImageContainer
        memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
        level="1"
      >
        <ImageWrapper>
          <Row>{allinfo?.bill}</Row>
          <ImageGroup2>
            <DefaultImage src={alldata?.jpgfile} />
            <DetailWrapper>
              <TokenEditor>
                <Text>Title</Text>
                <Text>{alldata?.title}</Text>
              </TokenEditor>
              <TokenEditor>
                <Text>By</Text>
                <Text>{alldata?.artistname}</Text>
              </TokenEditor>
            </DetailWrapper>
          </ImageGroup2>
          <>{alldata?.bill}</>
        </ImageWrapper>
      </ImageContainer>
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  width: 100%;
  gap: 10px;
  align-items: flex-start;
  img {
    max-width: 200px;
    max-height: 100px;
  }
`;
const BillInput = styled(Row)`
  gap: 10px;
  width: 100%;
  align-items: flex-end;
`;
const ImageContainer = styled(Row)`
  background-image: ${(props) =>
    `url(${ImageCheck(props.memoname, props.level)})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
  width: 100%;
  overflow-y: auto;
`;
const ImageWrapper = styled(Column)`
  font-size: 12px;
  color: #ffffff;
  justify-content: space-around;
  width: 100%;
`;
const DetailWrapper = styled(Column)`
  gap: 5px;
  align-items: flex-start;
  max-width: 100px;
  width: 100%;
`;
const TokenEditor = styled(Row)`
  gap: 10px;
  div {
    font-size: 14px;
  }
`;
const ImageGroup2 = styled(Row)`
  gap: 100px;
  img {
    width: 150px;
    padding-left: 220px;
  }
`;
const Text = styled(Row)`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
`;
export default Visualizer;
