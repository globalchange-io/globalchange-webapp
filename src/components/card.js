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
      {props.name}GC <DefaultImage src={props.src} />
      <CounterContainer>
        <FaPlus
          onClick={() => {
            setCounter(counter + 1);
            crease(props.name, (counter + 1) * props.name);
          }}
        />
        <input
          value={counter}
          type="number"
          onChange={(e) => {
            setCounter(+e.target.value);
            arrayKill(total, props.name, "name");
            setTotal([
              ...total,
              { name: props.name, value: e.target.value * props.name },
            ]);
          }}
        />
        <FaMinus
          onClick={() => {
            setCounter(counter - 1);
            crease(props.name, (counter - 1) * props.name);
          }}
        />
      </CounterContainer>
      = {counter}GC
    </TextContainer>
  );
};
const TextContainer = styled(Row)`
  width: 100%;
  gap: 10px;
  justify-content: center;
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
export default CardContent;
