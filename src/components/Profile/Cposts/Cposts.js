import styled from "styled-components";
import Cpost from "./Cpost";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Cposts({ communityPostsId }) {
  //console.log(communityPostsId);
  return (
    <Container>
      {communityPostsId.length === 0 ? <NotFound>Community post not found</NotFound> : communityPostsId?.map((id, i) => <Cpost key={i} id={id} />)}
    </Container>
  )
}

export default Cposts;