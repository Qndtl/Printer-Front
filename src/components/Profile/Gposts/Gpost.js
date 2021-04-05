import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      font-size: 20px;
    }
    background-color: black;
    opacity: 0.5;
  }
`;

function Gpost({ id }) {
  const token = useSelector(state => state.userReducer.user.token);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get(process.env.NODE_ENV === "production" ?
        `https://four-top-printer.herokuapp.com/onegallery?id=${id?.id}` :
        `http://localhost:4000/onegallery?id=${id?.id}`, { headers: { token } });
      setData(result.data);
      //console.log(result.data);
    }
    getApi();
  }, [id, token])
  return (
    <Link to={`/gallerypost/${data?.post?.id}`}>
      <Container src={data?.post?.files[0]}>
        <Hover>
          <span>{data?.post?.galleryLike?.length} 🤍</span>
          <span>{data?.post?.galleryComments?.length} 💬</span>
        </Hover>
      </Container>
    </Link>
  )
}

export default Gpost;