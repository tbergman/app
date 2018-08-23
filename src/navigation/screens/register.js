import { register as registerChat } from './chat/register';
import { register as registerMarketing } from './marketing';
import { register as registerOffer } from './offer';
import { register as registerDashboard } from './dashboard/register';
import { register as registerPayment } from './payment';
import { register as registerProfile } from './profile';

export const register = (registerComponent) => {
  registerChat(registerComponent);
  registerMarketing(registerComponent);
  registerOffer(registerComponent);
  registerDashboard(registerComponent);
  registerPayment(registerComponent);
  registerProfile(registerComponent);
};
