import { register as registerHedvigLogoTitle } from './hedvigLogoTitle';
import { register as registerFAB } from './fab';
import { register as registerSignButton } from './sign-button';
import { register as registerChatButton } from './chat-button';

export const register = (registerComponent) => {
  registerHedvigLogoTitle(registerComponent);
  registerFAB(registerComponent);
  registerSignButton(registerComponent);
  registerChatButton(registerComponent);
};
