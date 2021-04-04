import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img``;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

function PayCard({ post }) {
  return (
    <Container>
      <Image src={post.image} />
      <Text>
        <span>{post.title}</span>
        <span>{post.price}원</span>
      </Text>
    </Container>
  )
}

export default PayCard;