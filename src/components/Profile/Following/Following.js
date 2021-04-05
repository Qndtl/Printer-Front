import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    background-color: grey;
  }
  span {
    font-weight: 600;
  }
  div{
    margin-left: auto;
  }
`;

const FollowButton = styled.button`
  padding: 5px;
  background-color: skyblue;
  outline: none;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 17px;
  border-radius: 10px;
`;

const UnfollowButton = styled(FollowButton)`
  background-color: tomato;
`;

function Following({ following }) {
  const token = useSelector(state => state.userReducer.user.token);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const getApi = async () => {
      const result = await axios.post('http://localhost:4000/checkfollowing', { following }, { headers: { token } });
      setIsFollowing(result.data.isFollowing);
    }
    getApi();
  }, [following, token])


  const clickFollow = async () => {
    const result = await axios.post('http://localhost:4000/follow', { userId: following.id }, { headers: { token } });
    setIsFollowing(true);
    console.log(result.data);
  }

  const clickUnfollow = async () => {
    const result = await axios.post('http://localhost:4000/unfollow', { userId: following.id }, { headers: { token } });
    setIsFollowing(false);
    console.log(result.data);
  }
  //console.log(following)
  return (
    <Container>
      <Link to={`/user/${following.id}`}><img src={following.avatar} alt={following.avatar} /></Link>
      <Link to={`/user/${following.id}`}><span>{following.username}</span></Link>
      <div>{isFollowing ? <UnfollowButton onClick={clickUnfollow}>언팔로우</UnfollowButton> : <FollowButton onClick={clickFollow}>팔로우</FollowButton>}</div>
    </Container >
  )
}

export default Following;