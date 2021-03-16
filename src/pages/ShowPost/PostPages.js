import styled from "styled-components";
import { getPost, deletePage } from "../../WebAPI.js";
import {
  HashRouter as Router,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Container = styled.div`
  width: 80%;
  margin: 0px auto;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
`;
const PostTitle = styled.h1``;
const PostTime = styled.div`
  color: grey;
  font-weight: bold;
}`;
const PostBody = styled.p`
  font-size: 20px;
  white-space: pre-wrap;
`;
const Root = styled.div``;

const DeletButton = styled.button`
  width: 50px;
  height: 30px;
  font-size: 17px;
`;
const EditeButton = styled.button`
  margin-right: 10px;
  width: 50px;
  height: 30px;
  font-size: 17px;
`;

function Post({ post, id }) {
  const location = useLocation();
  const history = useHistory();
  const handleDelet = (e) => {
    deletePage(id);
    history.push("/");
  };
  return (
    <Container>
      <PostContainer>
        <EditeButton to="/eddit" $active={location.pathname === "eddit"}>
          編輯
        </EditeButton>
        <DeletButton onClick={handleDelet}>刪除</DeletButton>
        <PostTitle>{post.title}</PostTitle>
        <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
        <PostBody>{post.body}</PostBody>
      </PostContainer>
    </Container>
  );
}
Post.propTypes = {
  post: PropTypes.object,
};

export default function PostPages() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getPost(id).then((post) => setPost(post));
  }, [id]);
  return (
    <Root>
      <Post post={post} id={id} />
    </Root>
  );
}
