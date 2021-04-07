import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import HeaderLayout from "../components/HeaderLayout";
import { Wrapper } from "../components/Nav/sharedStyle";

const Container = styled.div`
  max-width: 1310px;
  min-width: 1024px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const FileInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  select {
    width: 150px;
    height: 30px;
    font-size: 16px;
  }
`;

const Preview = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  margin-top: 30px;
`;

const TextInputs = styled.div`
  display: flex;
  flex-direction: column;
  input {
    font-size: 20px;
    margin-bottom: 10px;
  }
  textarea{
    height: 500px;
    outline: none;
    resize: none;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px;
  }
  button {
    height: 50px;
    border: none;
    border-radius: 25px;
    background-color: skyblue;
    font-weight: 600;
    font-size: 20px;
    color: white;
  }
`;

function CommunityUpload() {
  const token = useSelector(state => state.userReducer.user.token);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('오토캐드');
  const history = useHistory();
  const [fileUrl, setFileUrl] = useState([]);
  const image = [];

  const onChange = e => {
    const filesNum = e.target.files.length;
    const filelist = e.target.files;
    for (let i = 0; i < filesNum; i++) {
      setFiles([...files, filelist]);
    }
    for (let i = 0; i < filelist.length; i++) {
      if (filelist[i].type === 'image/jpeg' || filelist[i].type === 'image/png') {
        image.push(URL.createObjectURL(filelist[i]));
      }
    }
    setFileUrl(image);
  }

  const onSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    console.log(files[0]?.length)
    for (let i = 0; i < files[0]?.length; i++) {
      formData.append(`communityFiles`, files[0][i]);
    }
    const fileResult = await axios({
      method: "POST",
      url: process.env.NODE_ENV === "production" ?
        `https://four-top-printer.herokuapp.com/communityupload?title=${title}&description=${description}&subject=${action}` :
        `http://localhost:4000/communityupload?title=${title}&description=${description}&subject=${action}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token
      }
    });
    setTitle("");
    setDescription("");
    console.log(fileResult.data);
    history.push('/community');
  }
  //console.log(action)
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <Form id="action" onSubmit={onSubmit} encType="multipart/form-data">
            <FileInputs>
              <div>
                <input type="file" id="galleryFiles" name="galleryFiles" onChange={onChange} required />
                <select name="action" id="action" form="action" onChange={e => setAction(e.target.value)}>
                  <option value="오토캐드">오토캐드</option>
                  <option value="팅커캐드">팅커캐드</option>
                  <option value="마야">마야</option>
                  <option value="3d-max">3d-max</option>
                  <option value="blender">blender</option>
                  <option value="3d-printer">3d-printer</option>
                  <option value="스트라타시스">스트라타시스</option>
                  <option value="신도">신도</option>
                  <option value="3d-system">3d-system</option>
                  <option value="프로토텍">프로토텍</option>
                  <option value="자유게시판">자유게시판</option>
                </select>
              </div>
              <Preview src={fileUrl[0]} />
            </FileInputs>
            <TextInputs>
              <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title} required />
              <textarea type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} value={description} />
              <button>submit</button>
            </TextInputs>
          </Form>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}

export default CommunityUpload;