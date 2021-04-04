import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  min-height: 350px;
  border: 1px solid black;
  &:first-child{
    margin-bottom: 80px;
  }
`;

function Greet() {
  return (
    <>
      <Row>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, adipisci quaerat impedit omnis maxime possimus asperiores totam magni quos? Vero, nam. Fugiat nesciunt quae eaque libero velit omnis cum necessitatibus?
      </Row>
      <Row>img</Row>
    </>
  )
}

export default Greet;