import styled from "styled-components";
import { Column, DefaultImage } from "./element";
import MapImage from "../assets/image/map.png";
const Map = () => {
  return (
    <Wrapper>
      <Text>
        GC bills currently in your SmartWallet were born to help nonprofits and
        charities located in these countries
      </Text>
      <DefaultImage src={MapImage} />
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  gap: 10px;
`;
const Text = styled(Column)`
  font-size: 18px;
  text-align: center;
`;
export default Map;
