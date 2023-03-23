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
    let flag = 1;
    if (artOutComeLevel[0] !== 0) {
      ArtImage(artOutComeNumber, artOutComeLevel, flag).then((res) => {
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
          <div>Image :{alldata?.url ? alldata?.url : alldata?.jpgfile}</div>
          <div>Artist Name: {alldata?.artistname}</div>
          <div>Title of Art (from JSON) : {alldata?.title}</div>
        </>
      )}
      <>
        Artlist:
        {artList &&
          artList.map((item, key) => <div key={key}>{item.memo}</div>)}
      </>
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
export default Visualizer;
