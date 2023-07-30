import React, { useEffect } from "react";
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo) {
            navigate('/');
        }
    },[navigate])
    
    return <>
        <Container maxW='xl' centerContent>
            <Box
                display={"flex"}
                justifyContent={"center"}
                p={3}
                bg={"#f4f5f8"}
                w={"100%"}
                m={"40px 0 15px 0"}
                borderWidth={"1px"}
                borderRadius={"lg"}
            >
                <Text fontSize={"4xl"} color={"black"}>
                    Live Chat App
                </Text>
            </Box>
            <Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"}>
                <Tabs variant='soft-rounded'>
                    <TabList mb={"1em"}>
                        <Tab width={"50%"}>Login</Tab>
                        <Tab width={"50%"}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                             <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    </>;
}

export default Home;
