import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderLayout from "../../components/HeaderLayout";
import FreeCard from "../../components/Nav/gallery/FreeCard";
import UserCard from "../../components/Nav/gallery/UserCard";
import { Wrapper } from "../../components/Nav/sharedStyle";

const UploadBtn = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: skyblue;
  border-radius: 10px;
  color: white;
  font-weight: 600;
`;

const Free = styled.div`
  height: 400px;
  min-width: 1310px;
  width: 100%;
  border-bottom: 1px solid black;
`;

const Payment = styled.div`
  height: 400px;
  min-width: 1310px;
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 50px;
`;

const User = styled.div`
  height: 400px;
  min-width: 1310px;
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 50px;
`;

const Banner = styled.div`
`;

const Title = styled.span`
  padding-left: 20px;
  font-weight: 600;
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  place-items: center;
  grid-gap: 10px;
`;

function Gallery() {
  const [frees, setFrees] = useState(null);
  //const [pays, setPays] = useState(null);
  const [users, setUsers] = useState(null);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  useEffect(() => {
    //5 free, payment top post & user
    /* async function getApi(){
      const result = await axios.get('http://localhost:4000/monthly');
      console.log(result.data); //data -> free:[5], pay:[5], user[5]
      setFrees(result.data.free)
      setPays(result.data.pay)
      setUsers(result.data.user)
    }
    getApi() ;
    */
    const getApi = async () => {
      const result = await axios.get('http://localhost:4000/monthly');
      setFrees(result.data.galleryPost);
      setUsers(result.data.userByTotalCount);
    }
    getApi();
  }, [])
  //console.log(users);
  return (
    <HeaderLayout>
      <Wrapper>
        {isLoggedIn ? <Link to='/upload'><UploadBtn>새 게시물 작성</UploadBtn></Link> : null}
        <Free>
          <Title>이달의 무료 작품</Title>
          <Container>
            {frees?.map(post => <FreeCard key={post.id} post={post} />)}
          </Container>
        </Free>
        <Payment>
          <Title>이달의 유료 작품</Title>
          <Container>
            {/* pays?.map(post => <PostCard key={post.id} post={post} />) */}
          </Container>
        </Payment>
        <User>
          <Title>이달의 크리에이터</Title>
          <Container>
            {users?.map(user => <UserCard key={user.id} user={user} />)}
          </Container>
        </User>
        <Banner>
          Banner
        </Banner>
      </Wrapper>
    </HeaderLayout>
  )
}

export default Gallery;