import { Box, Tooltip } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../config/firebase";
import { IMessage } from "../types";
import TooltipMessage from "./TooltipMessage";
import Emotion from "./TooltipMessage/IconsMessage/Emotion";
import MessageRemove from "./TooltipMessage/MessageRemove";
import RemoveMessageForYou from "./TooltipMessage/RemoveMessageForYou";
import ShowFile from "./UploadFile/ShowFile";
import ShowFileImage from "./UploadImage/ShowFileImage";
import ShowMedia from "./UploadMedia/ShowMedia";

const StyledMessage = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  padding: 15px 15px 15px;
  border-radius: 8px;
  margin: 15px;
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
const StyledRemoveMessageRight = styled(StyledMessage)`
  background-color: "#e5ded8";
  border: 1px solid;
`;
const StyledRemoveMessageLeft = styled(StyledMessage)`
  margin-left: auto;

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
        unSent: dataTime,
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
            <Tooltip title={`Sent:${message.sent_at}`}>
              <Box>
                {message.urlMedia ? (
                  <ShowMedia name={message.nameMedia} url={message.urlMedia} />
                ) : (
                  <Box sx={{ display: "none" }}></Box>
                )}
                {message.urlFile ? (
                  <ShowFile url={message.urlFile}>{message.nameFile}</ShowFile>
                ) : (
                  <Box sx={{ display: "none" }}></Box>
                )}
                {message.urlImage ? (
                  <ShowFileImage value={message.urlImage} />
                ) : (
                  <Box sx={{ display: "none" }}></Box>
                )}
                {message.text}
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
              </Box>
            </Tooltip>
          </MessageType>
        </TooltipMessage>
      ) : (
        <RemoveMessageForYou onClick={handleRemoveMessageForYou}>
          {message.isDeleted ? (
            <Box sx={{ display: "none" }}></Box>
          ) : (
            <Box sx={{ position: "relative" }}>
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
