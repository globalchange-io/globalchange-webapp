import { Input } from "@nextui-org/react";
import { useState } from "react";
import Button from "../../components/element/button";
import { Column, DefaultImage, Row } from "../../components/element";
import styled from "styled-components";
import { artOutCome, ImageCheck, ScarcityLevel } from "../../utills";
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
  const [allValues, setAllValues] = useState({
    title: "miniin",
    by: "marcage",
    born: "2022.12.16",
    forwhat: "nonprofit",
  });
  const [bill, setBill] = useState(
    "3fefa61141485441f3e65069bebf814b4e8449a89d8b1244a73bdbd42037d18a"
  );
  const [allinfo, setAllInfo] = useState();
  const [alldata, setAllData] = useState();
  const [scarcitylevelvalue, setScarcityLevel] = useState();
  const [artList, setArtList] = useState();
  const handleClick = async () => {
    const res = await artOutCome(bill);
    let artOutComeNumber = [];
    let artOutComeLevel = [];
    console.log(res, "res data");
    const scarcity = ScarcityLevel(res.memoname, res.numbersOnly);
    setScarcityLevel(scarcity);
    console.log(scarcity, "scarcity");
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
      ArtImage(artOutComeNumber, artOutComeLevel).then((res) => {
        setArtList(res[0].artlistdata[0]);
        setAllData(res[0].alldata[0]);
        console.log(
          res,
          "image url array... if app didn't find url, in modal it output question mark image with some info. "
        );
      });
    }
  };
  console.log(alldata, "alldata");
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
      <div>Bill's Serial Number : {bill}</div>
      <div>Account that minted bill : {allinfo?.account}</div>
      <div>Bill's memo : {allinfo?.allmemo}</div>
      <div>Bill's denomination : {allinfo?.memoname}</div>
      <div>
        Tx hash of Ore from bill's mining transaction: {allinfo?.account}
      </div>
      <div>Bill's sequence number: {allinfo?.sequence}</div>
      <div>Bill's ledger #: {allinfo?.redger}</div>
      <div>Bill's ledger's hash: {allinfo?.redgerhash}</div>
      <div>Bill's ArtSeed: {allinfo?.billartseed}</div>
      <div>ArtOutcome: {allinfo?.numbersOnly}</div>
      <div>Bill's Scarcity Level: {scarcitylevelvalue}</div>
      {columns &&
        columns.map((item, key) => (
          <>
            <div key={key}>
              {item.label}: {item.address}
            </div>
          </>
        ))}
      <>
        Artlist:
        {artList &&
          artList.map((item, key) => <div key={key}>{item.memo}</div>)}
      </>
      <div> jpg: {alldata && alldata.jpgfile}</div>
      <div> artistname: {alldata && alldata.artistname}</div>
      text: {alldata && alldata.text}
      <ImageContainer
        memoname={allinfo?.memoname.replace(/[a-z]/gi, "")}
        level="1"
      >
        <ImageWrapper>
          <Row>{allinfo?.bill}</Row>
          <ImageGroup2>
            <DefaultImage
              src={
                scarcitylevelvalue > 0
                  ? alldata?.jpgfile
                  : ImageCheck(
                      allinfo?.memoname.replace(/[a-z]/gi, ""),
                      scarcitylevelvalue
                    )
              }
            />
            <DetailWrapper>
              <TokenEditor>
                <Text>Title</Text>
                <Text>{allValues?.title}</Text>
              </TokenEditor>
              <TokenEditor>
                <Text>By</Text>
                <Text>{allValues?.by}</Text>
              </TokenEditor>
              <TokenEditor>
                <Text>Born</Text>
                <Text>{allValues?.born}</Text>
              </TokenEditor>
              <TokenEditor>
                <Text>For</Text>
                <Text>{allValues?.forwhat}</Text>
              </TokenEditor>
            </DetailWrapper>
          </ImageGroup2>
          <>{allinfo?.bill}</>
        </ImageWrapper>
      </ImageContainer>
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  width: 100%;
  gap: 10px;
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
