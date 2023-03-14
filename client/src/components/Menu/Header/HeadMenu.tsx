import React, { FC } from "react";
import Connect from "./Connection/Connect";
import "./HeadMenu.css";

interface HeadMenuProps {
  isConnectionModalOpen: boolean;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadMenu: FC<HeadMenuProps> = (props) => {
  const { isConnectionModalOpen, setIsConnectionModalOpen } = props;
  return (
    <div className="header-container">
      <h1 className="game-title">ColorBurst</h1>
      <Connect
        isConnectionModalOpen={isConnectionModalOpen}
        setIsConnectionModalOpen={setIsConnectionModalOpen}
      />
    </div>
  );
};

export default HeadMenu;
