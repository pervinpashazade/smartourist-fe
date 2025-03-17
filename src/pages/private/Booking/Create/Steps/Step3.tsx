import React from "react";

interface IProps {
  setProgress: (percent: number) => void;
}

export const Step3: React.FC<IProps> = ({ setProgress }) => {
  return <h1>Step3</h1>;
};
