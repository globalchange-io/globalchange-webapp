import { useState } from "react";
import styled from "styled-components";
import { arrayKill } from "../utills";
import { Row } from "./element";
import { useAlert } from "react-alert";

const nonprofitDetail = [
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
];

const SelectBox = (props) => {
  const { nonprofit, setNonprofit } = props;
  const [selectProfit, setSelectProfit] = useState();
  const alert = useAlert();

  return (
    <Wrapper>
      <>nonprofit</>
      <WrapperContent
        onChange={(e) => {
          // eslint-disable-next-line no-unused-expressions
          if (
            nonprofit.filter((item) => item.address === e.target.value).length <
            1
          ) {
            setSelectProfit(e.target.value);
            arrayKill(nonprofit, selectProfit, "address");
            setNonprofit([...nonprofit, { address: e.target.value }]);
          } else {
            alert.error("Already selected");
          }
        }}
      >
        {nonprofitDetail.map((item, key) => (
          <WrapperItem value={item.value} key={key}>
            {item.name}
          </WrapperItem>
        ))}
      </WrapperContent>
    </Wrapper>
  );
};
const Wrapper = styled(Row)`
  gap: 5px;
  max-width: 300px;
  width: 100%;
`;
const WrapperContent = styled.select`
  gap: 10px;
  width: 100%;
`;
const WrapperItem = styled.option``;
export default SelectBox;
