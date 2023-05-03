import styled from "styled-components";
import { Column } from "../../components/element";
import { useState } from "react";
import Button from "../../components/element/button";
import {
  Asset,
  Keypair,
  Memo,
  Networks,
  Operation,
  TransactionBuilder,
  Server,
} from "stellar-sdk";
import { useAlert } from "react-alert";

const SendGc = () => {
  const alert = useAlert();

  const [sendinfo, setSendInfo] = useState({
    secretKey: "SACPZ2QJQQ3YFLF7WDLPN7FTHYJTQMA3EU4MNEOKBPWCH7X42P6V6DXV",
    serial: "",
    sendaddress: "",
  });
  const getSendInfo = (e) => {
    setSendInfo({ ...sendinfo, [e.target.name]: e.target.value });
  };

  const server = new Server("https://horizon-testnet.stellar.org");

  const mine = async () => {
    const sourceKeypair = Keypair.fromSecret(sendinfo?.secretKey);
    const sourcePublicKey = sourceKeypair.publicKey();
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: sendinfo?.sendaddress,
          asset: Asset.native(),
          amount: "1",
        })
      )
      .setTimeout(240)
      .addMemo(Memo.hash(sendinfo?.serial))
      .build();

    transaction.sign(sourceKeypair);
    try {
      const transactionResult = await server.submitTransaction(transaction);
      alert.success("Success");
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
    <Wrapper>
      <Dashboard>
        <Title>Send GC (pay someone) </Title>
        <>Serial Number</>
        <ConnectInput name="serial" onChange={getSendInfo} />
        <>Recipient account </>
        <ConnectInput name="sendaddress" onChange={getSendInfo} />
        <>Your private key</>
        <ConnectInput name="secretKey" onChange={getSendInfo} />
        <Button onClick={mine}>Send</Button>
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
