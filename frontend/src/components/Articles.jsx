import { Box, Text, Button, Container, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Article from "./Article";
import axios from "axios";

// import Article from "./Article";
import { selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
const Articles = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [article, setArticle] = useState("");

  const toast = useToast();
  useEffect(() => {
    axios
      .get("./api/articles")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);
  const handleSubmitArticle = async () => {
    if (article !== "") {
      const body = {
        articleName: article,
        user: user,
      };
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/articles", body, config)
        .then(() => {
          toast({
            title: "Article Added Successfully",
            description: "Refresh the page to see changes",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast({
        title: "Error Occurred",
        description: "Article can't be empty or there is some other error ",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleQuill = (val) => {
    setArticle(val);
  };
  return (
    <Container mt={-8} maxW="100%" bg="gray.200" centerContent>
      <Box ml={7}>
        <Text fontSize="3xl" color="red.300">
          Suggested Topics
        </Text>
        <Text fontSize="1xl" color="black">
          Life at our College.
        </Text>
        <Text fontSize="1xl" color="black">
          Guide freshers who are in first year.
        </Text>
        <Text fontSize="1xl" color="black">
          Give a roadmap to 1st or 2nd year students.
        </Text>
        <Text fontSize="1xl" color="black">
          Share resources to learn DSA(Most important in interviews)
        </Text>
        <Text fontSize="1xl" color="black">
          Tips to improve communication skills
        </Text>
      </Box>
      <Box bg="grey.100" p={2}>
        <ReactQuill
          className="ql-default-height ql-editor"
          placeholder="Write about anything you want"
          onChange={handleQuill}
          value={article}
        />
      </Box>
      <Button ml={6} mt={2} colorScheme="green" onClick={handleSubmitArticle}>
        Post Now
      </Button>
      <Text
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          fontFamily: "Work Sans",
          color: "#6D6C69",
        }}
        mt={2}
      >
        Recent Articles
      </Text>
      {posts.reverse().map((post, index) => (
        <Article key={index} post={post} />
      ))}
    </Container>
  );
};

export default Articles;
