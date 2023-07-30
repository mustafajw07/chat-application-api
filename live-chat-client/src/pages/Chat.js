import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import {Box} from '@chakra-ui/react';
import SideDrawer from "../components/chat/SideDrawer";
import ChatBox from "../components/chat/ChatBox";
import MyChat from "../components/chat/MyChat";

function Chat() {
    let {user} = ChatState();
  return <div style={{width : "100%"}}>
    {user && <SideDrawer />}
    <Box
    display={"flex"}
    justifyContent={"space-between"}
    w={"100%"}
    h={"91.5vh"}
    p={'10px'}
    >
    {user && <MyChat />}
    {user && <ChatBox />}
    </Box>
    </div>;
}

export default Chat;
