import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function NotFound() {
  return (
    <Container>
      <span style={{ fontSize: "50px", fontWeight: "600" }}>Not Found 404</span>
      <Link to='/'><p>Go Home</p></Link>
    </Container>
  )
}