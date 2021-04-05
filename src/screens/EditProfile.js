import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import HeaderLayout from "../components/HeaderLayout";
import { Wrapper } from "../components/Nav/sharedStyle";

const Container = styled.div`
  min-width: 1310px;
  height: calc(100vh - 390px);
  display: flex;
  justify-content: center;
  align-items: center;
  form{
    width: 50%;
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

export default function EditProfile() {
  const loggedInUser = useSelector(state => state.userReducer.user);
  const token = localStorage.getItem('jwt');

  const [username, setUsername] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [vpassword, setVpassword] = useState('');
  const [bio, setBio] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    if (npassword !== vpassword) {
      alert("new password and validation password is not same")
    }
    const result = await axios.post('http://localhost:4000/edit/profile', { username, cpassword, npassword, vpassword, bio }, { headers: { token } });
    if (result?.data?.message === "Username already exists") {
      alert(result.data.message)
    }
    if (result?.data?.message === "Current password and new password are same") {
      alert(result.data.message)
    }
    console.log(result.data);
  }

  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder={loggedInUser.username} value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="current password" value={cpassword} onChange={e => setCpassword(e.target.value)} required />
            <input type="password" placeholder="new password" value={npassword} onChange={e => setNpassword(e.target.value)} />
            <input type="password" placeholder="new password for validate" value={vpassword} onChange={e => setVpassword(e.target.value)} />
            <input type="text" placeholder="introduction" value={bio} onChange={e => setBio(e.target.value)} />
            <button>프로필 편집</button>
          </form>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}