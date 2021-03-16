import { getAuthToken } from "./utils";
const BASE_URL = `https://student-json-api.lidemy.me`;

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const getPagesLength = (pages, limit) => {
  return fetch(
    `${BASE_URL}/posts?_expand=user&_sort=createdAt&_order=desc&_page=${pages}&_limit=${limit}`
  ).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `${token}`,
    },
  }).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const post = (title, body) => {
  const token = getAuthToken();
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const deletePage = (id) => {
  const token = getAuthToken();
  fetch(`${BASE_URL}/posts/${id}?_expand=user`, {
    method: "Delete",
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
  }).then((res) => res.json());
};

export const edditPage = (title, body) => {
  const token = getAuthToken();
  fetch(`${BASE_URL}/posts`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};
