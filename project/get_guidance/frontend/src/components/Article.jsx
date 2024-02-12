import "react-responsive-modal/styles.css";
import "../components/css/Post.css";

import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

import ReactHtmlParser from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import React from "react";
const Article = ({ post }) => {
  return (
    <Box
      m={2}
      className="setSize"
      padding="4"
      bg="white"
      color="black"
      borderRadius={10}
    >
      <Flex justifyContent="flex-start">
        <Avatar h={8} w={8} src={post?.user?.photo} />
        <Text fontSize={"xl"} ml={2} mt={0}>
          {post?.user?.userName}
        </Text>
      </Flex>
      <Flex justifyContent="flex-start">
        <Text fontSize={"2xl"} mt={1}>
          {ReactHtmlParser(post?.articleName)}
        </Text>
      </Flex>
    </Box>
  );
};

export default Article;
