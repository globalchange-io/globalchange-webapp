import styled from "styled-components";
import { Column, Row } from "../../components/element";
import Mygc from "../../components/mygc";
import Map from "../../components/map";
import FeedIndex from "../../components/Feed";
import { useState } from "react";

const SmartWallet = () => {
  const [inputInfo, setInputInfo] = useState({
    checkbill: "",
    accountKey: "GDH3J2SBCKF6KN2IPXQYIZZFF3W4EEIWD57DEJQDQ4YXRT3JHW66HWXL",
    oldnonprofit: "",
    newnonprofit: "",
    secretKey: "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG",
    newnonprofitname: "",
  });

  return (
    <Wrapper>
      <Title>My SmartWallet</Title>
      <TextContainer2>
        {inputInfo.accountKey ? (
          <>
            Total face value: 5421.55 GC <span>Public Nickname: Alamgi43</span>
          </>
        ) : (
          <>
            No account linked{" "}
            <span>
              Enter Stellar Lumens account no. at the top of this page{" "}
            </span>
          </>
        )}
      </TextContainer2>
      {inputInfo.accountKey && (
        <>
          <Title>My GC</Title>
          <MygcWrapper>
            <Mygc title="Spendable" text="Face value balance: 850.55 GC" />
            <Line />
            <Mygc
              title="Vault(collection)"
              text="Face value balance: 4500 GC"
            />
            <Line />
            <Mygc title="My Auctions" text="Face value balance: 71 GC" />
          </MygcWrapper>
          <Title>My Map</Title>
          <Map />
          <Title>My Feed</Title>
          <FeedIndex />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  width: 100%;
  gap: 20px;
  max-width: 1000px;
  font-weight: 500;
  font-size: 18px;
  border-bottom: 1px solid black;
  padding-bottom: 30px;
`;
const Title = styled.div`
  margin: auto;
  font-weight: bold;
  font-size: 24px;
`;
const TextContainer2 = styled(Column)`
  gap: 10px;
  height: 100px;
`;
const MygcWrapper = styled(Row)`
  gap: 20px;
  width: 100%;
  margin: auto;
`;
const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: black;
`;
export default SmartWallet;
