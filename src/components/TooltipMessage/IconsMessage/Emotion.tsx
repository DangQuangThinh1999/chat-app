import { IMessage } from "@/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@material-ui/core";
import React from "react";
import {
  faHeart,
  faSmile,
  faThumbsUp,
  faAngry,
  faGrinTongueSquint,
  faSadCry,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
  message: IMessage;
};

const Emotion = ({ message }: Props) => {
  switch (message.icon) {
    case "faHeart":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faHeart} />
        </Tooltip>
      );
    case "faSmile":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faSmile} />
        </Tooltip>
      );

    case "faThumbsUp":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </Tooltip>
      );
    case "faAngry":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faAngry} />
        </Tooltip>
      );
    case "faGrinTongueSquint":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faGrinTongueSquint} />
        </Tooltip>
      );
    case "faSadCry":
      return (
        <Tooltip placement="top" title={message.user}>
          <FontAwesomeIcon icon={faSadCry} />
        </Tooltip>
      );
    default:
      return null;
  }
};

export default Emotion;
