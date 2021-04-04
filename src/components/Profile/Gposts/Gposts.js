import styled from "styled-components";
import Gpost from "./Gpost";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Gposts({ galleryPostsId }) {
  //console.log(galleryPostsId);
  return (
    <Container>
      {galleryPostsId === 0 ? "Gallery post not found" : galleryPostsId?.map((id, i) => <Gpost key={i} id={id} />)}
    </Container>
  )
}

export default Gposts;