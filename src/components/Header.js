import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/actions';
import { UserIcon } from './Icons';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.6fr 1fr;
  grid-template-rows: 1fr;
  height: 140px;
  border-bottom: 1px solid black;
  align-items: center;
  min-width: 1310px;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: skyblue;
`;
const BrandName = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  span{
    &:first-child{
      font-size: 25px;
      margin: 5px 0px;
    }
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  ul{
    display: flex;
    li{
      margin: 0px 20px;
    }
  }
`;

const LoginMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  form{
    input{
      width: 190px;
      height: 35px;
      border-radius: 18px;
      padding: 10px;
      border: 1.5px solid black;
      font-size: 17px;
    }
  }
  button{
    display: none;
  }
`;

const Signup = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: skyblue;
`;

const Login = styled.div`
  padding: 5px 10px;
  color: forestgreen;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Logout = styled.div`
  padding: 5px;
  color: tomato;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

function Header() {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  //const loggedInUser = useSelector(state => state.userReducer.user);
  //console.log(isLoggedIn);
  const token = localStorage.getItem('jwt');
  const dispatch = useDispatch();
  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get('http://localhost:4000/me', { headers: { token } });
      if (result?.data?.response?.message === "Error in jwt verify") {
        dispatch(logout());
        localStorage.removeItem('jwt');
      }
    }
    if (token) {
      getApi();
    }
  }, [token, dispatch])

  const [search, setSearch] = useState('');
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/search', { search })
  }

  const clickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('jwt');
  }
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to='/'><Logo src="https://prisma-instaclone.s3.ap-northeast-2.amazonaws.com/printer/gallery/1616932080146_logo.JPG" /></Link>
        <BrandName>
          <span><Link to='/'>4TOP</Link></span>
          <span><Link to='/'>ALL 4th TO PEOPLE</Link></span>
        </BrandName>
      </LogoContainer>
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
      <LoginMenu>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
          <button></button>
        </form>
        {
          isLoggedIn ? <>
            <UserIcon />
            <Logout onClick={clickLogout}>Logout</Logout>
          </> : <>
            <Link to='/login'><Login>Login</Login></Link>
            <Link to='/signup'><Signup>Signup</Signup></Link>
          </>
        }
      </LoginMenu>
    </HeaderContainer>
  )
}

export default Header;