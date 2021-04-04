import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 690px;
  form{
    display: flex;
    flex-direction: column;
    input {
      height: 50px;
      border-radius: 25px;
      border: 1.5px solid grey;
      padding: 20px;
      margin-bottom: 40px;
      font-size: 18px;
    }
    button {
      height: 50px;
      border-radius: 25px;
      outline: none;
      border: none;
      background-color: skyblue;
      color: white;
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 40px;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  span {
    margin-top: 5px;
    font-size: 24px;
    font-weight: 600;
  }
`;
const Logo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: skyblue;
`;

const Login = styled.div`
  text-align: center;
  font-size: 20px;
  span {
    color: skyblue;
    font-weight: 600;
  }
`;

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:4000/signup', { username, email, password });
    if (result.data.message === "회원가입 완료.") {
      history.push('/login');
    }
  }
  return (
    <Wrapper>
      <FormContainer>
        <LogoContainer>
          <Link to='/'><Logo /></Link>
          <span>4TOP</span>
        </LogoContainer>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button>Submit</button>
        </form>
        <Login>
          <p>You already have an account? <Link to='/login'><span>Log in</span></Link></p>
        </Login>
      </FormContainer>
    </Wrapper>
  )
}

export default Signup;