import { useState } from "react";
import styled from "styled-components";
import { DefaultImage, Row } from "./element";
import { FaPlus, FaMinus } from "react-icons/fa";
import { arrayKill } from "../utills";

const CardContent = (props) => {
  const [counter, setCounter] = useState(0);
  const { total, setTotal, crease } = props;

  return (
    <TextContainer>
      <CardContainer>
        <>{props.name}GC</> <DefaultImage src={props.src} />
      </CardContainer>
      <CounterContainer>
        <FaPlus
          onClick={() => {
            setCounter(counter + 1);
            crease(props.name, (counter + 1) * (props.value ?? props.name));
          }}
        />
        <input
          value={counter}
          type="number"
          min="0"
          onChange={(e) => {
            if (+e.target.value >= 0) {
              setCounter(+e.target.value);
              arrayKill(total, props.name, "name");
              setTotal([
                ...total,
                { name: props.name, value: e.target.value * props.name },
              ]);
            }
          }}
        />
        <FaMinus
          onClick={() => {
            if (counter > 0) {
              setCounter(counter - 1);
              crease(props.name, (counter - 1) * props.name);
            }
          }}
        />
      </CounterContainer>
      = {counter}GC
    </TextContainer>
  );
};
const TextContainer = styled(Row)`
  gap: 20px;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  img {
    max-width: 150px;
  }
`;
const CounterContainer = styled(Row)`
  border: 1px solid #000000;
  font-size: 18px;
  font-weight: bold;
  padding: 14px;
  justify-content: space-around;
  input {
    max-width: 70px;
    text-align: center;
    font-size: 28px;
  }
`;
const CardContainer = styled(Row)`
  gap: 20px;
  flex: 1 1;
  justify-content: flex-end;
`;
export default CardContent;
