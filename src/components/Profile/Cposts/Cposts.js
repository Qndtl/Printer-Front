import styled from "styled-components";
import Cpost from "./Cpost";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Cposts({ communityPostsId }) {
  //console.log(communityPostsId);
  return (
    <Container>
      {communityPostsId.length === 0 ? "Community post not found" : communityPostsId?.map((id, i) => <Cpost key={i} id={id} />)}
    </Container>
  )
}

export default Cposts;