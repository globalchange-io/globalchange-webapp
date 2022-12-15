import Header from "../../components/header";
import PublicPage from "../../view/public";
import Footer from "../../components/footer";
import styled from "styled-components";
import { Column } from "../../components/element";
const PublicLayout = () => {
  return (
    <Wrapper>
      <Header />
      <WrapperContent>
        <PublicPage />
      </WrapperContent>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled(Column)`
  justify-content: space-between;
  height: 100vh;
  margin-top: 50px;
  width: 100%;
`;
const WrapperContent = styled(Column)`
  max-width: 1440px;
  padding: 50px;
  @media screen and (max-width: 450px) {
    padding: 20px;
  }
`;
export default PublicLayout;
