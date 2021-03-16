import styled from "styled-components";
import { edditPage } from "../../WebAPI.js";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  width: 80%;
  margin: 0px auto;
`;
const LoginContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  text-align: center;
`;
const TitleContainer = styled.textarea`
  width: 600px;
  border: 3px solid #cccccc;
  padding: 5px;
`;
const BodyContainer = styled.textarea`
  width: 600px;
  height: 120px;
  border: 3px solid #cccccc;
  padding: 5px;
  font-family: Tahoma, sans-serif;
  background-position: bottom right;
  background-repeat: no-repeat;
`;
const ErrorMessage = styled.div`
  color: red;
`;
const TitleSize = styled.div`
  font-size: 30px;
`;

export default function NewPages() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    edditPage(title, body);
    history.push("/");
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  return (
    <Container>
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <TitleSize>
            <div>標題:</div>
            <TitleContainer
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </TitleSize>
          <TitleSize>
            <div>內容: </div>
            <BodyContainer
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </TitleSize>
          <button>發文</button>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </LoginContainer>
    </Container>
  );
}
