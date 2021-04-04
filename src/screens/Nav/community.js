import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import HeaderLayout from "../../components/HeaderLayout";
import Post from "../../components/Nav/community/Post";
import PostDetail from "../../components/Nav/community/PostDetail";
import { Wrapper } from "../../components/Nav/sharedStyle";

const Container = styled.div`
  min-width: 1310px;
  width: 90%;
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 1fr;
  grid-gap: 30px;
`;

const ModelingProgram = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(11, 50px);
  grid-gap: 40px;
  place-items: center;
  span {
    cursor: pointer;
    padding: 8px 15px;
    border-radius: 10px;
    font-weight: 600;
  }
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 50px 1fr;
  grid-gap: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input {
    width: 80%;
    height: 100%;
    border-radius: 30px;
    border: 2px solid skyblue;
    padding: 20px;
    font-size: 20px;
  }
`;

const Action = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  span{
    font-size: 22px;
    font-weight: 600;
  }
  justify-content: space-between;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 10px;
  width: calc(100% - 30px);
  height: 800px;
`;

const Button = styled.div`
  padding: 8px;
  background-color: skyblue;
  border-radius: 10px;
  font-weight: 600;
  color: white;
`;

function Community() {
  const [action, setAction] = useState('오토캐드');
  const [posts, setPosts] = useState(null);
  const [postData, setPostData] = useState(null);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get(`http://localhost:4000/communityposts?subject=${action}`);
      //maybe pagination needed.
      //console.log(result.data);
      setPosts(result.data);
    }
    getApi();
  }, [action])
  //console.log(posts)
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState('');
  const history = useHistory();
  const onSubmit = e => {
    e.preventDefault();
    history.push('/search', { search });
  }
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <ModelingProgram onClick={() => setModal(false)}>
            <span style={action === "오토캐드" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("오토캐드")}>오토캐드</span>
            <span style={action === "팅커캐드" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("팅커캐드")}>팅커캐드</span>
            <span style={action === "마야" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("마야")}>마야</span>
            <span style={action === "3d-max" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("3d-max")}>3D MAX</span>
            <span style={action === "blender" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("blender")}>BLENDER</span>
            <span style={action === "3d-printer" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("3d-printer")}>3D 프린터</span>
            <span style={action === "스트라타시스" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("스트라타시스")}>스트라타시스</span>
            <span style={action === "신도" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("신도")}>신도</span>
            <span style={action === "3d-system" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("3d-system")}>3D systems</span>
            <span style={action === "프로토텍" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("프로토텍")}>프로토텍</span>
            <span style={action === "자유게시판" ? { backgroundColor: "skyblue", color: "white" } : null} onClick={() => setAction("자유게시판")}>자유게시판</span>
          </ModelingProgram>
          <PostContainer>
            <Form onSubmit={onSubmit}>
              <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
              <button style={{ display: 'none' }}></button>
            </Form>
            <Action>
              <span>{action.toUpperCase()}</span>
              {isLoggedIn ? <Link to='/communityUpload'><Button>새 게시물</Button></Link> : null}
            </Action>
            {modal ? <PostDetail modal={modal} setModal={setModal} postData={postData} /> : <Posts>{posts?.posts?.map(post => <Post key={post.id} post={post} setModal={setModal} modal={modal} setPostData={setPostData} />)}</Posts>}
          </PostContainer>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}

export default Community;