import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import { Modal } from "@nextui-org/react";
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
import {
  arrayKill,
  artOutCome,
  getTransactions,
  ImageCheck,
  ScarcityLevel,
} from "../../utills";
import { useNavigate } from "react-router-dom";
import { Public_Special } from "../../config";
import ArtImage from "../../components/artimage";
import { useAlert } from "react-alert";
import Analog from "../../components/analog";
import {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
  Card8,
  Card9,
  Card10,
  Card11,
  Card12,
  Card13,
  Card14,
} from "../../config/images";
import { Loading } from "@nextui-org/react";

window.Buffer = Buffer;

const Pay = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [xlmusd, setXlmusd] = useState(0.092011);
  const [nonprofit, setNonprofit] = useState([]);
  const [currentCPI, setCurrentCPI] = useState(0);
  const [totalGC, setTotalGC] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalXLM, setTotalXML] = useState(0);
  const [sendEachActual, setSendEachActual] = useState(0);
  const [level, setLevel] = useState();
  const [nonprofitDetail, setNonprofitDetail] = useState([
    { name: "none", value: "none" },
    {
      name: "Bali Food Bank",
      value: "GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK",
    },
    {
      name: "Heifer International",
      value: "GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA",
    },
    {
      name: "Crypto for the Homeless",
      value: "GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP",
    },
    {
      name: "Women Who Code",
      value: "GB2OSOAYVKT5O3QTXJ6U3C6NYX2U5X3CSXDSACNQBWEEVGLCWYALO4TA",
    },
    {
      name: "Aid for Ukraine",
      value: "GD7ZVRSGHETEYLB4XUVFVGFWJKNDHORHAY72HZVXYFINUNZSRVABKVSH",
    },
    {
      name: " University of San Francisco",
      value: "GAO63FGKTVLS43OBSL6THTNB2R4IQHZOFYKWTV5L6ZOHLTB4MRPBTQ3X",
    },
    {
      name: "Freedom of the Press Foundation",
      value: "GB5A3OA657UWF3BN7WU4XFFWT333HFP2KFK2OFAXPEL3BBGQ7QLRNASG",
    },
    {
      name: "Coin Center",
      value: "GBKCLZSQZQR5MM6WWL3CUJWX6QSE74XODUU34BBGT7SVD32BWJQIX7ER",
    },
    {
      name: "Global Emancipation Network",
      value: "GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI",
    },
    {
      name: "For Living Independence",
      value: "GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI",
    },
    {
      name: "EmpowerED Pathways",
      value: "GB6FL35A2476K7OQ5EIJCOHJNZECN6HTIJKQV5TZ5FSE5CXGYU2RD25L",
    },
    {
      name: "Fight for the Future Fund",
      value: "GCGNWKCJ3KHRLPM3TM6N7D3W5YKDJFL6A2YCXFXNMRTZ4Q66MEMZ6FI2",
    },
    {
      name: "Solar Dos Abraxis",
      value: "GDCQ5TKZXF7FSILKZNBN274RKZGVVDJ4G3NXAJLPIFUTXMEOQ4JODM5C",
    },
    {
      name: " Tor Project",
      value: "GABWGQEQESRX5TKDTPIYJFPKGJDMEW6VLOOLBTIFPJIN7XT6KAFXJQPJ",
    },
    {
      name: "Stellar.expert",
      value: "GDQ75AS5VSH3ZHZI3P4TAVAOOSNHN346KXJOPZVQMMS27KNCC5TOQEXP",
    },
  ]);
  const [info, setInfo] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputInfo, setInputInfo] = useState({
    checkbill: "",
    accountKey: "GDH3J2SBCKF6KN2IPXQYIZZFF3W4EEIWD57DEJQDQ4YXRT3JHW66HWXL",
    oldnonprofit: "",
    newnonprofit: "",
    secretKey: "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG",
    newnonprofitname: "",
  });
  const [sendinfo, setSendInfo] = useState({
    secretKey: "SBSJCNHNG7HSAKPP2K5Y2FGZXDLJMDWTVUTH3LKXB5TZUPWA2YTGORJG",
    memo: "",
    sendaddress: "",
  });
  const [allValues, setAllValues] = useState({
    title: "miniin",
    by: "marcage",
    born: "2022.12.16",
    forwhat: "nonprofit",
  });
  const [alldata, setAllData] = useState([]);
  const sourceKeypair = Keypair.fromSecret(inputInfo.secretKey);
  const sourcePublicKey = sourceKeypair.publicKey();
  console.log(sourcePublicKey);
  const server = new Server("https://horizon.stellar.org");
  const getInfo = (e) => {
    setInputInfo({ ...inputInfo, [e.target.name]: e.target.value });
  };
  const getSendInfo = (e) => {
    setSendInfo({ ...sendinfo, [e.target.name]: e.target.value });
  };
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

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

  const getStellarPrice = async () => {
    try {
      const res = await axios.get(
        "https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA.json?api_key=wnCn-hUnqgqwpjzEa9bM"
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

  const changeNonprofit = () => {
    arrayKill(nonprofitDetail, inputInfo.oldnonprofit, "name");
    setNonprofitDetail([
      ...nonprofitDetail,
      { address: inputInfo.newnonprofit, name: inputInfo.newnonprofitname },
    ]);
  };

  const handleClick = async () => {
    const data = await artOutCome(inputInfo.checkbill);
    navigate(Public_Special, {
      state: {
        data: data,
      },
    });
  };
  const connectClick = async (e) => {
    const res = await getTransactions(inputInfo.accountKey);
    console.log(res, "res");
    const regex = /^[\d.]+ GC \d+$/;
    const regex2 = /^[\d.]+GC \d+$/;

    const filterData = res.filter(
      (items) =>
        regex.test(items.memo) === true || regex2.test(items.memo) === true
    );
    console.log(filterData, "sd");
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
      console.log(transactionResult, "transactionResult");
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
      const transaction = await mine();
      console.log(transaction);
      let mineSequence = transaction?.transactionSequence;
      console.log(mineSequence, "mine result");
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
          console.log(item.memoname);
          artOutComeLevel.push(ScarcityLevel(item.memoname, item.numbersOnly));
        });
        setInfo(tempdata);

        setLevel(artOutComeLevel);
        handler();
        let flag = 0;
        ArtImage(artOutComeNumber, artOutComeLevel, flag).then((res) => {
          console.log(
            res,
            "image url array... if app didn't find url, in modal it output question mark image with some info. "
          );
          setAllData(res[0].alldata);
        });
      }
    }
  };

  const handleSend = async () => {};
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
          <CheckBill>
            <ConnectInput
              onChange={getInfo}
              name="accountKey"
              value={inputInfo.accountKey}
            />
            <Button onClick={(e) => connectClick()}>Connect Account</Button>
          </CheckBill>
          <CardContainer>
            <Col>
              <span>Account Balances</span>
              <TextContainer>
                GC
                {inputInfo.accountKey ? <>5421</> : <>no account connected</>}
              </TextContainer>
              <TextContainer>
                GC
                {inputInfo.accountKey ? (
                  <>33.3314</>
                ) : (
                  <>no account connected</>
                )}
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
                XLM <div>{((1 * (currentCPI / 300)) / xlmusd).toFixed(7)} </div>
              </TextContainer>
            </Col>
          </CardContainer>
        </Dashboard2>
        <Dashboard3>
          <Title>Send GC (pay someone) </Title>
          <>Recipient account or GC nickname</>
          <ConnectInput name="sendaddress" onChange={getSendInfo} />
          <>Amount to send</>
          <ConnectWrapper>
            <ConnectInput name="memo" onChange={getSendInfo} />
            <>GC</>
          </ConnectWrapper>
          <>
            Your Stellar Lumens account private key OR leave blank to connect
            wallet (Freighter)
          </>
          <ConnectInput name="secretKey" onChange={getSendInfo} />
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
              <Text> Old nonprofit name to replace</Text>
              <ConnectInput
                onChange={getInfo}
                value={inputInfo.oldnonprofit}
                name="oldnonprofit"
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
              <Button onClick={changeNonprofit}>Save</Button>
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
        <Dashboard2>
          <Title>My SmartWallet</Title>
          <TextContainer2>
            {inputInfo.accountKey ? (
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
        </Dashboard2>
        <Dashboard4>
          <Title>Check or claim printed bill</Title>
          <TextContainer2>
            <>Has someone given you a printed GlobalChange bill? </>
            <span>
              Comfirm if it is currently valid and locked on the network; and
              enter its password to sweep it to your account.
            </span>
          </TextContainer2>
          <Text>Enter bill’s serial number to check its status</Text>
          <CheckBill>
            <>SN</>
            <ConnectInput
              onChange={getInfo}
              value={inputInfo.checkbill}
              name="checkbill"
            />
          </CheckBill>
          <Button onClick={handleClick}>Check Bill</Button>
          <Title>Claim printed bill</Title>
          <TextContainer2>
            <>No account linked </>
            <span>
              Enter Stellar Lumens account no. at the top of this page
            </span>
          </TextContainer2>
        </Dashboard4>
        <Modal open={visible} onClose={closeHandler} width="800px">
          <Modal.Header
            css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
          ></Modal.Header>
          <Modal.Body>
            <Col>
              {info &&
                info.map((item, key) => (
                  <ImageContainer key={key} memoname={item?.memoname} level="1">
                    <ImageWrapper>
                      <Row>{item?.checkbill}</Row>
                      <ImageGroup2>
                        <DefaultImage
                          src={
                            alldata[key]?.jpgfile ??
                            ImageCheck(item?.memoname, level[key])
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
                      <>{item?.numbersOnly}</>
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
`;

const CheckBill = styled(Row)`
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
  gap: 20px;
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
const ImageContainer = styled(Row)`
  background-image: ${(props) =>
    `url(${ImageCheck(props.memoname, props.level)})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
  margin: 0px 50px;
  width: 100%;
  overflow-y: auto;
`;
const ImageWrapper = styled(Column)`
  font-size: 12px;
  color: #ffffff;
  height: 390px;
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
  gap: 80px;
  img {
    width: 100px;
    padding-left: 180px;
  }
`;
export default Pay;
