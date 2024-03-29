import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import { Loading, Modal } from "@nextui-org/react";
import Button from "../../components/element/button";
import CardContent from "../../components/card";
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
import { arrayKill, artOutCome, ImageCheck, ScarcityLevel } from "../../utills";
import ArtImage from "../../components/artimage";
import { useAlert } from "react-alert";
import Analog from "../../components/analog";
import { Card1, Card2 } from "../../config/images";
import { CoinData } from "../../components/data/coindata";
import { addressdata } from "../../components/data/addressdata";
window.Buffer = Buffer;

const Pay = () => {
  const alert = useAlert();
  const [total, setTotal] = useState([]);
  const [xlmusd, setXlmusd] = useState(0.092011);
  const [nonprofit, setNonprofit] = useState([]);
  const [currentCPI, setCurrentCPI] = useState(0);
  const [totalGC, setTotalGC] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalXLM, setTotalXML] = useState(0);
  const [sendEachActual, setSendEachActual] = useState(0);
  const [level, setLevel] = useState();
  const [nonprofitDetail, setNonprofitDetail] = useState(addressdata);
  const [info, setInfo] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputInfo, setInputInfo] = useState({
    checkbill: "",
    accountKey: "GDH3J2SBCKF6KN2IPXQYIZZFF3W4EEIWD57DEJQDQ4YXRT3JHW66HWXL",
    newnonprofit: "",
    secretKey: "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG",
    newnonprofitname: "",
  });

  const [alldata, setAllData] = useState([]);
  const sourceKeypair = Keypair.fromSecret(inputInfo.secretKey);
  const sourcePublicKey = sourceKeypair.publicKey();
  const server = new Server("https://horizon.stellar.org");
  const getInfo = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value });
  };

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    getStellarPrice();
    let temp = 0;
    total.map((item) => (temp += item.value));
    setTotalGC(temp);
    setTotalUSD(temp * (currentCPI / 300));
    let tempxml = ((temp * (currentCPI / 300)) / xlmusd).toFixed(7);
    setTotalXML(tempxml);
    setSendEachActual((tempxml / 5).toFixed(7).toString());
  }, [currentCPI, total, totalGC, totalXLM, xlmusd]);

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("addressdata"));
    if (!!address) {
      setNonprofitDetail(address);
    }
  }, [localStorage.getItem("addressdata")]);

  const getStellarPrice = async () => {
    try {
      const res = await axios.get(
        "https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA.json?api_key=syF9WhdED8JYeRzP3UNz"
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

  const crease = (name, counter) => {
    arrayKill(total, name, "name");
    setTotal([...total, { name: name, value: counter }]);
  };

  const addNonprofit = () => {
    // arrayKill(nonprofitDetail, inputInfo.oldnonprofit, "name");
    let data = [
      ...nonprofitDetail,
      {
        name: inputInfo.newnonprofitname,
        value: inputInfo.newnonprofit,
      },
    ];
    localStorage.setItem("addressdata", JSON.stringify(data));
    setNonprofit(data);
  };

  const mine = async () => {
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = (await server.fetchBaseFee()) + 4900;
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.PUBLIC,
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
      .setTimeout(240)
      .addMemo(Memo.text("GlobalChange " + totalGC))
      .build();

    transaction.sign(sourceKeypair);
    try {
      const transactionResult = await server.submitTransaction(transaction);
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
    const fee = (await server.fetchBaseFee()) + 4900;
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.PUBLIC,
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
      .setTimeout(180)
      .addMemo(Memo.text(faceValueText + mineSequence))
      .build();
    transaction.sign(sourceKeypair);

    try {
      const transactionResult = await server.submitTransaction(transaction);
      return {
        transactionId: transactionResult.id,
        transactionSequence: transactionResult.source_account_sequence,
        transactionLink: transactionResult._links.transaction.href,
      };
    } catch (e) {
      console.log(e);
    }
  };
  const send = async () => {
    if (nonprofit.length < 5) {
      alert.error("Choose a nonprofit or Something repeats.");
    } else {
      handler();
      setLoading(true);
      const transaction = await mine();
      let mineSequence = transaction?.transactionSequence;
      const tempdata = [];
      if (mineSequence) {
        for (const key in total) {
          if (Object.hasOwnProperty.call(total, key)) {
            const element = total[key];
            for (let i = 0; i < element.value / element.name; i++) {
              let faceValueText = element.name + " GC ";
              const res = await mint(mineSequence, faceValueText);
              const data = await artOutCome(res.transactionId);
              tempdata.push(data);
            }
          }
        }
        let artOutComeNumber = [];
        let artOutComeLevel = [];
        tempdata.map((item) => {
          artOutComeNumber.push(item.numbersOnly);
          artOutComeLevel.push(ScarcityLevel(item.memoname, item.numbersOnly));
        });
        setInfo(tempdata);
        setLevel(artOutComeLevel);
        let flag = 0;
        ArtImage(artOutComeNumber, artOutComeLevel, flag).then((res) => {
          console.log(
            res,
            "image url array... if app didn't find url, in modal it output question mark image with some info. "
          );
          setAllData(res[0].alldata);
          setLoading(false);
        });
      }
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
          <Title>Mine and Mint New GC for yourself</Title>
          <Text>
            1. Select which GC you wish to mint. Bills are shown here in their
            generic form. In addition, each has some probability of receiving
            special edition art.
          </Text>
          <CardContainer style={{ alignItems: "flex-start" }}>
            <Col style={{ gap: "20px" }}>
              {CoinData.map((item, key) => (
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
                        nonprofitDetail={nonprofitDetail}
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
              <Text> Add CurrentCPI(Manual)</Text>
              <ConnectInput
                onChange={(e) => {
                  setCurrentCPI(e.target.value);
                }}
                value={currentCPI}
              />

              <Text>Enter new nonprofit name</Text>
              <ConnectInput
                onChange={getInfo}
                value={inputInfo.newnonprofitname}
                name="newnonprofitname"
              />
              <Text>Enter new nonprofit address</Text>
              <ConnectInput
                onChange={getInfo}
                value={inputInfo.newnonprofit}
                name="newnonprofit"
              />
              <Button onClick={addNonprofit}>Save</Button>
              <Text>
                3. Enter your Stellar Lumens account private key OR leave blank
                to connect wallet (Freighter)
              </Text>
              <ConnectInput
                value={inputInfo.secretKey}
                onChange={getInfo}
                name="secretKey"
              />
              <Button onClick={send}>Engage</Button>
            </Col2>
          </CardContainer>
        </Dashboard2>

        <Modal open={visible} onClose={closeHandler} width="800px">
          <Modal.Header
            css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
          />
          {loading && <Loading />}
          <Modal.Body>
            <Col>
              {info &&
                info.map((item, key) => (
                  <ImageContainer
                    memoname={item?.memoname.replace(/[a-z]/gi, "")}
                    level={99}
                  >
                    <ImageWrapper>
                      <Row>{item?.checkbill}</Row>
                      <ImageGroup2>
                        <DateContainer>
                          {new Date(item?.created_at).getFullYear()}
                        </DateContainer>
                        <DefaultImage
                          src={
                            alldata[key]?.jpgfile ??
                            ImageCheck(
                              item?.memoname.replace(/[a-z]/gi, ""),
                              level[key]
                            )
                          }
                        />
                        <DetailWrapper>
                          <TokenEditor>For Living Independence</TokenEditor>
                        </DetailWrapper>
                      </ImageGroup2>
                      <Column>
                        {level[key] === 0 ? (
                          <>
                            <Text2>
                              {CoinData.map(
                                (items, keys) =>
                                  (items.value ?? +items.name) ===
                                    +item?.memoname.replace(/[a-z]/gi, "") && (
                                    <Column key={keys}>{items.title}</Column>
                                  )
                              )}
                            </Text2>
                            <Text2> {"Rian Firdaus"}</Text2>
                          </>
                        ) : (
                          <>
                            <Text2>{alldata[key]?.title} &nbsp; </Text2>
                            <Text2> {alldata[key]?.artistname}&nbsp; </Text2>
                          </>
                        )}
                      </Column>
                    </ImageWrapper>
                  </ImageContainer>
                ))}
            </Col>
          </Modal.Body>
        </Modal>
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
  gap: 20px;
  width: 100%;
  padding: 10px;
  font-size: 12px;
  align-items: flex-start;
`;

const TextContainer = styled(Row)`
  gap: 10px;
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

const DateContainer = styled(Row)`
  font-size: 12px;
  color: white;
  margin-top: 110px;
  margin-left: 25px;
`;
const Text2 = styled(Row)`
  font-size: 9px;
  color: white;
`;
export default Pay;
