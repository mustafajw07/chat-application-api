import { Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Toast, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
  } from '@chakra-ui/react'
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { BellIcon , ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "../../misc/ProfileModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../../misc/ChatLoading";
import UserList from "../user/UserList";

function SideDrawer() {
    const URL = 'http://localhost:5000';

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {user , chats , setSelectedChat , setChats} = ChatState();

    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/');
    }

    const accessChat = async (id) => {
        try {
            setLoadingChat(true);
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post( URL+ `/api/chat`, { id }, config);
            
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
          } catch (error) {
            toast({
              title: "Error fetching the chat",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
    }

    const handleSearch = async () => {
        if(!search){
            toast({
                title: 'Please enter something',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-left'
              });
              return;
        }

        try {
            setLoading(true);
            const config = {
                headers : {
                    Authorization : `Bearer ${user.token}`,
                },
        }
            const {data} = await axios.get(URL + `/api/user?search=${search}` , config)
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error',
                description : error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
        }

    }

  return <>
  <Box
  display={"flex"}
  justifyContent={"space-between"}
  alignItems={"center"}
  bg={"white"}
  w={"100%"}
  p={"5px 10px"}
  borderWidth={"5px"}
  >
    <Tooltip label='Search Users to chat' hasArrow placement="bottom-end">
    <Button variant={"ghost"} onClick={onOpen}>
        <SearchIcon />
        <Text d={{base:"none" , md:"flex"}} px={4}>
            Search User
        </Text>
    </Button>
    </Tooltip>
    <Text fontSize={"2xl"}>
        Live-Chat-App
    </Text>
    <div>
        <Menu>
            <MenuButton p={1}>
                <BellIcon fontSize={"2xl"} m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar size={'sm'} cursor={'pointer'} name={user.user.name}/>
            </MenuButton>
            <MenuList>
                <ProfileModel user={user}>
                <MenuItem>
                My Profile
                </MenuItem>
                </ProfileModel>
                <MenuDivider />
                <MenuItem onClick={logout}>
                Logout
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
  </Box>
  <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"}>
            Search User
        </DrawerHeader>
        <DrawerBody>
            <Box
            display={"flex"}
            paddingBottom={2}
            >
                <Input
                placeholder="Search User"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>
                    Go
                </Button>
            </Box>
            {loading ? (
                <ChatLoading />
            ) : (
                searchResult?.map(user => (
                    <UserList key={user._id} user={user} handleFunction={() => accessChat(user._id)}/>
                ))
            )
            }
        </DrawerBody>
    </DrawerContent>
  </Drawer>
  </>;
}

export default SideDrawer;
