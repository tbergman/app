import { register as registerHedvigLogoTitle } from './hedvigLogoTitle';
import { register as registerFAB } from './fab';
import { register as registerSignButton } from './sign-button';

export const register = (registerComponent) => {
  registerHedvigLogoTitle(registerComponent);
  registerFAB(registerComponent);
  registerSignButton(registerComponent);
};
