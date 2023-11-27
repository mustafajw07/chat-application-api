const asyncHandler = require('express-async-handler');
const User = require('../models/UserMode');
const Chat = require('../models/chatModel');
const Message = require('../models/MessageModel');


const sendMessage = asyncHandler(async (req,res) => {
    const {content , chatId} = req.body;
    if(!content || !chatId) {
        return res.sendStatus(400)
    }
    var newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId
    }
    try {
        var message =  await Message.create(newMessage);
        message = await message.populate("sender" , "name pic");
        message = await message.populate("chat");
        message = await User.populate(message , {
            path:"chat.users",
            select: "name pic email"
        });
        await Chat.findByIdAndUpdate(req.body.chatId , {
            latestMessage : message
        });
        res.status(200).json(message);
    } catch (error) {
        res.sendStatus(400);
        return res.status(400).json({ error });
    }
})

const allMessages = asyncHandler(async (req , res) => {
    try {
        var chatId = req.params.chatId;
        var message = await Message.find({chatId}).populate(
            "sender" , "name pic email"
        ).populate("chat")
        res.status(200).json(message);
    } catch (error) {
        res.sendStatus(400);
        return res.status(400).json({ error });
    }
})

module.exports = { sendMessage , allMessages }