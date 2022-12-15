import styled from "styled-components";
import { DefaultImage, Row } from ".";
import Card2 from "../../assets/image/card2.png";

const CardContent = (props) => {
  return (
    <TextContainer>
      1GC <DefaultImage src={Card2} />
      <CounterContainer>
        <>+</>
        <Row>0</Row>
        <>-</>
      </CounterContainer>
      = 0GC
    </TextContainer>
  );
};
const TextContainer = styled(Row)`
  gap: 10px;
  img {
    width: 150px;
  }
`;
const CounterContainer = styled(Row)`
  gap: 10px;
  border: 1px solid #000000;
  font-size: 30px;
  font-weight: bold;
  width: 100px;
  padding: 15px 20px;
  justify-content: space-around;
`;
export default CardContent;
