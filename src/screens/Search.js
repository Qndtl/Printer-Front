import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import styled from "styled-components";
import HeaderLayout from "../components/HeaderLayout";
import { LeftIcon, RightIcon } from "../components/Icons";
import { Wrapper } from "../components/Nav/sharedStyle";
import SearchCard from "../components/Search/SearchCard";
import SearchUser from "../components/Search/SearchUser";

const Container = styled.div`
  min-width: 1310px;
  max-width: 1310px;
`;

const Row = styled.div`
  width: 100%;
  margin-top: 50px;
  border-bottom: 1px solid black;
  height: 420px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 390px;
  &:last-child{
    margin-top: 150px;
  }
`;

const Section = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const NoResult = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Result = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LeftButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: skyblue;
  position: absolute;
  left: 0px;
  svg {
    fill: white;
    margin-top: 3px;
    margin-right: 7px;
  }
`;
const RightButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: skyblue;
  position: absolute;
  right: 0px;
  svg {
    fill: white;
    margin-top: 3px;
    margin-left: 7px;
  }
`;

export default function Search() {
  const location = useLocation();
  //gallery state
  const [galleries, setGallerys] = useState(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryTotalPage, setGalleryTotalPage] = useState(0);

  //user state
  const [users, setUsers] = useState(null);
  const [userPage, setUserPage] = useState(1);
  const [userTotalPage, setUserTotalPage] = useState(0);

  useEffect(() => {
    const getGalleryApi = async () => {
      const result = await axios.get(`http://localhost:4000/search/gallery?term=${location?.state?.search}&page=${galleryPage}`);
      setGallerys(result.data.galleryPosts);
      setGalleryTotalPage(result.data.totalPage);
      //console.log(result.data);
    }
    getGalleryApi();
  }, [location?.state?.search, galleryPage])
  useEffect(() => {
    const getUserApi = async () => {
      const result = await axios.get(`http://localhost:4000/search/user?term=${location?.state?.search}&page=${userPage}`);
      setUsers(result.data.users);
      setUserTotalPage(result.data.totalPage);
      //console.log(result.data);
    }
    getUserApi();
  }, [location?.state?.search, userPage])

  console.log(galleries)
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <p>Search result of "{location?.state?.search}"</p>
          <Row>
            <Section>3D Gallery</Section>
            {
              galleries?.length === 0 ? <NoResult>"{location?.state?.search}"에 대한 갤러리 검색 결과가 없습니다.</NoResult> : <Result>
                {galleryTotalPage > 1 ? <LeftButton onClick={() => setGalleryPage(galleryPage <= 1 ? galleryPage : galleryPage - 1)}><LeftIcon /></LeftButton> : null}
                {
                  galleries?.map(gallery => <SearchCard
                    key={gallery.id}
                    thumbnail={gallery.files[0]}
                    title={gallery.title}
                    user={gallery.user}
                    likes={gallery.totalLike}
                    postId={gallery.id}
                    userId={gallery.userId} />)
                }
                {galleryTotalPage > 1 ? <RightButton onClick={() => setGalleryPage(galleryPage >= galleryTotalPage ? galleryPage : galleryPage + 1)}><RightIcon /></RightButton> : null}
              </Result>
            }
          </Row>
          <Row>
            <Section>User</Section>
            {
              users?.length === 0 ? <NoResult>"{location?.state?.search}"에 대한 사용자 검색 결과가 없습니다.</NoResult> : <Result>
                {userTotalPage > 1 ? <LeftButton onClick={() => setUserPage(userPage <= 1 ? userPage : userPage - 1)}><LeftIcon /></LeftButton> : null}
                {
                  users?.map(user => <SearchUser
                    key={user.id}
                    avatar={user.avatar}
                    totalCount={user.totalCount}
                    username={user.username}
                    followers={user.followers.length}
                    following={user.following.length} />)
                }
                {userTotalPage > 1 ? <RightButton onClick={() => setUserPage(userPage >= userTotalPage ? userPage : userPage + 1)}><RightIcon /></RightButton> : null}
              </Result>
            }
          </Row>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}