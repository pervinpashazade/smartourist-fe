import "./index.scss";

import { ReactNode } from "react";
import loaderGif from "../../../assets/images/loader.gif";

interface IProps {
  visible: boolean;
  children?: ReactNode;
}

const ProLoader = ({ visible, children }: IProps) => {
  if (!visible) return <>{children}</>;

  return (
    <div className="full-screen-loader">
      <img src={loaderGif} alt="Loading..." />
    </div>
  );
};

export default ProLoader;
