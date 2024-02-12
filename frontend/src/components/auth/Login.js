import React from "react";
import { Text, useToast } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import "animate.css";

import "./Login.css";
import { Button } from "@chakra-ui/react";
const Login = () => {
  const toast = useToast();
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        toast({
          title: "Login Successfully",
          description: "Now help others with your valuable knowledge",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="bg-image container ">
      <Text
        fontWeight="bold"
        fontSize="4xl"
        fontFamily="Work Sans"
        color="white"
        className="animate__animated animate__fadeInUp"
      >
        Get Guidance
      </Text>

      <Text
        fontSize="1xl"
        fontFamily="Work Sans"
        color="white"
        className="animate__animated animate__slideInDown"
      >
        Ask questions, Clear confusions
      </Text>

      <Button
        mt={3}
        colorScheme="blackAlpha"
        onClick={handleSubmit}
        style={{ fontSize: "20px" }}
      >
        <FcGoogle style={{ margin: "3px" }} /> Sign in with google
      </Button>
    </div>
  );
};

export default Login;
