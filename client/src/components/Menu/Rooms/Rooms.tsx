import React from "react";
import { FC, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import "./Rooms.css";

const Rooms: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return isOpen ? (
    <div className="room-container-open">
      <span onClick={() => setIsOpen(false)} className="close-icon">
        <CgClose />
      </span>
      <h3 className="menu-stat-tile">Crée / rejoindre une game 🕹️</h3>
      <p>Futur room joiniable 1</p>
      <p>Futur room joiniable 2</p>
      <p>Futur room joiniable 3</p>
    </div>
  ) : (
    <div className="room-container-close">
      <span onClick={() => setIsOpen(true)} className="room-icon">
        <FaGamepad />
      </span>
    </div>
  );
};

export default Rooms;
