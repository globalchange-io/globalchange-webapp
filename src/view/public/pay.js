import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import Card1 from "../../assets/image/card1.png";
import Card2 from "../../assets/image/card2.png";
import Card3 from "../../assets/image/card3.png";
import Card4 from "../../assets/image/card4.png";
import Card5 from "../../assets/image/card5.png";
import Card6 from "../../assets/image/card6.png";
import Card7 from "../../assets/image/card7.png";
import Card8 from "../../assets/image/card8.png";
import Card9 from "../../assets/image/card9.png";
import Card10 from "../../assets/image/card10.png";
import Card11 from "../../assets/image/card11.png";
import Card12 from "../../assets/image/card12.png";
import Card13 from "../../assets/image/card13.png";
import Card14 from "../../assets/image/card14.png";
import Button from "../../components/element/button";
import CardContent from "../../components/card";
import Mygc from "../../components/mygc";
import Map from "../../components/map";
import FeedIndex from "../../components/Feed";
import { useState, useEffect } from "react";
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Memo,
} from "stellar-sdk";
import axios from "axios";
import { Buffer } from "buffer";
import SelectBox from "../../components/select";
import { arrayKill } from "../../utills";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";
import { Public_Special } from "../../config";
import Test from "../../components/test";
import layerGifOnImage from "../../components/pic";
import { useAlert } from "react-alert";
import Analog from "../../components/analog";

window.Buffer = Buffer;

