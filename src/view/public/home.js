import styled from "styled-components";
import { Column, DefaultImage, Row } from "../../components/element";
import Card1 from "../../assets/image/card1.png";
import Card2 from "../../assets/image/card2.png";
import Newgc from "../../assets/image/newGC.png";
import Button from "../../components/element/button";
import CardContent from "../../components/element/CardContent";
import SelectBox from "../../components/element/select";
const Home = () => {
  return (
    <Wrapper>
      <Dashboard>
        <TextColor>
          Welcome to the GlobalChange downloadable webapp. Transactions are
          between you, other users, and independent nonprofits on tbe Stellar
          Lumens blockchain. There is no central server. You can use this webapp
          to help send money to nonprofits and self-mint new GC bills based on
          your donations, including checking for NFT art that gets randomly
          attached to new bills. Anyone can verify if you minted the currency
          correctly.
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
          <ConnectInput />
          <Button>Connect Account</Button>
        </ConnectWrapper>
        <CardContainer>
          <Col>
            <span>Account Balances</span>
            <TextContainer>
              GC <div>no account connected</div>
            </TextContainer>
            <TextContainer>
              GC <div>no account connected</div>
            </TextContainer>
          </Col>
          <Col
            style={{
              background: "rgba(27, 94, 118, 0.21)",
            }}
          >
            <span>Current Cost of 1 GC</span>
            <TextContainer>
              USD <div>0.97</div>
            </TextContainer>
            <TextContainer>
              XLM <div>111.25</div>
            </TextContainer>
          </Col>
        </CardContainer>
      </Dashboard2>
      <Dashboard3>
        <Title>Send GC (pay someone) </Title> <ConnectInput />
        <>Amount to send</>
        <ConnectInput />
        <>GC</>
        <ConnectInput />{" "}
        <>
          Your Stellar Lumens account private key OR leave blank to connect
          wallet (Freighter)
        </>
        <Button>Send</Button>
      </Dashboard3>{" "}
      <Dashboard2>
        <Title>Mine and Mint New GC for yourself</Title>
        <Text>
          1. Select which GC you wish to mint. Bills are shown here in their
          generic form. In addition, each has some probability of receiving
          special edition art.
        </Text>
        <CardContainer>
          <Col>
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
          </Col>
          <Col style={{ fontSize: "12px", alignItems: "flex-start" }}>
            <Text>2. Select 5 nonprofits to receive XLM</Text>
            <TextContainer style={{ width: "100%" }}>
              <Col>
                <SelectBox label="Nonprofit" />
                <SelectBox label="Nonprofit" />
                <SelectBox label="Nonprofit" />
                <SelectBox label="Nonprofit" />
                <SelectBox label="Nonprofit" />
                <SelectBox label="Nonprofit" />
              </Col>
              <TextColor2>
                Option: you can enter alternate nonprofit addresses directly
                into the nonprofit list fields. You might want to do this only
                if you are confident others will accept this nonprofit as a
                valid recipient for GlobalChange mining.{" "}
              </TextColor2>
            </TextContainer>
            <DefaultImage src={Newgc} />
            <Text>3. Enter you connect wallet (Freighter)</Text>
          </Col>
        </CardContainer>
      </Dashboard2>
      <Dashboard2>
        <Title>My SmartWallet</Title>
        <TextContainer2>
          <>No account linked</>
          <span>Enter Stellar Lumens account no. at the top of this page </span>
        </TextContainer2>
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
          <ConnectInput />
        </ConnectWrapper>
        <Button>Check Bill</Button>
        <Title>Claim printed bill</Title>
        <TextContainer2>
          <>No account linked </>
          <span>Enter Stellar Lumens account no. at the top of this page</span>
        </TextContainer2>
      </Dashboard4>
    </Wrapper>
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
    padding: 0px;
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
  max-width: 200px;
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
const TextContainer = styled(Row)`
  gap: 10px;
`;
const TextContainer2 = styled(Col)`
  gap: 10px;
  height: 100px;
`;
export default Home;
