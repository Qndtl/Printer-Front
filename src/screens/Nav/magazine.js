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

function Magazine() {
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>Magazine picture. perhaps link?</Container>
      </Wrapper>
    </HeaderLayout>
  )
}
export default Magazine;