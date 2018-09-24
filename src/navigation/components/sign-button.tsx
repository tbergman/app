import { SignButton } from 'src/components/sign-button';

export const SIGN_BUTTON_COMPONENT = {
  name: 'SignButton',
  alignment: 'center',
};

export const register = (registerComponent) =>
  registerComponent(SIGN_BUTTON_COMPONENT.name, () => SignButton);
