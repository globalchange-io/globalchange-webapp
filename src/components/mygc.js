import styled from "styled-components";
import { Column, DefaultImage, Row } from "./element";
import Card1 from "../assets/image/card1.png";
import Card2 from "../assets/image/card2.png";
import Card3 from "../assets/image/card3.png";
import Card4 from "../assets/image/card4.png";
import Card5 from "../assets/image/card5.png";
import { useState } from "react";

const data = [
  { key: 1, image: Card1 },
  { key: 2, image: Card2 },
  { key: 3, image: Card3 },
  { key: 4, image: Card4 },
  { key: 5, image: Card5 },
];

const Mygc = (props) => {
  const [sortState, setSortState] = useState("ascending");
  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: (a, b) => a.key - b.key },
    descending: { method: (a, b) => b.key - a.key },
  };

  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Text>{props.text}</Text>
      <SortByWrapper>
        <SortBy
          onChange={(e) => setSortState(e.target.value)}
          defaultValue="none"
        >
          <option value="none">None</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </SortBy>
      </SortByWrapper>
      {data.sort(sortMethods[sortState].method).map((items, key) => (
        <ImageContainer key={items.key}>
          <DefaultImage src={items.image} />
        </ImageContainer>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  gap: 5px;
`;
const ImageContainer = styled(Column)`
  gap: 5px;
`;
const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;
const Text = styled.div`
  font-size: 18px;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
`;
const SortByWrapper = styled(Row)`
  justify-content: flex-end;
  width: 100%;
`;
const SortBy = styled.select`
  font-size: 14px;
  width: 100px;
`;
export default Mygc;
