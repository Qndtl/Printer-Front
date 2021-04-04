import styled from "styled-components";
import Following from "./Following";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Followings({ followings }) {
  //console.log(followers)
  return (
    <Container>
      {followings.length === 0 ? "Followings not found" : followings.map(following => <Following key={following.id} following={following} />)}
    </Container>
  )
}

export default Followings;