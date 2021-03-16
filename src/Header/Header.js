import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../contexts";
import { setAuthToken } from "../utils";
import {
  HashRouter as Router,
  useHistory,
  Link,
  useLocation,
} from "react-router-dom";
const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: flexed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  box-sizing; border-box;
  background: rgba(0,0,0,0.8);
  color: white;
`;
const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;
const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing; border-box;
  weight: 100px;
  cursor: pointer;
  margin-right: 15px;
  height: 65px;
  width: 105px;
  color: white;
  text-decoration: none;
  ${(props) =>
    props.$active &&
    `
  background: rgba(0, 0, 0, 0.1)
  `}
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const { isLoding, setIsLoding } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的 Blog</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/about" $active={location.pathname === "about"}>
            關於
          </Nav>
          {user && (
            <Nav to="/new-post" $active={location.pathname === "new-post"}>
              發布文章
            </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && (
          <Nav to="/register" $active={location.pathname === "register"}>
            註冊
          </Nav>
        )}
        {!user && (
          <Nav to="/login" $active={location.pathname === "login"}>
            登入
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  );
}
