import "./App.css";
import styled from "styled-components";
import { useState } from "react";

const InputStyleAll = styled.input`
  width: 287px;
  height: 23px;
  border: solid 1px #d0d0d0;
`;
const RadioStyleAll = styled.input`
  margin-top: 23px;
`;
const SubmitStyle = styled.input`
  width: 92px;
  height: 40px;
  border-radius: 3px;
  background-color: #fad312;
  margin-top: 55px;
`;
const Footer = styled.div`
  border: solid 3px #fad312;
  background-color: #fad312;
`;
const Error = styled.div`
  color: red;
  margin-top: 5px;
`;
function App() {
  const [state, setState] = useState({
    username: "",
    email: "",
    phone: "",
    radio: null,
    ask: "",
    other: "",
  });
  const [isTrue, setIsTrue] = useState({
    username: null,
    email: null,
    phone: null,
    radio: null,
    ask: null,
    other: null,
  });
  function handleSubmit(e) {
    const { username, email, phone, radio, ask, other } = state;
    if (
      username === "" &&
      email === "" &&
      phone === "" &&
      radio === null &&
      ask === ""
    ) {
      setIsTrue({
        username: false,
        email: false,
        phone: false,
        radio: false,
        ask: false,
        other: false,
      });
      alert("資料缺失，請填寫");
    } else if (
      username === "" ||
      email === "" ||
      phone === "" ||
      radio === null ||
      ask === ""
    ) {
      alert("資料缺失，請填寫");
    } else {
      alert(`
        暱稱： ${username}
        電子郵件： ${email}
        手機號碼：${phone}
        報名類型：${radio}
        哪邊知道活動：${ask}
        其他：${other}
      `);
    }
    e.preventDefault();
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setIsTrue({
      ...isTrue,
      [name]: true,
    });
    setState({
      ...state,
      [name]: value,
    });
    if (value === "") {
      setIsTrue({
        ...isTrue,
        [name]: false,
      });
    }
  };
  return (
    <div className="wrapper">
      <form className="apply__form" onSubmit={handleSubmit}>
        <div className="apply__title">新拖延運動報名表單</div>
        <div className="apply__adress">
          活動日期：2020/12/10 ~ 2020/12/11
          <br></br>
          活動地點：台北市大安區新生南路二段1號
        </div>
        <div className="apply__small-text">*必填</div>
        <div className="input-block required hide-error">
          <div className="input-block__title">暱稱</div>
          <InputStyleAll
            input
            type="text"
            name="username"
            placeholder="您的姓名"
            onChange={handleChange}
            value={state.username}
          ></InputStyleAll>
          {isTrue.username === false && <Error>此欄位必填</Error>}
        </div>
        <div className="input-block required hide-error">
          <div className="input-block__title">電子郵件</div>
          <InputStyleAll
            input
            type="text"
            name="email"
            placeholder="您的電子郵件"
            onChange={handleChange}
            value={state.email}
          ></InputStyleAll>
          {isTrue.email === false && <Error>此欄位必填</Error>}
        </div>
        <div className="input-block required hide-error">
          <div className="input-block__title">手機號碼</div>
          <InputStyleAll
            input
            type="text"
            name="phone"
            placeholder="您的手機號碼"
            onChange={handleChange}
            value={state.phone}
          ></InputStyleAll>
          {isTrue.phone === false && <Error>此欄位必填</Error>}
        </div>
        <div className="input-block required hide-error">
          <div className="input-block__title">報名類型</div>
          <div className="input-block__input">
            <RadioStyleAll
              input
              type="radio"
              name="radio"
              value="躺在床上用想像力實作"
              onChange={handleChange}
            ></RadioStyleAll>
            <label> 躺在床上用想像力實作</label>
          </div>
          <div className="input-block__input">
            <RadioStyleAll
              input
              type="radio"
              name="radio"
              value="趴在地上滑手機找現成的"
              onChange={handleChange}
            ></RadioStyleAll>
            <label> 趴在地上滑手機找現成的</label>
          </div>
          {isTrue.radio === false && <Error>此欄位必填</Error>}
        </div>
        <div className="input-block required hide-error">
          <div className="input-block__title">怎麼知道這個活動的？</div>
          <InputStyleAll
            input
            type="text"
            name="ask"
            placeholder="您的回答"
            onChange={handleChange}
            value={state.ask}
          ></InputStyleAll>
          {isTrue.ask === false && <Error>此欄位必填</Error>}
        </div>
        <div className="input-block">
          <div className="input-block__title">其他</div>
          <InputStyleAll
            input
            type="text"
            name="other"
            placeholder="您的回答"
            onChange={handleChange}
            value={state.other}
          ></InputStyleAll>
        </div>
        <SubmitStyle input type="submit" value="提交"></SubmitStyle>
        <div className="warring__text">請勿透過表單送出您的密碼。</div>
      </form>
      <div className="footer">
        <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
      </div>
    </div>
  );
}
export default App;
