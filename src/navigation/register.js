import { register as registerComponents } from './components/register';
import { register as registerScreens } from './screens/register';

export const register = (registerComponent) => {
  registerComponents(registerComponent);
  registerScreens(registerComponent);
};
