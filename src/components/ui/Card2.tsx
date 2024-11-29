import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card2 = ({ children }: Props) => {
  return <div className="card">{children}</div>;
};

export default Card2;
