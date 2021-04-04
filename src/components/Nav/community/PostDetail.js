import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommunityComment from "../../CommunityComment";
import { CommentBubble, EmptyHeart, FullHeart } from "../../Icons";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  margin: 10px;
  margin-left: auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 30px;
  width: 100%;
  height: 100%;
  img {
    width: 300px;
  }
`;

const Text = styled.div``;

const Interface = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  input {
    width: 100%;
    height: 50px;
    border-radius: 30px;
    border: 2px solid skyblue;
    padding: 20px;
    font-size: 20px;
    margin-right: 20px;
  }
`;

const CountContainer = styled.div`
  height: 50px;
  font-size: 22px;
  display: flex;
  align-items: center;
  padding-left: 50px;
`;

function PostDetail({ modal, setModal, postData }) {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(null);
  const [totalLike, setTotalLike] = useState(null);
  const token = useSelector(state => state.userReducer.user.token);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  useEffect(() => {
    const getApi = async () => {
      const postId = postData.id;
      if (!token) {
        const result = await axios.get(`http://localhost:4000/communitypost?postId=${postId}`);
        setTotalLike(result.data.post.communityLike.length)
        //console.log(result.data.isLiked);
      } else {
        const result = await axios.get(`http://localhost:4000/communitypost?postId=${postId}`, { headers: { token } });
        setTotalLike(result.data.post.communityLike.length)
        setIsLiked(result.data.isLiked);
        //console.log(result.data);
      }
    }
    getApi();
  }, [token, postData.id])

  const onSubmit = async e => {
    //e.preventDefault();
    const result = await axios.post("http://localhost:4000/communitycomment", { comment, postId: postData?.id }, { headers: { token: localStorage.getItem('jwt') } });
    console.log(result.data);
  }

  const onClick = async () => {
    const id = postData.id;
    if (!isLiked) {
      const result = await axios.get(`http://localhost:4000/communitylike?id=${id}`, { headers: { token } });
      setIsLiked(true);
      setTotalLike(totalLike + 1)
      console.log(result.data);
    } else {
      const result = await axios.get(`http://localhost:4000/communityunlike?id=${id}`, { headers: { token } });
      setIsLiked(false);
      setTotalLike(totalLike - 1)
      console.log(result.data);
    }
  }
  //console.log(isLiked);
  return (
    <Container>
      <Button onClick={() => setModal(!modal)}>X</Button>
      <Content>
        {postData?.files[0] ? <img src={postData.files[0]} alt={postData.title} /> : null}
        <Text>
          {postData.description}
        </Text>
      </Content>
      <Interface>
        <Form onSubmit={onSubmit}>
          <input type="text"
            placeholder={isLoggedIn ? "댓글을 작성해 주세요." : "로그인 후 댓글을 남겨주세요."}
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={isLoggedIn ? false : true} />
          <button style={{ display: "none" }}></button>
        </Form>
        <CountContainer>
          <span>{isLoggedIn ? <span onClick={onClick}> {isLiked ? <FullHeart size="20" /> : <EmptyHeart size="20" />}</span> : <EmptyHeart size="20" />} {totalLike}</span>
          <span style={{ marginLeft: "20px" }}><CommentBubble size="20" /> {postData?.communityComments?.length}</span>
        </CountContainer>
      </Interface>
      { postData?.communityComments?.map(comment => <CommunityComment key={comment.id} comment={comment} />)}
    </Container >
  )
}

export default PostDetail;