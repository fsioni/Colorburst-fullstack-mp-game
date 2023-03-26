import React, { useEffect } from "react";
import player_heads from "../../assets/img/player_heads.png";
import "./SkinSelection.css";

const SkinSelection = () => {
  const numberOfSkins = 33;
  const [selectedSkin, setSelectedSkin] = React.useState(0);

  const decrementSkin = () => {
    console.log("decrement");
    if (selectedSkin === 0) {
      setSelectedSkin(numberOfSkins - 1);
    } else {
      setSelectedSkin(selectedSkin - 1);
    }
  };

  const incrementSkin = () => {
    console.log("increment");
    if (selectedSkin === numberOfSkins - 1) {
      setSelectedSkin(0);
    } else {
      setSelectedSkin(selectedSkin + 1);
    }
  };

  useEffect(() => {
    return () => {
      console.log("Skin changed to: ", selectedSkin);
    };
  }, [selectedSkin]);

  const getPlayerHeadImage = () => {
    const amount_of_heads_on_x_axis = 3;
    const amount_of_heads_on_y_axis = 11;

    const imgWidth = 426;
    const imgHeight = 2023;

    const head_width = 130;
    const head_height = 164;

    const gap_x = imgWidth - head_width * amount_of_heads_on_x_axis;
    const gap_y = imgHeight - head_height * amount_of_heads_on_y_axis;

    const xPos =
      (head_width + gap_x / (amount_of_heads_on_x_axis - 1)) *
      (selectedSkin % amount_of_heads_on_x_axis);
    const yPos =
      (head_height + gap_y / (amount_of_heads_on_y_axis - 1)) *
      Math.floor(selectedSkin / amount_of_heads_on_x_axis);

    return {
      backgroundImage: `url(${player_heads})`,
      backgroundPosition: `-${xPos}px -${yPos}px`,
      width: `${head_width}px`,
      height: `${head_height}px`,
    };
  };

  return (
    <div className="skin_selector">
      <h1 className="select_skin_title">👔 Select your skin! 👔</h1>
      <div className="skin_selection">
        <button onClick={decrementSkin} className="arrow_button revert_arrow">
          ➤
        </button>
        <img style={getPlayerHeadImage()} alt="" />
        <button onClick={incrementSkin} className="arrow_button">
          ➤
        </button>
      </div>
    </div>
  );
};

export default SkinSelection;
