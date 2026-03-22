import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image;

    // upload image if exists
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // check if conversation exists
    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] },
    });

    // create new message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    // create or update conversation
    if (!conversation) {
      conversation = await Conversation.create({
        partcipants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: `send message error ${error}` });
  }
};