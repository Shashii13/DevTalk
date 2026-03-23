import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useSelector } from "react-redux";
import { socket } from "../socket";

function Chat() {
  const { selectedUser, userData } = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔹 Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(res.data);
      } catch (error) {
        console.log("error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // 🔥 Real-time listener
  useEffect(() => {
    if (!selectedUser) return;

    socket.on("newMessage", (newMsg) => {
      if (
        newMsg.sender === selectedUser._id ||
        newMsg.receiver === selectedUser._id
      ) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const handleSend = async () => {
    if (!text.trim()) return;

    setSending(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        { message: text },
        { withCredentials: true }
      );

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (error) {
      console.log("error sending message");
    } finally {
      setSending(false);
    }
  };

  // 🔸 No user selected
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">

      {/* Header */}
      <div className="p-4 border-b font-semibold">
        {selectedUser.name || selectedUser.userName}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">

        {loading ? (
          <p className="text-center text-gray-500">
            Loading messages...
          </p>
        ) : (
          <>
            {!messages.length && (
              <p className="text-center text-gray-400">
                No messages yet. Start conversation 👋
              </p>
            )}

            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`max-w-[60%] p-2 rounded ${
                  msg.sender === userData._id
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.message}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="img"
                    className="mt-2 rounded"
                  />
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </>
        )}

      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSend}
          disabled={sending}
          className={`px-4 rounded text-white ${
            sending ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>

    </div>
  );
}

export default Chat;