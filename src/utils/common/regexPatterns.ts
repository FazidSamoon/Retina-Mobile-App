export function lowerCasePattern(): RegExp {
  return /[a-z]/;
}

export function upperCasePattern(): RegExp {
  return /[A-Z]/;
}

export function specialCharacterPattern(): RegExp {
  return /[`~!@#$%^&*()-+{}[\]\\|=,.//?;<>':"_-]/;
}

export function numberPattern(): RegExp {
  return /\d/;
}
