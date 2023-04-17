import React, { FC } from "react";
import Connect from "./Connection/Connect";
import "./HeadMenu.css";
import ConnectionModal from "./Connection/ConnectionModal";

interface HeadMenuProps {
  isConnectionModalOpen: boolean;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadMenu: FC<HeadMenuProps> = (props) => {
  const { isConnectionModalOpen, setIsConnectionModalOpen } = props;
  return (
    <>
      <div className="header-container">
        <h1 className="game-title">ColorBurst</h1>
        <Connect setIsConnectionModalOpen={setIsConnectionModalOpen} />
      </div>
      {isConnectionModalOpen && (
        <ConnectionModal
          setIsConnectionModalOpen={setIsConnectionModalOpen}
          setIsOpen={function (isOpen: boolean): void {
            setIsConnectionModalOpen(isOpen);
          }}
        />
      )}
    </>
  );
};

export default HeadMenu;
