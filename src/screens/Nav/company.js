import HeaderLayout from "../../components/HeaderLayout";
import { Wrapper } from "../../components/Nav/sharedStyle";
import styled from 'styled-components';
import { useState } from "react";
import Intro from "../../components/Nav/company/Intro";
import Greet from "../../components/Nav/company/Greet";
import Vision from "../../components/Nav/company/Vision";
import History from "../../components/Nav/company/History";


const IntroContainer = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  span{
    &:first-child{
      font-size: 40px;
      font-weight: 600;
    }
    &:last-child{
      margin: 20px 0px;
    }
  }
`;

const AboutContainer = styled.div`
  margin-top: 50px;
  min-width: 1000px;
  max-width: 1000px;
`;
const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  height: 60px;
  font-size: 23px;
  border-left: 1px solid black;
  border-top: 1px solid black;
  margin-bottom: 50px;
`;
const Column = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  &:first-child{
    border-bottom: ${props => props.action === "intro" && "none"};
    font-weight: ${props => props.action === "intro" && 600};
  }
  &:nth-child(2){
    border-bottom: ${props => props.action === "greet" && "none"};
    font-weight: ${props => props.action === "greet" && 600};
  }
  &:nth-child(3){
    border-bottom: ${props => props.action === "vision" && "none"};
    font-weight: ${props => props.action === "vision" && 600};
  }
  &:last-child{
    border-bottom: ${props => props.action === "history" && "none"};
    font-weight: ${props => props.action === "history" && 600};
  }
  cursor: pointer;
`;
const ContentContainer = styled.div``;

function Company() {
  const [action, setAction] = useState('intro');
  return (
    <HeaderLayout>
      <Wrapper>
        <IntroContainer>
          <span>4TOP</span>
          <span>회사 한줄 소개</span>
        </IntroContainer>
        <AboutContainer>
          <ColumnContainer>
            <Column action={action} onClick={() => setAction('intro')}>소개</Column>
            <Column action={action} onClick={() => setAction('greet')}>인사말</Column>
            <Column action={action} onClick={() => setAction('vision')}>비전&미션</Column>
            <Column action={action} onClick={() => setAction('history')}>연혁</Column>
          </ColumnContainer>
          <ContentContainer>
            {
              action === "intro" ? (<Intro />) : (action === "greet") ? (<Greet />) : (action === "vision") ? (<Vision />) : (<History />)
            }
          </ContentContainer>
        </AboutContainer>
      </Wrapper>
    </HeaderLayout>
  )
}

export default Company;