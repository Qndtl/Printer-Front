import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: 1px solid black;
  margin-top: 20px;
  display: flex;
`;

const User = styled.div`
  width: 180px;
  height: 100%;
  border-radius: 30px;
  margin-right: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: grey;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

function CommunityComment({ comment }) {
  //console.log(newComment);
  //console.log(comment)
  return (
    <Container>
      <User>
        <Avatar src={comment?.user?.avatar} />
        <span>{comment?.user?.username}</span>
      </User>
      <Comment>{comment?.text}</Comment>
    </Container>
  )
}

export default CommunityComment;