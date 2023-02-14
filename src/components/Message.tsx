import { Box } from "@mui/material";
import { height } from "@mui/system";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../config/firebase";
import { IMessage } from "../types";
import TooltipMessage from "./TooltipMessage";
import Emotion from "./TooltipMessage/IconsMessage/Emotion";
import MessageRemove from "./TooltipMessage/MessageRemove";
import RemoveMessageForYou from "./TooltipMessage/RemoveMessageForYou";

interface Props {
  messages: IMessage[];
}

const StyledMessage = styled.p`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px;
  position: relative;
`;

const StyledSenderMessage = styled(StyledMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const StyledReceiverMessage = styled(StyledMessage)`
  background-color: whitesmoke;
`;

const StyledTimestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: x-small;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;
const StyledRemoveMessage = styled(StyledMessage)`
  background-color: "#e5ded8";
  border: 1px solid;
`;

const Message = ({ message }: { message: IMessage }) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const MessageType =
    loggedInUser?.email === message.user
      ? StyledSenderMessage
      : StyledReceiverMessage;

  const handleDeletedMessage = async () => {
    const getId = doc(db, "messages", message.id);
    const event = new Date();
    const dataTime = event.toLocaleString("en-US");

    await setDoc(
      getId,
      {
        isShow: false,
        un_sent: dataTime,
      },
      { merge: true } // just update what is changed
    );
  };
  const handleRemoveMessageForYou = async () => {
    const getId = doc(db, "messages", message.id);
    await setDoc(
      getId,
      {
        isDeleted: true,
      },
      { merge: true } // just update what is changed
    );
  };

  return (
    <Box>
      {message.isShow ? (
        <TooltipMessage message={message} onClick={handleDeletedMessage}>
          <MessageType>
            {message.text}
            <StyledTimestamp>Sent:{message.sent_at} </StyledTimestamp>
            {message.icon ? (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "25px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  color: "red",
                }}
              >
                <Emotion message={message} />
              </Box>
            ) : (
              <Box sx={{ display: "none" }}></Box>
            )}
          </MessageType>
        </TooltipMessage>
      ) : (
        <RemoveMessageForYou onClick={handleRemoveMessageForYou}>
          {message.isDeleted ? (
            <Box sx={{ display: "none" }}></Box>
          ) : (
            <Box>
              <MessageRemove message={message}>
                <MessageType>Message is removed</MessageType>
              </MessageRemove>
            </Box>
          )}
        </RemoveMessageForYou>
      )}
    </Box>
  );
};

export default Message;
