import styled from "styled-components";
import { Row } from ".";

const SelectBox = (props) => {
  return (
    <Wrapper>
      <>{props.label}</>
      <WrapperContent>
        <WrapperItem value="GBVKR2N54PESLPY57TJ6L4JHNMNBXI5SWRGRWEZV4LU73DC5DI26545A">
          Bali Food Bank
        </WrapperItem>
        <WrapperItem value="GBSPK7XJDK3BB2HUO4DTANKWWVLTEKAK4NTTLVY56YYHIYQUFX5CJMAK">
          Heifer International
        </WrapperItem>{" "}
        <WrapperItem value="GDWNMXOVH3GDYXFBD66U5OCHO33SUOSY37O6ZSZBCG33IZ7N6ZONZGFW">
          Crypto for the Homeless
        </WrapperItem>{" "}
        <WrapperItem value="GANLOWYTGSBJC6HK7PNWCYGTSPSXYQMJHKEK7B7FOTSU5HB2QWTJJBZW">
          Women Who Code
        </WrapperItem>{" "}
        <WrapperItem value="GCTW6KJYUJRQVTKQDMWH4EBT33DMGO2ZNLUDQIPS4KSZ6UXQAT2DAFHU">
          Aid for Ukraine
        </WrapperItem>{" "}
        <WrapperItem value="GAPPHYCJJAY3XUYEVRUSVZYZVVTMQ2JNSRHQW2AVBAHZX3MD5QNMFABY">
          University of San Francisco
        </WrapperItem>{" "}
        <WrapperItem value="GBLT2J3A2U3ELWIJNIAAJOF6JYOHNBDQK3QOVOYX35DXIIN2G6TJJZG7">
          Freedom of the Press Foundation
        </WrapperItem>
        <WrapperItem value="GCO5W2ZUS2PIEZDOEY5JNP5P3QXAZRDHGGIPFTYQQ4ARSA3YH4GXPR2W">
          Coin Center
        </WrapperItem>
        <WrapperItem value="GCLKR3M4SA3Y3MQ7XB7HG6IBTSE7U6FSKSBOFRJRN542FSH7GTLTAKOP">
          Global Emancipation Network
        </WrapperItem>
        <WrapperItem value="GBJEYQRA6DEPQ4LS6A4LQVREGSPLGHBAACBHXWLXQM2MVHAUBOJ7QCMQ">
          For Living Independence
        </WrapperItem>
        <WrapperItem value="GALUY22PHA4X5Q4GXOMXNPYKMMTSMOLOI42NHRFJXNKF6TQU726U35B6">
          EmpowerED Pathways
        </WrapperItem>
        <WrapperItem value="GCLTH3R5CUICCLJUFJM6Z62ZCQMCLRKPJT3O7QB5CJXJ2FNXIXVHZGB2">
          Fight for the Future Fund
        </WrapperItem>
        <WrapperItem value="GB7V7BCGPGZGLYBQDHIU7LBV6AWEJGRRHJVAWELWTTJ77B2XVMZTHO3I">
          Solar Dos Abraxis
        </WrapperItem>
        <WrapperItem value="GAS4FM36L6FGDVRDARCKAPWWILS257ILNBGIKVAJOLN22QJMSBFTY3KD">
          Tor Project
        </WrapperItem>
        <WrapperItem value="GCTORL7ZPVDJ436DDHDNJI2FJQKIS46V7KZDBJJ5SFBT7WVIKYMGPEIV">
          Stellar.expert
        </WrapperItem>
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
