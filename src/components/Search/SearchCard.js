import { Link } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  width: 250px;
  height: 370px;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  background-color: grey;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const TextCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default function SearchCard({ thumbnail, user, title, likes, postId, userId }) {
  return (
    <Container>
      <Link to={`/gallerypost/${postId}`}><Thumbnail src={thumbnail} /></Link>
      <UserInfo>
        <Link to={`/profile/${userId}`}><Avatar src={user.avatar} /></Link>
        <TextCon>
          <Link to={`/profile/${userId}`}><span>{user.username}</span></Link>
          <Link to={`/gallerypost/${postId}`}><span>{title}</span></Link>
        </TextCon>
        {likes === 1 ? "1 like" : `${likes} likes`}
      </UserInfo>
    </Container>
  )
}