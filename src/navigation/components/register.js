import { register as registerHedvigLogoTitle } from './hedvigLogoTitle';
import { register as registerFAB } from './fab';

export const register = (registerComponent) => {
  registerHedvigLogoTitle(registerComponent);
  registerFAB(registerComponent);
};
