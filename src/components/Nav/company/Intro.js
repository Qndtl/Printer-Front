import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 300px;
  width: 100%;
  margin-bottom: 50px;
`;

const Column = styled.div`
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Intro() {
  return (
    <>
      <Row>
        <Column style={{ border: "1px solid black" }}>img</Column>
        <Column>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In velit sapiente ratione non rerum quo quia esse, molestiae vel earum architecto doloribus eum voluptatibus animi ullam repellat quod numquam quae.
        </Column>
      </Row>
      <Row>
        <Column>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In velit sapiente ratione non rerum quo quia esse, molestiae vel earum architecto doloribus eum voluptatibus animi ullam repellat quod numquam quae.
        </Column>
        <Column style={{ border: "1px solid black" }}>img</Column>
      </Row>
      <Row>
        <Column style={{ border: "1px solid black" }}>img</Column>
        <Column>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In velit sapiente ratione non rerum quo quia esse, molestiae vel earum architecto doloribus eum voluptatibus animi ullam repellat quod numquam quae.
        </Column>
      </Row>
    </>
  )
}

export default Intro;