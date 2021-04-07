import styled from "styled-components";
import HeaderLayout from "../../components/HeaderLayout";
import Printer from "../../components/Nav/rental/Printer";
import { Wrapper } from "../../components/Nav/sharedStyle";

const Container = styled.div`
  min-width: 1024px;
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  width: 100%;
  height: 500px;
  border: 1px solid black;
  margin-bottom: 50px;
  padding: 0px 50px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const ProductContainer = styled.div`
  margin-top: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 50px;
`;

function Rental() {
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <Row>
            <Title>Best 상품</Title>
            <ProductContainer>
              <Printer />
              <Printer />
              <Printer />
            </ProductContainer>
          </Row>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}
export default Rental;