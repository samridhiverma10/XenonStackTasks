import { Container, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Post from "./Post";

import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("./api/questions")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Container mt={-8} maxW="100%" bg="gray.200" centerContent>
      <Text
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          fontFamily: "Work Sans",
          color: "#6D6C69",
        }}
      >
        Recent Posts
      </Text>

      {posts.reverse().map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Container>
  );
};

export default Feed;
