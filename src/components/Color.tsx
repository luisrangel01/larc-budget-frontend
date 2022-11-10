import Stack from "react-bootstrap/Stack";
import { ColorChangeHandler, TwitterPicker } from "react-color";

type ColorProps = {
  color: string;
  onChangeComplete: ColorChangeHandler;
};

const Color = ({ color, onChangeComplete }: ColorProps) => {
  return (
    <Stack direction="horizontal" gap={3} className="mb-3">
      <div>
        <label>Color:</label>
      </div>
      <div className="box-color" style={{ backgroundColor: color }}></div>
      <TwitterPicker color={color} onChangeComplete={onChangeComplete} />
    </Stack>
  );
};

export default Color;
