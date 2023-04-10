import { Input } from "@nextui-org/react";
import { useState } from "react";
import Button from "../../components/element/button";
import { Column, DefaultImage, Row } from "../../components/element";
import styled from "styled-components";
import {
  artOutCome,
  getOperation,
  ImageCheck,
  ScarcityLevel,
} from "../../utills";
import ArtImage from "../../components/artimage";
import { CoinData } from "../../components/data/coindata";
import { addressdata } from "../../components/data/addressdata";

const Visualizer = () => {
  const [bill, setBill] = useState("");
  // 3fefa61141485441f3e65069bebf814b4e8449a89d8b1244a73bdbd42037d18a
  const [allinfo, setAllInfo] = useState();
  const [alldata, setAllData] = useState();
  const [operationData, setOperationData] = useState();
  const [scarcitylevelvalue, setScarcityLevel] = useState();
  const [artList, setArtList] = useState();
  const handleClick = async () => {
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
        addressdata.filter((address) => {
          if (res[0].artlistdata[0] === address.value) {
            setOperationData(address.name);
          }
        });
        setAllData(res[0].alldata[0]);
        console.log(
          res,
          "image url array... if app didn't find url, in modal it output question mark image with some info. "
        );
      });
    } else {
      const data = await getOperation(bill);
      console.log(data, "Datasa");
      let operationdata = [];
      data.map((item) => {
        addressdata.filter((address) => {
          if (item.account === address.value) {
            operationdata.push(address.name);
          }
        });
      });
      setOperationData(operationdata);
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
      {/* <div>
        Bill's Serial Number (new) :
        6b1bc7715a56d6b1b57c69613a85246f37daf3ed58a245d3634c3472087b0fe0
      </div> */}
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
          <div>
            Title of Art:
            {CoinData.map(
              (item, key) =>
                (item.value ?? item.name) ===
                  +allinfo?.memoname.replace(/[a-z]/gi, "") && (
                  <Row key={key}>{item.title}</Row>
                )
            )}
          </div>
          <ImageContainer
            memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
            level={99}
          >
            <ImageWrapper>
              <Row>{bill}</Row>
              <ImageGroup2>
                <DateContainer>
                  {new Date(allinfo?.created_at).getFullYear()}
                </DateContainer>
                <DefaultImage
                  src={ImageCheck(
                    allinfo?.memoname.replace(/[a-z]/gi, ""),
                    scarcitylevelvalue
                  )}
                />
                <DetailWrapper>
                  <TokenEditor>
                    {operationData?.map((item, key) => (
                      <Row key={key}>{item}</Row>
                    ))}
                  </TokenEditor>
                </DetailWrapper>
              </ImageGroup2>
              <Column>
                <Text>
                  {CoinData.map(
                    (item, key) =>
                      (item.value ?? item.name) ===
                        +allinfo?.memoname.replace(/[a-z]/gi, "") && (
                        <>{item.title}</>
                      )
                  )}
                </Text>
                <Text> {"Rian Firdaus"}</Text>
              </Column>
            </ImageWrapper>
          </ImageContainer>
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
          <ImageContainer
            memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
            level={99}
          >
            <ImageWrapper>
              <Row>{bill}</Row>
              <ImageGroup2>
                <DateContainer>
                  {new Date(allinfo?.created_at).getFullYear()}
                </DateContainer>
                <DefaultImage src={alldata?.jpgfile} />
                <DetailWrapper>
                  <TokenEditor>{operationData && operationData}</TokenEditor>
                </DetailWrapper>
              </ImageGroup2>
              <Column>
                <Text>{alldata?.title} &nbsp; </Text>
                <Text> {alldata?.artistname}&nbsp; </Text>
              </Column>
            </ImageWrapper>
          </ImageContainer>
          {/* <>
            Artlist:
            {artList &&
              artList.map((item, key) => (
                <Column key={key}>{item.data.memo}</Column>
              ))}
          </> */}
        </>
      )}
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
  justify-content: space-between;
  width: 100%;
  gap: 90px;
`;
const DetailWrapper = styled(Column)`
  gap: 5px;
  align-items: flex-start;
  max-width: 100px;
  width: 100%;
`;
const TokenEditor = styled(Column)`
  gap: 4px;
  font-size: 14px;
  color: #ffffff;
  align-items: flex-start;
`;
const ImageGroup2 = styled(Row)`
  gap: 90px;
  img {
    margin-left: 50px;
  }
`;

const Text = styled(Row)`
  font-size: 9px;
  color: white;
`;
const DateContainer = styled(Row)`
  font-size: 12px;
  color: white;
  margin-top: 110px;
  margin-left: 25px;
`;
export default Visualizer;
