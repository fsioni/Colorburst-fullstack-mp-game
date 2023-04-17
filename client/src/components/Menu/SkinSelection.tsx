import React, { useEffect } from "react";
import player_heads from "../../assets/img/player_heads.png";
import "./SkinSelection.css";

const SkinSelection = () => {
  const numberOfSkins = 33;
  const [selectedSkin, setSelectedSkin] = React.useState(0);

  const saveSelectedSkin = (_selectedSkin: number) => {
    localStorage.setItem("selectedSkin", _selectedSkin.toString());
  };

  const decrementSkin = () => {
    setSelectedSkin((prevSelectedSkin) => {
      if (prevSelectedSkin === 0) {
        const newSelectedSkin = numberOfSkins - 1;
        saveSelectedSkin(newSelectedSkin);
        return newSelectedSkin;
      } else {
        const newSelectedSkin = prevSelectedSkin - 1;
        saveSelectedSkin(newSelectedSkin);
        return newSelectedSkin;
      }
    });
  };

  const incrementSkin = () => {
    setSelectedSkin((prevSelectedSkin) => {
      if (prevSelectedSkin === numberOfSkins - 1) {
        saveSelectedSkin(0);
        return 0;
      } else {
        const newSelectedSkin = prevSelectedSkin + 1;
        saveSelectedSkin(newSelectedSkin);
        return newSelectedSkin;
      }
    });
  };

  useEffect(() => {
    updatePlayerHeadImage();
  }, [selectedSkin]);

  useEffect(() => {
    const _selectedSkin = localStorage.getItem("selectedSkin");
    if (_selectedSkin) {
      setSelectedSkin(parseInt(_selectedSkin));
      console.log("Selected skin loaded with: ", _selectedSkin);
    }
  }, []);

  const updatePlayerHeadImage = () => {
    console.log("Updating player head image with skin: ", selectedSkin);
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

    // Add this image in a canvas and then get the image data
    // and return it

    const canvas = document.createElement("canvas");
    canvas.width = head_width;
    canvas.height = head_height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    const img = new Image();
    img.src = player_heads;
    img.onload = () => {
      ctx.drawImage(
        img,
        xPos,
        yPos,
        head_width,
        head_height,
        0,
        0,
        head_width,
        head_height
      );
      const imageData = ctx.getImageData(0, 0, head_width, head_height);
      console.log(imageData);
      const playerHead = document.getElementById(
        "playerHead"
      ) as HTMLImageElement;
      if (!playerHead) return;
      playerHead.src = canvas.toDataURL();
    };

    // return {
    //   backgroundImage: `url(${player_heads})`,
    //   backgroundPosition: `-${xPos}px -${yPos}px`,
    //   width: `${head_width}px`,
    //   height: `${head_height}px`,
    // };
  };

  return (
    <div className="skin_selector">
      <h1 className="select_skin_title">👔 Select your skin! 👔</h1>
      <div className="skin_selection">
        <button onClick={decrementSkin} className="arrow_button revert_arrow">
          ➤
        </button>
        <img id="playerHead" alt="Custom Image Player" />
        <button onClick={incrementSkin} className="arrow_button">
          ➤
        </button>
      </div>
    </div>
  );
};

export default SkinSelection;
