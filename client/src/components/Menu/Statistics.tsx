/* eslint-disable react/react-in-jsx-scope */
import { FC, useState } from "react";
import { CgClose } from "react-icons/cg";
import { GiPodium } from "react-icons/gi";
import "./Statistics.css";

const Statistics: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return isOpen ? (
    <div className="menu-stat-open">
      <span onClick={() => setIsOpen(false)} className="icon-close">
        <CgClose />
      </span>
      <h3 className="menu-stat-tile">Hall of Fame 🥇</h3>
      <p>Ici il y aura pleins de stats ca va être super nespa ?</p>
    </div>
  ) : (
    <div className="menu-stat-close">
      <span onClick={() => setIsOpen(true)} className="icon-podium">
        <GiPodium />
      </span>
    </div>
  );
};

export default Statistics;
