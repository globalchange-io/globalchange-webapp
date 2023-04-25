import { Input } from "@nextui-org/react";
import { useState } from "react";
import Button from "../../components/element/button";
import { Column, DefaultImage, Row } from "../../components/element";
import styled from "styled-components";
import {
  artOutCome,
  getOperation,
  getTransactions,
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
    const data = await getTransactions(res?.account);
    const regex = /\d+$/;
    const match = res.allmemo.match(regex);
    let operationdata = [];
    const operation = data.filter(
      (item) => item.source_account_sequence === match[0]
    );
    ArtImage(artOutComeNumber, artOutComeLevel, res.flag).then((res) => {
      setAllData(res[0].alldata[0]);
      console.log(
        res,
        "image url array... if app didn't find url, in modal it output question mark image with some info. "
      );
    });
    const operationALL = await getOperation(operation[0].hash);
    operationALL.map((item) => {
      addressdata.filter((address) => {
        console.log(address);
        if (item.account === address.value) {
          operationdata.push(address.name);
        }
      });
    });
    setOperationData(operationdata);
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
      <Row>Account that minted bill : {allinfo?.account}</Row>
      <Row>Bill's memo : {allinfo?.allmemo}</Row>
      <Row>Bill's denomination : {allinfo?.memoname}</Row>
      <Row>Bill's sequence number: {allinfo?.sequence}</Row>
      <Row>Bill's ledger #: {allinfo?.redger}</Row>
      <Row>Bill's ledger's hash: {allinfo?.redgerhash}</Row>
      <Row>Bill's ArtSeed: {allinfo?.billartseed}</Row>
      <Row>ArtOutcome: {allinfo?.numbersOnly}</Row>
      <Row>Bill's Scarcity Level: {scarcitylevelvalue}</Row>
      {scarcitylevelvalue === 0 ? (
        <>
          Background Image :
          <DefaultImage
            src={ImageCheck(allinfo?.memoname.replace(/[a-z]/gi, ""), 1)}
          />
          <Row>Date :{allinfo?.created_at}</Row>
          <Row>Serial Number : {bill}</Row>
          <Row>
            Image :
            <DefaultImage
              src={ImageCheck(
                allinfo?.memoname.replace(/[a-z]/gi, ""),
                scarcitylevelvalue
              )}
            />
          </Row>
          Artist Name: Rian Firdaus
          <Row>
            Title of Art:
            {CoinData.map(
              (item, key) =>
                (item.value ?? item.name) ===
                  +allinfo?.memoname.replace(/[a-z]/gi, "") && (
                  <Row key={key}>{item.title}</Row>
                )
            )}
          </Row>
          <ImageContainer
            memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
            level={99}
          >
            <ImageWrapper>
              <BillWrapper>{bill}</BillWrapper>
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
              <ArtistWrapper>
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
              </ArtistWrapper>
            </ImageWrapper>
          </ImageContainer>
        </>
      ) : (
        <>
          <Row>
            Background Image :
            <DefaultImage
              src={ImageCheck(allinfo?.memoname.replace(/[a-z]/gi, ""), 1)}
            />
          </Row>
          <Row>Date :{allinfo?.created_at}</Row>
          <Row>Serial Number : {bill}</Row>
          <Row>Image :{alldata?.jpgfile}</Row>
          <Row>Artist Name: {alldata?.artistname}</Row>
          <Row>Title of Art (from JSON) : {alldata?.title}</Row>
          <ImageContainer
            memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
            level={99}
          >
            <ImageWrapper>
              <BillWrapper>{bill}</BillWrapper>
              <ImageGroup2>
                <DateContainer>
                  {new Date(allinfo?.created_at).getFullYear()}
                </DateContainer>
                <DefaultImage src={alldata?.jpgfile} />
                <DetailWrapper>
                  <TokenEditor>
                    {operationData?.map((item, key) => (
                      <Row key={key}>{item}</Row>
                    ))}
                  </TokenEditor>
                </DetailWrapper>
              </ImageGroup2>
              <ArtistWrapper>
                <Text>{alldata?.title} &nbsp; </Text>
                <Text> {alldata?.artistname}&nbsp; </Text>
              </ArtistWrapper>
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
  font-size: 14px;
  color: #ffffff;
  justify-content: center;
  width: 100%;
`;
const DetailWrapper = styled(Column)`
  align-items: flex-start;
  position: absolute;
  margin-left: 480px;
  width: 150px;
`;
const TokenEditor = styled(Column)`
  font-size: 16px;
  align-items: flex-end;
  text-align: end;
  color: white;
  gap: 10px;
`;
const ImageGroup2 = styled(Row)`
  position: relative;
  justify-content: center;
`;

const Text = styled(Row)`
  font-size: 11px;
`;
const DateContainer = styled(Row)`
  font-size: 17px;
  margin-top: 120px;
  margin-left: -450px;
  position: absolute;
`;
const BillWrapper = styled(Row)`
  position: absolute;
  margin-top: -340px;
`;
const ArtistWrapper = styled(Column)`
  position: absolute;
  margin-top: 335px;
`;
export default Visualizer;
