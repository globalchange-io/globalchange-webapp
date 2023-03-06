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
    "SCRSSD2OXV5QVBJXRA7N5PXLKK76DMZJFAJC32HEVBPOGVFHMS5F2D4N"
  );
  const sourcePublicKey = sourceKeypair.publicKey();
  const server = new Server("https://horizon.stellar.org");

  const [nonprofit, setNonprofit] = useState([]);

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
    // found the next 3 lines online, lost the source - makes an array from the checked checkboxes
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.PUBLIC,
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
        minDate={new Date("1993-03-03")}
        maxDate={new Date("1999-12-31")}
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
