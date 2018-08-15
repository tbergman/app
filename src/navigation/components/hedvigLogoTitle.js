import { HedvigLogoTitle } from '../../components/HedvigLogoTitle';

export const HEDVIG_LOGO_TITLE_COMPONENT = {
  name: 'HedvigLogoTitle',
  alignment: 'center',
};

export const register = (registerComponent) =>
  registerComponent(HEDVIG_LOGO_TITLE_COMPONENT.name, () => HedvigLogoTitle);
