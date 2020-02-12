import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useQuery } from "urql";
import { GET_POSTS } from ".";

const PostsWrapper = styled.div``;

const Posts: NextPage<Props> = ({}) => {
  const [{ data, error }] = useQuery({ query: GET_POSTS });

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }
  if (!data) return <h1>Loading</h1>;

  return (
    <PostsWrapper>
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </PostsWrapper>
  );
};

export default Posts;

interface Props {}
