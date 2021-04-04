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
  object-fit: cover;
`;

const UserContainer = styled.div`
  margin-top: 15px;
  width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 50%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

const Username = styled.div`
  width: 100px;
  height: 21px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100px;
  height: 21px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

function FreeCard({ post }) {
  //console.log(post)
  return (
    <Container>
      <Link to={`/gallerypost/${post.id}`}><Image src={post?.files[0]} /></Link>
      <UserContainer>
        <Link to={`/user/${post.user.id}`}><Avatar src={post.user.avatar} /></Link>
        <Text>
          <Link to={`/user/${post.user.id}`}><Username>{post.user.username}</Username></Link>
          <Link to={`/user/${post.id}`}><Title>{post.title}</Title></Link>
        </Text>
        <span>{post.totalLike === 1 ? "1 like" : `${post.totalLike} likes`}</span>
      </UserContainer>
    </Container>
  )
}

export default FreeCard;