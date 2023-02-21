import { IMessage } from "@/types";
import { transformMessage } from "@/utils/getMessagesInConversation";
import { Box } from "@mui/material";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import Message from "./Message";

type Props = {
  messagesLoading: boolean;
  messagesSnapshot: QuerySnapshot<DocumentData> | undefined;
  messages: IMessage[];
};

const MessageConversation = ({
  messagesLoading,
  messagesSnapshot,
  messages,
}: Props) => {
  // If front-end is loading messages behind the scenes, display messages retrieved from Next SSR (passed down from [id].tsx)
  if (messagesLoading) {
    return (
      <>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </>
    );
  }

  // If front-end has finished loading messages, so now we have messagesSnapshot
  else if (messagesSnapshot) {
    return (
      <>
        {messagesSnapshot.docs.map((message, index) => (
          <Message key={index} message={transformMessage(message)} />
        ))}
      </>
    );
  }

  return <Box sx={{ display: "none" }}></Box>;
};
export default MessageConversation;
