import React from "react";
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Signup() {
    const URL = 'http://localhost:5000'
    const toast = useToast()
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleShow = () => setShow(!show);

    const submitHandler =  async () => {
        if(!name || !email || !confirmPassword || !password){
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
              })
        }
        if(password !== confirmPassword){
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 3000,
                isClosable: true,
              })
              return
        }

        try {
            const config = {
                headers : {
                    "Content-type" : "application/json",
                },
            }
            const {data} = await axios.post(URL + "/api/user/register" , {name , email , password} , config)
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              localStorage.setItem('userInfo' , JSON.stringify(data));

              navigate('/chat');
        } catch (error) {
            toast({
                title: 'Error',
                description : error,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }

    return <>
        <VStack
            spacing={"5px"}
        >
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h={"1.75rem"} size={"sm"} onClick={handleShow}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h={"1.75rem"} size={"sm"} onClick={handleShow}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
            colorScheme="blue"
            width={"100%"}
            style={{marginTop : 15}}
            onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    </>;
}

export default Signup;
