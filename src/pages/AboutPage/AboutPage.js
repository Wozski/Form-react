import styled from "styled-components";

const Root = styled.div`
  width: 80%;
  margin: 0 10%;
`;
const Container = styled.div`
  border: 1px solid rgba(0, 12, 34, 0.2);
  padding: 50px;
  text-align: center;
  margin-top: 50px;
  font-size: 40px;
`;

export default function AboutPages() {
  return (
    <Root>
      <Container>
        這是一個練習 React
        的部落格，註冊帳號時切勿使用真實密碼，裡面有許多功能並不完善，希望經過訓練能夠越來越熟悉
        React 這套工具。
      </Container>
    </Root>
  );
}
