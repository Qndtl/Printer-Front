import styled from "styled-components"

const Container = styled.div`
  width: 250px;
  height: 370px;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  background-color: grey;
`;

const TextCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  span {
    margin: 5px 0px;
  }
`;

export default function SearchUser({ avatar, totalCount, username, following, followers }) {
  return (
    <Container>
      <Avatar src={avatar} />
      <TextCon>
        <span style={{ fontWeight: "600", fontSize: "20px" }}>{username}</span>
        <span>followers: {followers}</span>
        <span>following: {following}</span>
      </TextCon>
    </Container>
  )
}