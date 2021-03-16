import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getPosts, getPagesLength } from "../../WebAPI.js";

const Root = styled.div`
  width: 80%;
  margin: 0 10%;
  border: 3px solid black;
  margin-top: 40px;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const PostTitle = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: black;
`;
const PostData = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const BottomPage = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
`;

const PageNumber = styled(Link)`
  color: black;
  border: 1px solid black;
  border-radius: 20%;
  padding: 10px;
  text-decoration: none;
  & + & {
    margin-left: 5px;
  }
  ${(props) =>
    props.$active &&
    `
  background: #F0FFFF;
  color: black;
  `}
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostData>{new Date(post.createdAt).toLocaleString()}</PostData>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
export default function HomePage() {
  const location = useLocation().pathname;
  const limit = 5;
  let { page } = useParams();
  if (!page) page = 1;
  const [posts, setPosts] = useState([]);
  let pagesNum = useRef();
  // 這是什麼鬼東西？ Google 解答後得到『useRef 是一個可以讓我們抓取到 DOM 節點的 hooks。呼叫 useRef 建立出一個物件實體，null 表示初始值設定為 null。』
  // 將建立的物件丟入我們要抓取的 DOM 元素的 ref attribute 中，做完這件事可以想成我們對這個 input 有了控制權。
  // 重點在於改變 current 的值不會觸發 re-render
  // 總結是，把東西變成物件了？然後修改值，不會 re-render? 不是很確定，但先暫時這樣。
  useEffect(() => {
    getPosts().then((posts) => {
      const postNum = posts.length;
      pagesNum.current = Math.ceil(postNum / limit);
      getPagesLength(page, limit).then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  }, [page]);
  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <BottomPage>
        {new Array(pagesNum.current).fill("").map((item, index) => {
          return (
            <PageNumber
              key={index}
              to={`/posts/${index + 1}`}
              $active={
                // 這裡的 active 應該是要判斷在哪一頁？
                location === `/posts/${index + 1}` ||
                (location === "/" && index === 0)
              }
            >
              {index + 1}
            </PageNumber>
          );
        })}
      </BottomPage>
    </Root>
  );
}
