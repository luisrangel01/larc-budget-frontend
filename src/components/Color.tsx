import { useState } from "react";
import { ColorChangeHandler, TwitterPicker } from "react-color";

type ColorProps = {
  color: string;
  onChangeComplete: ColorChangeHandler;
};

const Color = ({ color, onChangeComplete }: ColorProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const showPickerComponent = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div
        className="box-color"
        style={{ backgroundColor: color }}
        onClick={showPickerComponent}
      ></div>
      {showPicker && (
        <TwitterPicker color={color} onChangeComplete={onChangeComplete} />
      )}
    </div>
  );
};

export default Color;
