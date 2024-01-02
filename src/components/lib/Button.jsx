import * as React from "react";
import ColorString from "../../ColorPalette";
import Row from "react-bootstrap/Row";
import CardText from "react-bootstrap/CardText";
export function CustomButton({
  onClick,
  text,
  textStyle,
  icon,
  iconAlignment = "left",
  variant = "primary",
  size = "medium",
  disabled = false,
}) {
  const backgroundColor = disabled
    ? getDisabledColor(variant)
    : getBackgroundColor(variant);
  const fontColor = getTextColor(variant);
  const fontSize = getButtonFontSize(size);
  const paddingHorizontal = getButtonPaddingHorizontal(size);
  const paddingVertical = getButtonPaddingVertical(size);
  const buttonBorder = getBorder(variant);

  return (
    <Row
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        borderColor: buttonBorder,
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {iconAlignment === "left" ? <>{icon}</> : <></>}
      <CardText
        style={{
          fontSize: fontSize,
          color: fontColor,
          marginLeft: icon != null ? 8 : 0,
          ...textStyle,
        }}
      >
        {text}
      </CardText>
      {iconAlignment === "right" ? <>{icon}</> : <></>}
    </Row>
  );
}
const getBackgroundColor = (variant) => {
  switch (variant) {
    case "primary":
      return ColorString.primary;
    case "secondary":
      return ColorString.secondary;
    case "danger":
      return ColorString.danger;
    default:
      return ColorString.white;
  }
};

const getDisabledColor = (variant) => {
  switch (variant) {
    case "primary":
      return ColorString.black;
    case "secondary":
    default:
      return ColorString.black;
  }
};

const getTextColor = (variant) => {
  switch (variant) {
    case "secondary":
      return ColorString.white;
    case "primary":
    default:
      return ColorString.black;
  }
};

const getBorder = (variant) => {
  switch (variant) {
    case "danger":
      return ColorString.red;
    default:
      return ColorString.black;
  }
};

const getButtonFontSize = (size) => {
  switch (size) {
    case "small":
      return "10px";
    case "smallPlus":
      return "12px";
    case "medium":
      return "17px";
    case "mediumPlus":
      return "20px";
    case "large":
      return "22px";
    default:
      return "17px";
  }
};

const getButtonPaddingHorizontal = (size) => {
  switch (size) {
    case "small":
      return "8px";
    case "smallPlus":
      return "10px";
    case "medium":
      return "12px";
    case "mediumPlus":
      return "14px";
    case "large":
      return "16px";
    default:
      return "12px";
  }
};

const getButtonPaddingVertical = (size) => {
  switch (size) {
    case "small":
      return "8px";
    case "smallPlus":
      return "10px";
    case "medium":
      return "12px";
    case "mediumPlus":
      return "14px";
    case "large":
      return "16px";
    default:
      return "12px";
  }
};
