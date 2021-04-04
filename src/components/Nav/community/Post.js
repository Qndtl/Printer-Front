import { Link } from "react-router-dom";
import styled from "styled-components";
import { CommentBubble, EmptyHeart } from "../../Icons";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 15%;
  grid-template-rows: 1fr;
  div {
    display: flex;
    align-items: center;
    &:first-child{
      justify-content: center;
    }
  }
`;

const ImageContainer = styled.div``;

const Image = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
  background-color: grey;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  span{
    cursor: pointer;
    &:first-child{
      width: 85%;
      overflow: hidden;
    }
    &:last-child{
      width: 15%;
      overflow: hidden;
      padding-right: 50px;
      font-weight: 500;
    }
  }
`;

const Count = styled.div`
  span:first-child{
    margin-right: 10px;
  }
`;

function Post({ post, setModal, modal, setPostData }) {
  //console.log(post)
  return (
    <Container>
      <ImageContainer>
        <Image src={post.files[0]} />
      </ImageContainer>
      <Title onClick={() => { setModal(!modal); setPostData(post) }}>
        <span>{post.title}</span>
        <Link to={`/user/${post.user.id}`}><span>{post.user.username}</span></Link>
      </Title>
      <Count>
        <span><EmptyHeart size="16" /> {post.communityLike.length}</span>
        <span><CommentBubble size="16" /> {post.communityComments.length}</span>
      </Count>
    </Container>
  )
}

export default Post;