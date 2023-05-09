import * as React from "react";
import { example } from "./Card.module.css";

const Card = ({ children }) => {
  return <div className={example}>{children}</div>;
};

export default Card;
