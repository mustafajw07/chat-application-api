const asyncHandler = require('express-async-handler');
const User = require('../models/UserMode');
const Chat = require('../models/chatModel');


const accessChat = asyncHandler(
    async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'No id' })
        }
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: id } } },
            ]
        }).populate("users", "-password").populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name pic email'
        });

        if (isChat.length > 0) {
            res.send(isChat[0])
        } else {
            let charData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, id]
            };
            try {
                const createChat = await Chat.create(charData);
                const FullChat = await Chat.findOne({ _id: createChat.id }).populate("users", "-password")
                res.status(200).json(FullChat);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error });
            }
        }
    }
)

const fetchChat = asyncHandler(
    async (req, res) => {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "name pic email",
                    });
                    res.status(200).send(results);
                });
        } catch (error) {

        }
    }
)

const createGroupChat = asyncHandler(
    async (req, res) => {
        if (!req.body.users || !req.body.name) {
            return res.status(400).json({ message: "Please Fill all the feilds" });
        }
        let users = JSON.parse(req.body.users);
        if (users.length < 2) {
            return res.status(400).json("More than 2 users are required to form a group chat");
        }
        users.push(req.user);
        try {
            const groupChat = await Chat.create({
              chatName: req.body.name,
              users: users,
              isGroupChat: true,
              groupAdmin: req.user,
            });
        
            const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
              .populate("users", "-password")
              .populate("groupAdmin", "-password");
        
            res.status(200).json(fullGroupChat);
          } catch (error) {
            res.status(400).json(error.message);
          }
    }
)

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });

  const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });

  const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });

module.exports = { accessChat, fetchChat, createGroupChat ,renameGroup , removeFromGroup , addToGroup};