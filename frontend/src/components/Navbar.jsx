import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  Avatar,
  Input,
  Image,
  Center,
  useToast,
} from "@chakra-ui/react";

import "../components/css/Navbar.css";
import Logo from "./Logo";
import { AiFillHome } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import "react-responsive-modal/styles.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { logout, selectUser } from "../feature/userSlice";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <NavBarContainer {...props}>
      <Logo w="200px" />
      <MenuLinks />
    </NavBarContainer>
  );
};

const MenuLinks = () => {
  const [question, setQuestion] = useState("");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [inputURL, setInputURL] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (question !== "") {
      const body = {
        questionName: question,
        questionUrl: inputURL,
        user: user,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/questions", body, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setOpen(false);

      toast({
        title: "Question Added Successfully",
        description: "Refresh the page to see the changes.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error occurred",
        description: "Please write something, Question field can't be empty",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleLogout = () => {
    if (window.confirm("You will be logged out. Are you Sure ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
        })
        .catch(() => {
          console.log("Error");
        });
    }
  };

  return (
    <Box>
      <Stack
        spacing={9}
        align="right"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["row", "row", "row", "row"]}
        pt={[2, 2, 0, 0]}
      >
        <NavLink to="/">
          <AiFillHome
            size={30}
            color="white"
            onMouseOver={({ target }) => (target.style.color = "black")}
            onMouseOut={({ target }) => (target.style.color = "white")}
          />
        </NavLink>
        <NavLink to="/articles">
          <RiPencilFill
            size={30}
            color="white"
            onMouseOver={({ target }) => (target.style.color = "black")}
            onMouseOut={({ target }) => (target.style.color = "white")}
          />
        </NavLink>
        <NavLink to="/updates">
          <MdOutlineTipsAndUpdates
            size={30}
            color="white"
            onMouseOver={({ target }) => (target.style.color = "black")}
            onMouseOut={({ target }) => (target.style.color = "white")}
          />
        </NavLink>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" variant="contained">
            <HamburgerIcon w={8} h={8} mt={-2} color="white" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Button onClick={() => onOpenModal()}>Ask Question</Button>
            </MenuItem>
            <Modal
              className=".react-responsive-modal-modal "
              open={open}
              onClose={() => onCloseModal()}
              center
            >
              <Flex>
                <Text fontFamily="Work Sans" fontSize="30px">
                  Add your question here
                </Text>
              </Flex>
              <Flex>
                <Input
                  padding="4"
                  bg="white"
                  color="black"
                  borderRadius={10}
                  placeholder="Type here..."
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Flex>
              <Flex>
                <Input
                  mt={2}
                  padding="4"
                  bg="white"
                  color="black"
                  borderRadius={10}
                  placeholder="Optional: Add any url of image"
                  type="text"
                  value={inputURL}
                  onChange={(e) => setInputURL(e.target.value)}
                />
              </Flex>
              <Center mt={2}>
                {inputURL !== "" && (
                  <Image
                    borderRadius="10px"
                    h="320px"
                    // w="300px"
                    src={inputURL}
                    alt="Image"
                  />
                )}
              </Center>
              <Button colorScheme="blue" mt={2} onClick={handleSubmit}>
                Add Question
              </Button>

              <Button
                colorScheme="red"
                mt={2}
                ml={1}
                onClick={() => setOpen(false)}
                type="submit"
              >
                Cancel
              </Button>
            </Modal>
            <MenuDivider />
            <MenuItem>
              <Avatar h="40px" w="40px" src={user?.photo} />

              <Button onClick={handleLogout} ml={4} colorScheme="red">
                Logout
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      w="100%"
      mb={8}
      p={3}
      bg="primary.900"
      color={["black", "black", "black", "black"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Navbar;
