import styled from "styled-components"
import { Facebook, Instagram, Twitter, Youtube } from "./Icons";

const Container = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid grey;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  margin-top: 50px;
`;

const SNSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin: 20px;
  }
`;

const PhoneNumCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddressCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  return (
    <Container>
      <SNSContainer>
        <a href="https://www.facebook.com/"><Facebook size="36" /></a>
        <a href="https://www.instagram.com/"><Instagram size="36" /></a>
        <a href="https://twitter.com/"><Twitter size="36" /></a>
        <a href="https://www.youtube.com/"><Youtube size="36" /></a>
      </SNSContainer>
      <PhoneNumCon>000-000-0000</PhoneNumCon>
      <AddressCon>00시 00동 00-00</AddressCon>
    </Container>
  )
}