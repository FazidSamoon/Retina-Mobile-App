export type PrimaryButtonProps = {
  buttonTitle: string;
  buttonType?: ButtonType;
  buttonStyle?: any;
  buttonContainerStyle?: any;
  onPress?: any;
  loading?: boolean;
  icon?: any;
  buttonState?: ButtonState;
  disabled?: boolean;
  buttonTextStyle?: any;
};

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
}

export enum ButtonState {
  SOLID = "solid",
  CLEAR = "clear",
  OUTLINE = "outline",
}
