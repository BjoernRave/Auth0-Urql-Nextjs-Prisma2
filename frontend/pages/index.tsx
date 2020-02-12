import gql from "graphql-tag";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { useClient } from "urql";

export const GET_POSTS = gql`
  {
    posts {
      id
      title
      text
    }
  }
`;

const HomeWrapper = styled.div``;

const Home: NextPage<Props> = () => {
  const [posts, setPosts] = useState([]);
  const urqlClient = useClient();

  const requestPosts = async () => {
    const response = await urqlClient.query(GET_POSTS).toPromise();
    console.log(response);
    if (response.error) return console.log(response.error);

    setPosts(response.data.posts);
  };

  return (
    <HomeWrapper>
      Welcome
      <Link href="/api/login">
        <a>Login</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <button onClick={requestPosts}>Make request</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </HomeWrapper>
  );
};

export default Home;

interface Props {}
