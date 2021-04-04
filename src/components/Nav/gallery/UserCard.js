import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: grey;
`;

const Text = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  span {
    margin: 3px;
  }
`;

function UserCard({ user }) {
  //console.log(user);
  return (
    <Container>
      <Link to={`/user/${user.id}`}><Image src={user.avatar} /></Link>
      <Text>
        <Link to={`/user/${user.id}`}><span style={{ fontWeight: 600 }}>{user.username}</span></Link>
        <span>{user.followers.length} followers</span>
        <span>{user.totalLike} likes</span>
        <span>{user.bio}</span>
      </Text>
    </Container>
  )
}

export default UserCard;