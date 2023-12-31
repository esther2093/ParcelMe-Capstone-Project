import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function ChatMessages({ value, index, currentUser, users, userMessageGroups, setUpdateList }) {
  const [messageText, setMessageText] = useState("");
  const messageContainerRef = useRef(null);

  //setting the keys of userMessageGroups as the userId for other person on chat 
  const otherUserId = Object.keys(userMessageGroups)[value];
  //finding the user with the same id as the previously defined otherUserId
  const otherUser = users.find((user) => user.id === parseInt(otherUserId, 10));
  //creating a messagetab for each otherUserId
  const messagesForTab = userMessageGroups[otherUserId];

  //handle for submitting new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("senderId", currentUser.id);
    data.append("receiverId", otherUserId);

    try {
      //posting to database
      const response = await axios.post("/api/messages/create", Object.fromEntries(data.entries()));
      let newMessage = response.data.data;

      if (newMessage) {
        //updating the message list to re-render parent
        setUpdateList(newMessage);
        //clearing message textfield 
        setMessageText("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  //making the chat always scroll to the bottom of the box whenever there is a change to userMessageGroups 
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [userMessageGroups]);

  return (
    <Box role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} sx={{ width: "100%" }}>
      <Box sx={{ pl: "1em", pr: "1em", pt: "1em" }}>
        {value === index && (
          <Box sx={{ height: 260, overflow: "auto" }} ref={messageContainerRef}>
            {messagesForTab.map((message, messageIndex) => (
              <Box
                key={messageIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: message.senderId === currentUser.id ? "flex-end" : "flex-start",
                  padding: "0.5em",
                }}
              >
                <Box sx={{ padding: "0.1em 0.5em 0.1em 0em" }}>
                  <Avatar
                    src={message.senderId === currentUser.id ? currentUser.profilePicture : otherUser ? (otherUser.profilePicture || "") : ""}
                    sx={{ width: 25, height: 25 }}
                  />
                </Box>
                <Typography variant="body1" sx={{ fontSize: "0.8em", maxWidth: "60%" }}>
                  {message.content}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", padding: "0.5em" }}>
        <TextField
          required
          fullWidth
          autoFocus
          id="content"
          helperText="*Please do not share credit card details through chat"
          name="content"
          variant="outlined"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        <Button type="submit" variant="filled" sx={{ margin: "1em 0em 2.6em 1em" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
