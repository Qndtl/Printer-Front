import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  min-height: 350px;
  border: 1px solid black;
  &:first-child{
    margin-bottom: 80px;
  }
  &:last-child{
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Description = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

function Vision() {
  return (
    <>
      <Row>
        img
      </Row>
      <Row>
        <Title>미션</Title>
        <Description>
          <li>모든 사람이 4차 산업혁명 기술에 쉽게 다가갈 수 있도록 함</li>
        </Description>
        <Title>비전</Title>
        <Description>
          <li>2020년 개인용 3D프린터 대표 사이트 정착</li>
          <li>2021년 개인용 3D프린터 캐즘</li>
        </Description>
        <Title>목표</Title>
        <Description>
          <li>국내 대표 하이테크 플랫폼</li>
          <li>1가구 1 3D프린터</li>
        </Description>
      </Row>
    </>
  )
}

export default Vision;