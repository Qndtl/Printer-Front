import { Link } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  min-width: 350px;
  max-width: 350px;
  height: 450px;
  margin: 0px 60px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 290px 60px 100px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid black;
`;

const Count = styled.div`
  display: flex;
`;

const Review = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 1px solid black;
  border-top: none;
`;

const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModelName = styled.span`
  margin-bottom: 15px;
`;
const Price = styled.span``;

export default function Printer() {
  return (
    <Link to={`${null}`}>
      <Container>
        <Image src={null} />
        <Count>
          <Review>제품리뷰 10</Review>
          <Likes>좋아요 10</Likes>
        </Count>
        <ProductInfo>
          <ModelName>기업 - 모델명</ModelName>
          <Price>매 달 50000원</Price>
        </ProductInfo>
      </Container>
    </Link>
  )
}