export type RPSInputFieldProps = {
  inputLabel: string;
  inputPlaceholder: string;
  inputStyle?: RPSInputFieldStyle;
  inputContainerStyle?: any;
  icon?: any;
  error?: boolean;
  errorMessage?: string;
  onChangeText: any;
  value: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  labelStyles?: any;
};

export enum RPSInputFieldStyle {
    OUTLINED = "outlined",
    ERROR = "error",
};