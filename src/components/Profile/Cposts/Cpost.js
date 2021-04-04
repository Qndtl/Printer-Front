import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 200px;
  margin: 8.7px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Hover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span{
    display: none;
  }
  &:hover{
    span{
      display: block;
      color: white;
      margin: 5px;
      font-size: 18px;
    }
    background-color: black;
    opacity: 0.7;
  }
`;

function Cpost({ id }) {
  const token = useSelector(state => state.userReducer.user.token);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get(`http://localhost:4000/onecommunity?id=${id?.id}`, { headers: { token } });
      setData(result.data);
      //console.log(result.data);
    }
    getApi();
  }, [id, token])
  return (
    <Container src={data?.post?.files[0]}>
      <Hover>
        <span>{data?.post?.subject}</span>
        <div style={{ display: "flex" }}>
          <span>{data?.post?.communityLike?.length} 🤍</span>
          <span>{data?.post?.communityComments?.length} 💬</span>
        </div>
      </Hover>
    </Container>
  )
}

export default Cpost;