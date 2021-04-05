import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderLayout from "../components/HeaderLayout";
import { Wrapper } from "../components/Nav/sharedStyle";
import Cposts from "../components/Profile/Cposts/Cposts";
import Followers from "../components/Profile/Followers/Followers";
import Followings from "../components/Profile/Following/Followings";
import Gposts from "../components/Profile/Gposts/Gposts";

const Container = styled.div`
  height: calc(100vh - 380px);
`;

const UserContainer = styled.div`
  min-width: 1310px;
  max-width: 1310px;
  width: 100%;
  height: 400px;
  display: flex;
`;

const AvatarContainer = styled.div`
  height: 100%;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
    background-color: grey;
    border-radius: 30px;
  }
`;

const InfoContainer = styled.div`
  height: 100%;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  span {
    font-weight: 600;
  }
  display: flex;
  width: 60%;
  margin-bottom: 50px;
  &:first-child{
    font-size: 23px;
    font-weight: 600;
    margin-top: 50px;
  }
  &:nth-child(2){
    justify-content: space-between;
  }
`;

const EditButton = styled.button`
  margin-left: auto;
  padding: 8px;
  font-size: 15px;
  border: none;
  background-color: skyblue;
  font-weight: 600;
  color: white;
  border-radius: 10px;
  outline: none;
`;

const FollowButton = styled(EditButton)``;

const MoreContainer = styled.div`
  min-width: 1310px;
  max-width: 1310px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const NavContainer = styled.nav`
  margin-bottom: 30px;
  ul {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
    li {
      cursor: pointer;
    }
  }
`;

function Profile() {
  const [user, setUser] = useState(null);
  const [isSelf, setIsSelf] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [followerNum, setFollowerNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);
  const { id } = useParams();
  const token = useSelector(state => state.userReducer.user.token);
  const history = useHistory();
  const [action, setAction] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get(`http://localhost:4000/getuser?id=${id}`, { headers: { token } });
      console.log(result?.data);
      setUser(result?.data?.user);
      setIsSelf(result?.data?.isSelf);
      setIsFollowing(result?.data?.isFollowing);
      setFollowerNum(result?.data?.user?.followers?.length);
      setFollowingNum(result?.data?.user?.following?.length);

      if (result?.data?.message === "User not found") {
        history.go(-1);
      }
      if (result?.data?.response?.message === "Error in jwt verify") {
        history.push('/login');
      }
    }
    getApi();
  }, [id, token, history])

  const clickFollow = async () => {
    const result = await axios.post(`http://localhost:4000/follow`, { userId: id }, { headers: { token } });
    setIsFollowing(true);
    setFollowerNum(followerNum + 1);
    console.log(result.data);
  }

  const clickUnfollow = async () => {
    const result = await axios.post(`http://localhost:4000/unfollow`, { userId: id }, { headers: { token } });
    setIsFollowing(false);
    setFollowerNum(followerNum - 1);
    console.log(result.data);
  }
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <UserContainer>
            <AvatarContainer>
              <img src={user?.avatar} alt={user?.username} />
            </AvatarContainer>
            <InfoContainer>
              <Row>
                <span>{user?.username}</span>
                {
                  isSelf ? <EditButton><Link to='/edit/profile'>프로필 편집</Link></EditButton> :
                    isFollowing ?
                      <FollowButton style={{ backgroundColor: "tomato" }} onClick={clickUnfollow}>언팔로우</FollowButton> :
                      <FollowButton onClick={clickFollow}>팔로우</FollowButton>
                }
              </Row>
              <Row>
                <span>팔로워 {followerNum}</span>
                <span>팔로잉 {followingNum}</span>
                <span>게시물 {user?.CommunityPost?.length + user?.GalleryPost?.length}</span>
              </Row>
              <Row>
                <span>소개 - {user?.bio}</span>
              </Row>
            </InfoContainer>
          </UserContainer>
          <hr style={{ width: "70%", minWidth: "1310px" }} />
          <MoreContainer>
            <NavContainer>
              <ul>
                <li onClick={() => setAction('gallerypost')}>갤러리 게시물</li>
                <li onClick={() => setAction('communitypost')}>커뮤니티 게시물</li>
                <li onClick={() => setAction('follower')}>팔로워</li>
                <li onClick={() => setAction('following')}>팔로잉</li>
              </ul>
            </NavContainer>
            {
              action === 'gallerypost' ?
                <Gposts galleryPostsId={user?.GalleryPost} /> : action === 'communitypost' ?
                  <Cposts communityPostsId={user?.CommunityPost} /> : action === 'follower' ?
                    <Followers followers={user?.followers} /> : action === 'following' ?
                      <Followings followings={user?.following} /> : null
            }
          </MoreContainer>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}

export default Profile;