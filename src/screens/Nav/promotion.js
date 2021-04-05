import styled from "styled-components";
import HeaderLayout from "../../components/HeaderLayout";
import { Wrapper } from "../../components/Nav/sharedStyle";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Promotion() {
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>Promotion, event picture</Container>
      </Wrapper>
    </HeaderLayout>
  )
}
export default Promotion;