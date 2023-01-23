import { useState } from "react";
import styled from "styled-components";
import { arrayKill } from "../utills";
import { Row } from "./element";
import { useAlert } from "react-alert";

const SelectBox = (props) => {
  const { nonprofit, setNonprofit, nonprofitDetail } = props;
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
