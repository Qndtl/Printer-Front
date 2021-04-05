import styled from "styled-components";
import Gpost from "./Gpost";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Gposts({ galleryPostsId }) {
  //console.log(galleryPostsId);
  return (
    <Container>
      {galleryPostsId.length === 0 ? <NotFound>Gallery post not found</NotFound> : galleryPostsId?.map((id, i) => <Gpost key={i} id={id} />)}
    </Container>
  )
}

export default Gposts;