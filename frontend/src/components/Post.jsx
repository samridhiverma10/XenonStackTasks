import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../components/css/Post.css";
import ReactHtmlParser from "html-react-parser";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";

import ReactQuill from "react-quill";

import ReactTimeAgo from "react-time-ago";
import axios from "axios";

const Post = ({ post }) => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);
  const toast = new useToast();
  const handleQuill = (val) => {
    setAnswer(val);
  };

  function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }

  const handleSubmitAnswer = async () => {
    if (post?._id && answer !== "") {
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/answers", body, config)
        .then((res) => {
          // console.log("Data is", res.data);
          toast({
            title: "Answer Added Successfully",
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
        description: "Answer can't be empty or there is some other error ",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setOpen(false);
  };

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
        <Text color="gray" mt={2} ml={1} fontSize={"xs"}>
          <LastSeen date={post?.createdAt} />
        </Text>
        <Spacer />
        <Button onClick={() => onOpenModal()} ml={6}>
          Answer
        </Button>
        <Flex>
          <Spacer />
        </Flex>
      </Flex>

      <Flex justifyContent="flex-start">
        <Text fontSize={"2xl"} mt={1}>
          {post?.questionName}
        </Text>
        <Modal
          className=".react-responsive-modal-modal "
          open={open}
          onClose={() => onCloseModal()}
          center
        >
          <Box>
            <Text fontSize={"2xl"}>{post?.questionName}</Text>
            <Text fontSize={"xs"}>
              asked by {post?.user?.userName} on{" "}
              {new Date(post?.createdAt).toLocaleString()}
            </Text>
          </Box>
          <Box>
            <ReactQuill
              className="ql-default-height ql-editor"
              placeholder="Enter your answer"
              value={answer}
              onChange={handleQuill}
            />
          </Box>
          <Button colorScheme="blue" mt={2} ml={3} onClick={handleSubmitAnswer}>
            Add Answer
          </Button>
          <Button
            colorScheme="red"
            mt={2}
            ml={2}
            onClick={() => setOpen(false)}
            type="submit"
          >
            Cancel
          </Button>
        </Modal>
      </Flex>

      {post.questionUrl === "" ? (
        " "
      ) : (
        <Center mt={2}>
          <Flex h="200px">{<Image src={post.questionUrl} />}</Flex>
        </Center>
      )}

      <Flex mt={2}>
        <Text mt={2}>{post?.allAnswers.length} Answer(s)</Text>
      </Flex>
      <Divider />

      {post?.allAnswers?.map((_a) => (
        <Box mt={5}>
          <Flex mt={2}>
            <Avatar h={8} w={8} src={_a?.user?.photo} />
            <Text color="gray" fontSize={"xl"} ml={2} mt={0}>
              {_a?.user?.userName}
            </Text>
            <Text mt={2} ml={2} fontSize={"xs"} color="gray">
              <LastSeen date={_a?.createdAt} />
            </Text>
          </Flex>
          <Flex mt={2}>
            <Text>{ReactHtmlParser(_a.answer)}</Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default Post;
