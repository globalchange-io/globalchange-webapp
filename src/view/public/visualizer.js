import { Input } from "@nextui-org/react";
import { useState } from "react";
import Button from "../../components/element/button";
import { Column, Row } from "../../components/element";
import styled from "styled-components";
import { artOutCome, ScarcityLevel } from "../../utills";
import ArtImage from "../../components/artimage";

const Visualizer = () => {
  const columns = [
    {
      address: "GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK",
      label: "nonprofit1",
    },
    {
      address: "GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA",
      label: "nonprofit2",
    },
    {
      address: "GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP",
      label: "nonprofit3",
    },
    {
      address: "GB2OSOAYVKT5O3QTXJ6U3C6NYX2U5X3CSXDSACNQBWEEVGLCWYALO4TA",
      label: "nonprofit4",
    },
    {
      address: "GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI",
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
    ArtImage(artOutComeNumber, artOutComeLevel).then((res) => {
      setArtList(res[0].artlistdata[0]);
      setAllData(res[0].alldata[0]);
      console.log(
        res,
        "image url array... if app didn't find url, in modal it output question mark image with some info. "
      );
    });
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
export default Visualizer;
