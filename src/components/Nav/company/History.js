import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 8% 92%;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 30px;
  font-size: 20px;
  height: calc(100vh - 690px);
`;

const Year = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

const Description = styled.ul``;

function History() {
  return (
    <Container>
      <Year>
        <span>2019</span>
        <span>|</span>
      </Year>
      <Description>
        <li>10. four top</li>
        <li>11. four top</li>
        <li>12. four top</li>
      </Description>
      <Year>
        <span>2020</span>
        <span>|</span>
      </Year>
      <Description>
        <li>9. four top</li>
        <li>10. four top</li>
        <li>11. four top</li>
        <li>12. four top</li>
      </Description>
    </Container>
  )
}

export default History;