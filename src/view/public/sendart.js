import { Input, Button, Row } from "@nextui-org/react";
import { useState } from "react";
import styled from "styled-components";
import { Column } from "../../components/element";
import SelectBox from "../../components/select";
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Memo,
} from "stellar-sdk";
import DatePicker from "react-datepicker";

const SendArt = () => {
  const [allinfo, setAllInfo] = useState({
    jsonurl: "",
    level: "",
    key: "",
  });
  const [startDate, setStartDate] = useState(new Date("1990-01-01"));
  const [hash, setHash] = useState();
  const sourceKeypair = Keypair.fromSecret(
    "SC6ZB2VJTD2Y4GNW3R4WQEHGNF7ZBODHEYRVGXIFKJJU75WK7ADI64TU"
  );
  const sourcePublicKey = sourceKeypair.publicKey();
  const server = new Server("https://horizon-testnet.stellar.org");

  const [nonprofit, setNonprofit] = useState([]);

  const [nonprofitDetail, setNonprofitDetail] = useState([
    { name: "none", value: "none" },
    {
      name: "Bali Food Bank",
      value: "GBVKR2N54PESLPY57TJ6L4JHNMNBXI5SWRGRWEZV4LU73DC5DI26545A",
    },
    {
      name: "Heifer International",
      value: "GBSPK7XJDK3BB2HUO4DTANKWWVLTEKAK4NTTLVY56YYHIYQUFX5CJMAK",
    },
    {
      name: "Crypto for the Homeless",
      value: "GDWNMXOVH3GDYXFBD66U5OCHO33SUOSY37O6ZSZBCG33IZ7N6ZONZGFW",
    },
    {
      name: "Women Who Code",
      value: "GANLOWYTGSBJC6HK7PNWCYGTSPSXYQMJHKEK7B7FOTSU5HB2QWTJJBZW",
    },
    {
      name: "Aid for Ukraine",
      value: "GCTW6KJYUJRQVTKQDMWH4EBT33DMGO2ZNLUDQIPS4KSZ6UXQAT2DAFHU",
    },
    {
      name: " University of San Francisco",
      value: "GAPPHYCJJAY3XUYEVRUSVZYZVVTMQ2JNSRHQW2AVBAHZX3MD5QNMFABY",
    },
    {
      name: "Freedom of the Press Foundation",
      value: "GBLT2J3A2U3ELWIJNIAAJOF6JYOHNBDQK3QOVOYX35DXIIN2G6TJJZG7",
    },
    {
      name: "Coin Center",
      value: "GCO5W2ZUS2PIEZDOEY5JNP5P3QXAZRDHGGIPFTYQQ4ARSA3YH4GXPR2W",
    },
    {
      name: "Global Emancipation Network",
      value: "GCLKR3M4SA3Y3MQ7XB7HG6IBTSE7U6FSKSBOFRJRN542FSH7GTLTAKOP",
    },
    {
      name: "For Living Independence",
      value: "GBJEYQRA6DEPQ4LS6A4LQVREGSPLGHBAACBHXWLXQM2MVHAUBOJ7QCMQ",
    },
    {
      name: "EmpowerED Pathways",
      value: "GALUY22PHA4X5Q4GXOMXNPYKMMTSMOLOI42NHRFJXNKF6TQU726U35B6",
    },
    {
      name: "Fight for the Future Fund",
      value: "GCLTH3R5CUICCLJUFJM6Z62ZCQMCLRKPJT3O7QB5CJXJ2FNXIXVHZGB2",
    },
    {
      name: "Solar Dos Abraxis",
      value: "GB7V7BCGPGZGLYBQDHIU7LBV6AWEJGRRHJVAWELWTTJ77B2XVMZTHO3I",
    },
    {
      name: " Tor Project",
      value: "GAS4FM36L6FGDVRDARCKAPWWILS257ILNBGIKVAJOLN22QJMSBFTY3KD",
    },
    {
      name: "Stellar.expert",
      value: "GCTORL7ZPVDJ436DDHDNJI2FJQKIS46V7KZDBJJ5SFBT7WVIKYMGPEIV",
    },
  ]);
  const handleChange = (e) => {
    setAllInfo({ ...allinfo, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    console.log(
      nonprofit[0]?.address,
      "nonprofit",
      (50 + +allinfo?.level) / Math.pow(10, 7),
      "level",
      allinfo?.jsonurl
    );

    const date = Math.floor(new Date(startDate) / 1000) + 300;
    console.log(date);
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
      timebounds: {
        minTime: date,
        maxTime: "0",
      },
    })
      .addOperation(
        Operation.payment({
          destination: nonprofit[0]?.address,
          asset: Asset.native(),
          amount: ((50 + +allinfo?.level) / Math.pow(10, 7)).toString(),
        })
      )
      .setTimeout(30)
      .addMemo(Memo.text(allinfo?.jsonurl))
      .build();

    transaction.sign(sourceKeypair);

    try {
      const transactionResult = await server.submitTransaction(transaction);
      console.log(transactionResult, "transactionResult");
      setHash(transactionResult.hash);
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
      <SelectBox
        nonprofitDetail={nonprofitDetail}
        setNonprofit={setNonprofit}
        nonprofit={nonprofit}
      />
      <Input
        clearable
        label="Enter URL of JSON file"
        fullWidth
        name="jsonurl"
        onChange={handleChange}
      />
      <Input
        clearable
        label="Enter Scarcity level 1-12"
        fullWidth
        onChange={handleChange}
        name="level"
      />
      <Input
        clearable
        fullWidth
        onChange={handleChange}
        label="Enter your Stellar Lumens private key OR leave blank to connect wallet (sending art requires a SL transaction)"
        name="key"
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <Button color="primary" auto ghost onClick={handleClick}>
        SendArt
      </Button>
      <Row>{hash && hash}</Row>
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  gap: 10px;
  width: 100%;
`;

export default SendArt;
