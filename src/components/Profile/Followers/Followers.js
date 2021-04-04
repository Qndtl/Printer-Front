import styled from "styled-components";
import Follower from "./Follower";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Followers({ followers }) {
  //console.log(followers)
  return (
    <Container>
      {followers.length === 0 ? "Followers not found" : followers.map(follower => <Follower key={follower.id} follower={follower} />)}
    </Container>
  )
}

export default Followers;