import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton } from "@material-ui/core";
import React from "react";
import {
  faHeart,
  faSmile,
  faThumbsUp,
  faAngry,
  faGrinTongueSquint,
  faSadCry,
} from "@fortawesome/free-solid-svg-icons";
import { IMessage } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

type Props = {
  message: IMessage;
};
const ActionEmotion = ({ message }: Props) => {
  const handleActionEmotion = async (value: string) => {
    const getId = doc(db, "messages", message.id);
    let data: string | null = value;
    if (message.icon === value) {
      data = null;
    }
    await setDoc(
      getId,
      {
        icon: data,
      },
      { merge: true } // just update what is changed
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={() => handleActionEmotion("faHeart")}>
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>
      <IconButton onClick={() => handleActionEmotion("faSmile")}>
        <FontAwesomeIcon icon={faSmile} />
      </IconButton>
      <IconButton onClick={() => handleActionEmotion("faThumbsUp")}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </IconButton>
      <IconButton onClick={() => handleActionEmotion("faAngry")}>
        <FontAwesomeIcon icon={faAngry} />
      </IconButton>
      <IconButton onClick={() => handleActionEmotion("faGrinTongueSquint")}>
        <FontAwesomeIcon icon={faGrinTongueSquint} />
      </IconButton>
      <IconButton onClick={() => handleActionEmotion("faSadCry")}>
        <FontAwesomeIcon icon={faSadCry} />
      </IconButton>
    </Box>
  );
};

export default ActionEmotion;