const Pay = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [accountKey, setAccountKey] = useState();
  const [total, setTotal] = useState([]);
  const [xlmusd, setXlmusd] = useState(0);
  const [nonprofit, setNonprofit] = useState([]);
  const [checkbill, setCheckBill] = useState();
  const [currentCPI, setCurrentCPI] = useState(0);
  const [totalGC, setTotalGC] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalXLM, setTotalXML] = useState(0);
  const [sendEachActual, setSendEachActual] = useState(0);

  const card = [
    { name: 1, src: Card1 },
    { name: 5, src: Card2 },
    { name: 10, src: Card3 },
    { name: 20, src: Card4 },
    { name: 50, src: Card5 },
    { name: 100, src: Card6 },
    { name: 1000, src: Card7 },
    { name: "100k", src: Card7, value: 100000 },
    { name: "1M", src: Card8, value: 1000000 },
    { name: "1B", src: Card9, value: 1000000000 },
    { name: 0.01, src: Card10 },
    { name: 0.05, src: Card11 },
    { name: 0.1, src: Card12 },
    { name: 0.25, src: Card13 },
    { name: 0.5, src: Card14 },
  ];

  let bills = [];
  // Test();
  useEffect(() => {
    getStellarPrice();
  }, []);

  const getStellarPrice = async () => {
    try {
      const res = await axios.get(
        "https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA.json?api_key=VMRa7XxgZUEpe-Ps8Eg7"
      );
      setCurrentCPI(res.data.dataset.data[0][1]);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=Stellar&vs_currencies=usd"
      );
      setXlmusd(response.data.stellar.usd);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let temp = 0;
    total.map((item) => {
      temp += item.value;
    });
    setTotalGC(temp);
    setTotalUSD(temp * (currentCPI / 300));
    let tempxml = ((temp * (currentCPI / 300)) / xlmusd).toFixed(7);
    setTotalXML(tempxml);
    setSendEachActual((tempxml / 5).toFixed(7).toString());
  }, [currentCPI, total, totalGC, totalXLM, xlmusd]);
  console.log(totalGC, "s");

  const crease = (name, counter) => {
    arrayKill(total, name, "name");
    setTotal([...total, { name: name, value: counter }]);
  };

  const send = async () => {
    if (nonprofit.length < 5) {
      alert.error("Choose a nonprofit or Something repeats.");
    } else {
      const transaction = await mine();
      let mineSequence = transaction.transactionSequence;
      console.log(mineSequence, "mine result");
      for (const key in total) {
        if (Object.hasOwnProperty.call(total, key)) {
          const element = total[key];
          for (let i = 0; i < element.value / element.name; i++) {
            let faceValueText = element.name + " GC ";
            await mint(mineSequence, faceValueText);
          }
        }
      }
    }
  };
  // layerGifOnImage(
  //   "https://docs.google.com/spreadsheets/d/1QS8MdrRxLpSd3LmnBCPkvEWqEag95M9KOdilO-hD2xw/edit#gid=588497558",
  //   Card1
  // );
  const secretKey = "SALITYGIHL23YOY5ARSPSATHF7Q7WL3AEOGXICQQUH6LTGE6TU6XI6BS";
  const sourceKeypair = Keypair.fromSecret(secretKey);
  const sourcePublicKey = sourceKeypair.publicKey();
  const server = new Server("https://horizon-testnet.stellar.org");

  const handleClick = async () => {
    server
      .transactions()
      .transaction(checkbill)
      .call()
      .then(async (res) => {
        const ledgerhash = res.ledger_attr;
        const memoname = res.memo.split(" ", 3);
        server
          .ledgers()
          .ledger(ledgerhash)
          .call()
          .then(function (resp) {
            const hash = sha256(res.ledger_attr + resp.hash).toString();
            const numbersOnly = "." + hash.replace(/[a-z]/gi, "");
            alert(numbersOnly);

            navigate(Public_Special, {
              state: {
                numbersOnly: numbersOnly,
                checkbill: checkbill,
                memoname: memoname[0],
              },
            });
          })
          .catch(function (err) {
            console.error(err);
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const mine = async () => {
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    alert(totalUSD + "totalusd");
    alert(totalXLM + "totalXLM");
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: nonprofit[0]?.address,
          asset: Asset.native(),
          amount: sendEachActual,
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[1]?.address,
          asset: Asset.native(),
          amount: sendEachActual,
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[2]?.address,
          asset: Asset.native(),
          amount: sendEachActual,
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[3]?.address,
          asset: Asset.native(),
          amount: sendEachActual,
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[4]?.address,
          asset: Asset.native(),
          amount: sendEachActual,
        })
      )
      .setTimeout(30)
      .addMemo(Memo.text("GlobalChange " + totalGC))
      .build();

    transaction.sign(sourceKeypair);

    try {
      const transactionResult = await server.submitTransaction(transaction);
      console.log(JSON.stringify(transactionResult, null, 2));
      return {
        transactionId: transactionResult.id,
        transactionSequence: transactionResult.source_account_sequence,
        transactionLink: transactionResult._links.transaction.href,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const mint = async (mineSequence, faceValueText) => {
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: nonprofit[0]?.address,
          asset: Asset.native(),
          amount: "0.0000001",
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[1]?.address,
          asset: Asset.native(),
          amount: "0.0000001",
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[2]?.address,
          asset: Asset.native(),
          amount: "0.0000001",
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[3]?.address,
          asset: Asset.native(),
          amount: "0.0000001",
        })
      )
      .addOperation(
        Operation.payment({
          destination: nonprofit[4]?.address,
          asset: Asset.native(),
          amount: "0.0000001",
        })
      )
      .setTimeout(30)
      .addMemo(Memo.text(faceValueText + mineSequence))
      .build();
    transaction.sign(sourceKeypair);

    try {
      const transactionResult = await server.submitTransaction(transaction);
      console.log(JSON.stringify(transactionResult, null, 2));
      let ledgerHash = transactionResult.ledger;
      console.log("hello" + ledgerHash);

      bills.push({
        faceValueText: faceValueText,
        serialNumber: transactionResult.id,
        transactionLink: transactionResult._links.transaction.href,
        ledger: transactionResult.ledger,
      });

      console.log(transactionResult);

      console.log("face value: " + faceValueText);

      bills.forEach((item) => console.log(item, "bills"));

      return {
        transactionId: transactionResult.id,
        transactionSequence: transactionResult.source_account_sequence,
        transactionLink: transactionResult._links.transaction.href,
        bills,
      };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Wrapper>
        <Dashboard>
          <TextColor>
            Welcome to the GlobalChange downloadable webapp. Transactions are
            between you, other users, and independent nonprofits on tbe Stellar
            Lumens blockchain. There is no central server. You can use this
            webapp to help send money to nonprofits and self-mint new GC bills
            based on your donations, including checking for NFT art that gets
            randomly attached to new bills. Anyone can verify if you minted the
            currency correctly.
          </TextColor>
          <CardContainer>
            <ImageGroup>
              <DefaultImage src={Card1} />
              <>digital cash: “NFTs” with face values</>
            </ImageGroup>
            <ImageGroup>
              <DefaultImage src={Card2} />
              <>Get crypto by giving to charity</>
            </ImageGroup>
          </CardContainer>
        </Dashboard>
        <Dashboard2>
          <Title>
            Enter your Stellar Lumens account no. (if you don’t have one, go get
            one)
          </Title>
          <ConnectWrapper>
            <ConnectInput onChange={(e) => setAccountKey(e.target.value)} />
            <Button onClick={handleClick}>Connect Account</Button>
          </ConnectWrapper>
          <CardContainer>
            <Col>
              <span>Account Balances</span>
              <TextContainer>
                GC {accountKey ? <>5421</> : <>no account connected</>}
              </TextContainer>
              <TextContainer>
                GC {accountKey ? <>33.3314</> : <>no account connected</>}
              </TextContainer>
            </Col>
            <Col
              style={{
                background: "rgba(27, 94, 118, 0.21)",
              }}
            >
              <span>Current Cost of 1 GC</span>
              <TextContainer>
                USD <div>{(currentCPI / 300).toFixed(2)}</div>
              </TextContainer>
              <TextContainer>
                XLM <div>{((currentCPI / 300) * xlmusd).toFixed(3)} </div>
              </TextContainer>
            </Col>
          </CardContainer>
        </Dashboard2>
        <Dashboard3>
          <Title>Send GC (pay someone) </Title>
          <>Recipient account or GC nickname</>
          <ConnectInput />
          <>Amount to send</>
          <ConnectInput />
          <>
            Your Stellar Lumens account private key OR leave blank to connect
            wallet (Freighter)
          </>
          <ConnectInput />
          <Button>Send</Button>
        </Dashboard3>
        <Dashboard2>
          <Title>Mine and Mint New GC for yourself</Title>
          <Text>
            1. Select which GC you wish to mint. Bills are shown here in their
            generic form. In addition, each has some probability of receiving
            special edition art.
          </Text>
          <CardContainer style={{ alignItems: "flex-start" }}>
            <Col style={{ gap: "20px" }}>
              {card.map((item, key) => (
                <CardContent
                  name={item.name}
                  src={item.src}
                  value={item.value}
                  total={total}
                  key={key}
                  crease={crease}
                  setTotal={setTotal}
                />
              ))}
            </Col>

            <Col2>
              <Text>2. Select 5 nonprofits to receive XLM</Text>
              <Col>
                <TextContainer
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Col>
                    {[1, 2, 3, 4, 5].map((item, key) => (
                      <SelectBox
                        key={key}
                        nonprofit={nonprofit}
                        setNonprofit={setNonprofit}
                      />
                    ))}
                  </Col>
                  <TextColor2>
                    Option: you can enter alternate nonprofit addresses directly
                    into the nonprofit list fields. You might want to do this
                    only if you are confident others will accept this nonprofit
                    as a valid recipient for GlobalChange mining.{" "}
                  </TextColor2>
                </TextContainer>
                <Analog
                  totalGC={totalGC}
                  currentCPI={currentCPI}
                  totalUSD={totalUSD}
                  totalXLM={totalXLM}
                  sendEachActual={sendEachActual}
                  xlmusd={xlmusd}
                />
              </Col>
              <Text>Enter new nonprofit</Text>
              <ConnectInput /> <Button onClick={send}>Save</Button>
              <Text>
                3. Enter your Stellar Lumens account private key OR leave blank
                to connect wallet (Freighter)
              </Text>
              <ConnectInput /> <Button onClick={send}>Engage</Button>
            </Col2>
          </CardContainer>
        </Dashboard2>
        <Dashboard2>
          <Title>My SmartWallet</Title>
          <TextContainer2>
            {accountKey ? (
              <>
                Total face value: 5421.55 GC{" "}
                <span>Public Nickname: Alamgi43</span>
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
          {accountKey && (
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
        </Dashboard2>
        <Dashboard4>
          <Title>Check or claim printed bill</Title>
          <TextContainer2>
            <>Has someone given you a printed GlobalChange bill? </>
            <span>
              Confirm if it is currently valid and locked on the network; and
              enter its password to sweep it to your account.
            </span>
          </TextContainer2>
          <Text>Enter bill’s serial number to check its status</Text>
          <ConnectWrapper>
            <>SN</>
            <ConnectInput onChange={(e) => setCheckBill(e.target.value)} />
          </ConnectWrapper>
          <Button onClick={handleClick}>Check Bill</Button>
          <Title>Claim printed bill</Title>
          <TextContainer2>
            <>No account linked </>
            <span>
              Enter Stellar Lumens account no. at the top of this page
            </span>
          </TextContainer2>
        </Dashboard4>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(Column)`
  width: 100%;
  gap: 30px;
`;
const Dashboard = styled(Column)`
  gap: 20px;
  padding: 20px 50px;
  max-width: 1000px;
  border: 1px solid #000000;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media screen and (max-width: 1000px) {
    border: 0;
  }
`;
const Dashboard2 = styled(Column)`
  width: 100%;
  gap: 20px;
  max-width: 1000px;
  font-weight: 500;
  font-size: 18px;
  border-bottom: 1px solid black;
  padding-bottom: 30px;
`;
const Dashboard3 = styled(Dashboard2)`
  align-items: flex-start;
`;
const Dashboard4 = styled(Dashboard2)`
  border: 0;
  padding: 0px;
`;
const TextColor = styled.div`
  color: #1b5e76;
`;
const TextColor2 = styled.div`
  color: #ff4242;
  max-width: 350px;
  width: 100%;
`;

const Text = styled(Row)`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
`;

const Title = styled.div`
  margin: auto;
  font-weight: bold;
  font-size: 24px;
`;
const CardContainer = styled(Row)`
  justify-content: space-around;
  width: 100%;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;
  }
`;
const ImageGroup = styled(Column)`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  justify-content: space-around;
  text-align: center;
  gap: 10px;
`;
const ConnectWrapper = styled(Row)`
  gap: 20px;
  width: 100%;
`;
const ConnectInput = styled.input`
  max-width: 1000px;
  width: 100%;
  padding: 10px;
  background-color: #dcdfdf;
`;
const Col = styled(Column)`
  gap: 10px;
  width: 100%;
  padding: 10px;
`;
const Col2 = styled(Column)`
  gap: 10px;
  width: 100%;
  padding: 10px;
  font-size: 12px;
  align-items: flex-start;
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
const TextContainer = styled(Row)`
  gap: 10px;
`;
const TextContainer2 = styled(Col)`
  gap: 10px;
  height: 100px;
`;

export default Pay;
