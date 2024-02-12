import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import ReactQuill from "react-quill";
import "react-responsive-modal/styles.css";
import Update from "./Update";
import axios from "axios";

import { selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Updates = () => {
  useEffect(() => {
    axios
      .get("./api/updates")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const onCloseModal = () => setOpen(false);
  const [updateName, setUpdateName] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const user = useSelector(selectUser);
  const handleSubmitUpdate = async () => {
    if (updateName !== "" && updateContent !== "") {
      const body = {
        updateName: updateName,
        updateContent: updateContent,
        user: user,
      };
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/updates", body, config)
        .then(() => {
          toast({
            title: "Update Added Successfully",
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
        description: "Update can't be empty or there is some other error ",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setOpen(false);
  };
  const handleQuill = (val) => {
    setUpdateContent(val);
  };
  return (
    <div>
      <Container mt={-8} maxW="100%" bg="gray.200" centerContent>
        <Box ml={7}>
          <Button mt={2} colorScheme="green" onClick={() => onOpenModal()}>
            Give Update
          </Button>
          <Modal
            className=".react-responsive-modal-modal "
            open={open}
            onClose={() => onCloseModal()}
            center
          >
            <Flex>
              <Text fontFamily="Work Sans" fontSize="30px">
                Give details about your update
              </Text>
            </Flex>
            <Flex>
              <Input
                padding="4"
                bg="white"
                color="black"
                borderRadius={10}
                placeholder="Short title of update"
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </Flex>
            <Flex>
              <Box bg="grey.100">
                <ReactQuill
                  className="ql-default-height ql-editor"
                  placeholder="Give more detail about your update"
                  onChange={handleQuill}
                  value={updateContent}
                />
              </Box>
            </Flex>
            <Flex>
              <Button mt={4} colorScheme="teal" onClick={handleSubmitUpdate}>
                Update Now
              </Button>
            </Flex>
          </Modal>
        </Box>
        <Text
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            fontFamily: "Work Sans",
            color: "#6D6C69",
          }}
          mt={2}
        >
          Recent Updates
        </Text>
        {posts.reverse().map((post, index) => (
          <Update key={index} post={post} />
        ))}
      </Container>
    </div>
  );
};

export default Updates;
