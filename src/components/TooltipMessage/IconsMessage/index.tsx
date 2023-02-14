import { IMessage } from "@/types";
import React from "react";
import IconEmotion from "./IconEmotion";
type Props = {
  children: JSX.Element;

  message: IMessage;
};
const index = ({ children, message }: Props) => {
  return <IconEmotion message={message}>{children}</IconEmotion>;
};

export default index;
