import styled from "styled-components";
import { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import AddPage from "./Pages/AddPage";
import AboutPage from "./Pages/AboutPage";
import EdditPage from "./Pages/EdditPage";
import Header from "./Header";
import PostPages from "./Pages/ShowPost";
import RegisterPage from "./Pages/RegisterPage";
import { AuthContext } from "./contexts";
import { getMe } from "./WebAPI";
const Root = styled.div``;
function App() {
  const [isLoding, setIsLoding] = useState(true);
  console.log(isLoding);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // 有 token 才打 api
    getMe().then((response) => {
      if (response.ok) {
        // 重新整理後，不會改變登入狀況
        setUser(response.data);
        setIsLoding(false);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/posts/:page">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/new-post">
              <AddPage />
            </Route>
            <Route exact path="/eddit">
              <EdditPage />
            </Route>
            <Route exact path="/post/:id">
              <PostPages />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
