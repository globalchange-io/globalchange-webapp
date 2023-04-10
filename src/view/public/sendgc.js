import styled from "styled-components";
import { Column, Row } from "../../components/element";
import { useState } from "react";
import Button from "../../components/element/button";

const SendGc = () => {
  const [sendinfo, setSendInfo] = useState({
    secretKey: "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG",
    serial: "",
    sendaddress: "",
  });
  const getSendInfo = (e) => {
    setSendInfo({ ...sendinfo, [e.target.name]: e.target.value });
  };
  return (
    <Wrapper>
      <Dashboard>
        <Title>Send GC (pay someone) </Title>
        <>Amount to send</>
        <ConnectInput name="serial" onChange={getSendInfo} />
        <>Recipient account </>
        <ConnectInput name="sendaddress" onChange={getSendInfo} />
        <>your private key</>
        <ConnectInput name="secretKey" onChange={getSendInfo} />
        <Button>Send</Button>
      </Dashboard>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  gap: 10px;
  width: 100%;
`;
const Title = styled.div`
  margin: auto;
  font-weight: bold;
  font-size: 24px;
`;
const Dashboard = styled(Column)`
  gap: 20px;
  font-weight: 500;
  font-size: 18px;
  padding-bottom: 30px;
  align-items: flex-start;
  max-width: 600px;
  width: 100%;
`;
const ConnectInput = styled.input`
  max-width: 1000px;
  width: 100%;
  padding: 10px;
  background-color: #dcdfdf;
`;

export default SendGc;
