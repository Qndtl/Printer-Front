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
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 1fr;
`;

const TitleInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    height: 50px;
    border: 2px solid skyblue;
    border-radius: 25px;
    width: 80%;
    font-size: 20px;
    padding-left: 20px;
  }
`;

const FileInput = styled.div`
`;

const Preview = styled.div`
  margin-top: 50px;
`;
const MainImageCon = styled.div`
  display: flex;
  justify-content: center;
`;
const MainImage = styled.img`
  width: 600px;
`;
const SubImageCon = styled.div`
  display: flex;
  overflow: auto;
  width: 95%;
`;
const SubImage = styled.img`
  width: 300px;
  height: 200px;
  margin: 5px;
  flex-shrink: 0;
  object-fit: cover;
  background-color: grey;
`;

const Description = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  textarea {
    min-height: 600px;
    padding: 10px;
    font-size: 18px;
    height: 100%;
    resize: none;
    margin-bottom: 30px;
    outline: none;
  }
  button {
    height: 50px;
    border: none;
    background-color: skyblue;
    font-weight: 600;
    color: white;
    border-radius: 25px;
    font-size: 25px;
  }
`;

function GalleryUpload() {
  const token = useSelector(state => state.userReducer.user.token);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      formData.append(`galleryFiles`, files[0][i]);
    }
    const fileResult = await axios({
      method: "POST",
      url: process.env.NODE_ENV === "production" ?
        `https://four-top-printer.herokuapp.com/upload?title=${title}&description=${description}` :
        `http://localhost:4000/upload?title=${title}&description=${description}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token
      }
    });
    setTitle("");
    setDescription("");
    console.log(fileResult.data);
    history.push('/gallery');
  }
  return (
    <HeaderLayout>
      <Wrapper>
        <Container>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <TitleInput><input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title} required /></TitleInput>
            <FileInput><input type="file" id="galleryFiles" name="galleryFiles" onChange={onChange} multiple required /></FileInput>
            <Preview>
              <MainImageCon>
                <MainImage src={fileUrl[0]} />
              </MainImageCon>
              <SubImageCon>
                {fileUrl?.map((img, i) => <SubImage key={i} src={img} />)}
              </SubImageCon>
            </Preview>
            <Description>
              <textarea type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} value={description} />
              <button>submit</button>
            </Description>
          </Form>
        </Container>
      </Wrapper>
    </HeaderLayout>
  )
}

export default GalleryUpload;