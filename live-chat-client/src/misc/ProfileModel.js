import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Image,
    Text
  } from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";

function ProfileModel({user , children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return <>
    {
    children ? <span onClick={onOpen}> {children}</span> : (
        <IconButton d={{base : 'flex'}} icon={<ViewIcon />} onClick={onOpen}/>
    )
    }

    <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        // h={"400px"}
        >
          <ModalHeader
          fontSize={"40px"}
          display={"flex"}
          justifyContent={"center"}
          >{user.user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          >
            {/* <Image 
            borderRadius="full"
            boxSize={"150px"}
            src={user.user.pic}
            alt={user.user.name}
            /> */}
            <Text
            fontSize={{base : "28px" , md : "30px"}}
            >
                Email : {user.user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>;
}

export default ProfileModel;
