import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';
import Footer from "../components/Footer";
import { UserIcon } from "../components/Icons";
import { logout } from "../redux/actions";

const Wrapper = styled.div`
  min-width: 1310px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 80px;
`;
const LogoContainer = styled.div`
  margin-top: 50px;
`;
const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: skyblue;
`;
const BrandName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span{
    &:first-child{
      font-size: 35px;
      margin: 10px 0px;
    }
  }
`;
const LoginMenu = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
  form {
    input {
      outline: none;
      width: 190px;
      height: 35px;
      border-radius: 18px;
      border: 1.5px solid grey;
      padding: 10px;
      font-size: 17px;
      margin-right: 50px;
    }
    button {
      display: none;
    }
  }
  a{
    margin-left: 40px;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    li {
      margin: 0px 30px;
    }
  }
`;

const MonthlyWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  margin-top: 120px;
`;
const MonthlyContainer = styled.div`
  max-width: 1290px;
  width: 100%;
  display: flex;
`;
const MonthlyColumn = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  max-width: 430px;
  width: 100%;
  &:first-child{
    background-color: red;
    background-image: url(${props => props.src});
    background-size: cover;
  }
  &:nth-child(2){
    background-color: green;
    background-image: url(${props => props.src});
    background-size: cover;
  }
  &:last-child{
    background-color: blue;
    background-image: url(${props => props.src});
    background-size: cover;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  span{
    margin: 30px 0px 10px 0px;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logout = styled.div`
  display: flex;
  color: tomato;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 50px;
  padding: 0px 10px 4px 10px;
  border: 3px solid tomato;
  border-radius: 10px;
`;

const Signup = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: skyblue;
  padding: 0px 10px 4px 10px;
  border: 3px solid skyblue;
  border-radius: 10px;
`;

const Login = styled.div`
  padding: 5px 10px;
  color: forestgreen;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  padding: 0px 10px 4px 10px;
  border: 3px solid forestgreen;
  border-radius: 10px;
`;

function Home() {
  const loggedInUser = useSelector(state => state.userReducer.user);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/search', { search });
  }

  const clickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('jwt');
  }
  return (
    <>
      <Wrapper>
        <HeaderContainer>
          <LogoContainer>
            <Logo src="https://prisma-instaclone.s3.ap-northeast-2.amazonaws.com/printer/gallery/1616932080146_logo.JPG" />
            <BrandName><span>4TOP</span><span>ALL 4th TO PEOPLE</span></BrandName>
          </LogoContainer>
          <LoginMenu>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
              <button></button>
            </form>
            {
              isLoggedIn ? <>
                <Link to={`/user/${loggedInUser.id}`}><UserIcon size="28" /></Link>
                <Logout onClick={clickLogout}>Logout</Logout>
              </> : <>
                <Link to='/login'><Login>Login</Login></Link>
                <Link to='/signup'><Signup>Signup</Signup></Link>
              </>
            }
          </LoginMenu>
        </HeaderContainer>
        <NavBar>
          <ul>
            <Link to='/gallery'><li>3D갤러리</li></Link>
            <Link to='/community'><li>커뮤니티</li></Link>
            <Link to='/rental'><li>렌탈</li></Link>
            <Link to='/promotion'><li>프로모션</li></Link>
            <Link to='/magazine'><li>매거진</li></Link>
            <Link to='/company'><li>회사소개</li></Link>
            {/* <Link to='/service'><li>고객센터</li></Link> */}
          </ul>
        </NavBar>
        <MonthlyWrapper>
          <MonthlyContainer>
            <MonthlyColumn src={null}>이달의 무료 작품</MonthlyColumn>
            <MonthlyColumn src={null}>이달의 유료 작품</MonthlyColumn>
            <MonthlyColumn src={null}>이달의 크리에이터</MonthlyColumn>
          </MonthlyContainer>
        </MonthlyWrapper>
        <BannerContainer>
          <Banner>Banner</Banner>
          <span>프로모션/매거진</span>
          <Banner>Banner</Banner>
          <span>렌탈</span>
          <Banner>Banner</Banner>
          <span>회사소개</span>
          <Banner>Banner</Banner>
        </BannerContainer>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Home;