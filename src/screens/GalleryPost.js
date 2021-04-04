import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GalleryComment from "../components/GalleryComment";
import HeaderLayout from "../components/HeaderLayout";
import { CommentBubble, EmptyHeart, FullHeart } from "../components/Icons";
import { Wrapper } from "../components/Nav/sharedStyle";

const Container = styled.div`
  margin-top: 50px;
  max-width: 1310px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-gap: 50px;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 30px;
`;
const Text = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 10px 0px;
`;

const GridContainer = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;
const MainImage = styled.img`
  width: 600px;
  height: 100%;
  margin-bottom: 50px;
`;
const SubImageCon = styled.div`
  width: 820px;
  height: 320px;
  display: flex;
  overflow-x: auto;
`;
const SubImage = styled.img`
  width: 300px;
  height: 200px;
  margin: 5px;
  flex-shrink: 0;
  object-fit: cover;
  background-color: grey;
`;
const DescriptionCon = styled.div`
  width: 30%;
`;



const CommentContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width:100%;
    display: flex;
    justify-content: center;
    input {
      font-size: 20px;
      width: 820px;
      height: 60px;
      border-radius: 30px;
      padding: 30px;
      border: 2px solid skyblue;
    }
  }
`;

const CountContainer = styled.div`
  padding-left: 8px;
  width: 90%;
  font-size: 23px;
  margin-bottom: 20px;
`;

function GalleryPost() {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const { id } = useParams();
  const token = useSelector(state => state.userReducer.user.token);
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [curNum, setCurNum] = useState(0);
  const [comment, setComment] = useState('');
  const [totalLike, setTotalLike] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      if (!token) {
        const result = await axios.get(`http://localhost:4000/gallerypost?id=${id}`);
        setPost(result.data.post);
        setTotalLike(result.data.post.galleryLike.length);
      } else {
        const result = await axios.get(`http://localhost:4000/gallerypost?id=${id}&token=${token}`);
        //console.log(result.data)
        setIsLiked(result.data.isLiked);
        setPost(result.data.post);
        setTotalLike(result.data.post.galleryLike.length);
      }
    }
    getApi();
  }, [id, token])
  //console.log(totalLike)

  const onSubmit = async e => {
    //e.preventDefault();
    const result = await axios.post("http://localhost:4000/gallerycomment", { comment, postId: post?.id }, { headers: { token: localStorage.getItem('jwt') } });
    console.log(result.data);
  }
  //console.log(post);

  const onClick = async () => {
    if (!isLiked) {
      const result = await axios.get(`http://localhost:4000/gallerylike?id=${id}`, { headers: { token } });
      setIsLiked(true);
      setTotalLike(totalLike + 1)
      console.log(result.data);
    } else {
      const result = await axios.get(`http://localhost:4000/galleryunlike?id=${id}`, { headers: { token } });
      setIsLiked(false);
      setTotalLike(totalLike - 1)
      console.log(result.data);
    }
  }
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <GridContainer>
            <ImageContainer>
              <MainImage src={post?.files[curNum]} />
              <SubImageCon>
                {post?.files?.map((file, i) => <SubImage key={i} src={file} onClick={() => setCurNum(i)} />)}
              </SubImageCon>
            </ImageContainer>
            <DescriptionCon>
              <InfoContainer>
                <Link to={`/user/${post?.user?.id}`}><Avatar src={post?.user?.avatar} /></Link>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                  <Link to={`/user/${post?.user?.id}`}><Text>작성자: {post?.user?.username}</Text></Link>
                  <Link to={`/user/${post?.user?.id}`}><Text>제목: {post?.title}</Text></Link>
                </div>
              </InfoContainer>
              {post?.description}
            </DescriptionCon>
          </GridContainer>
          <GridContainer>
            <CommentContainer>
              <CountContainer>
                <span>
                  {totalLike} {isLoggedIn ? <span onClick={onClick} style={{ marginRight: "20px" }}>{isLiked ? <FullHeart size="20" /> : <EmptyHeart size="20" />}</span> : "🤍"}
                  <span>{post?.galleryComments?.length} <CommentBubble size="20" /></span>
                </span>
              </CountContainer>
              <form onSubmit={onSubmit}>
                <input type="text"
                  placeholder={isLoggedIn ? "댓글을 남겨주세요." : "로그인 후에 댓글을 남겨주세요."}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  disabled={isLoggedIn ? false : true} />
                <button style={{ display: "none" }}></button>
              </form>
              {post?.galleryComments?.map(comment => <GalleryComment key={comment.id} comment={comment} />)}
            </CommentContainer>
          </GridContainer>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}

export default GalleryPost;