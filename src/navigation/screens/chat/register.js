import { register as registerChat } from './index';
import { register as registerModal } from './modal';

export const register = (registerComponent) => {
  registerChat(registerComponent);
  registerModal(registerComponent);
};
