import styled from "styled-components";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { register } from "../../WebAPI";
const Container = styled.div`
  width: 80%;
  margin: 0px auto;
`;
const LoginContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  text-align: center;
`;
const ErrorMessage = styled.div`
  color: red;
`;
export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = (e) => {
    register(nickname, username, password);
    history.push("/");
  };
  return (
    <Container>
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <div>
            nickname:{" "}
            <input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <div>
            username:{" "}
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button>輸入</button>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </LoginContainer>
    </Container>
  );
}
