import { SignButton } from 'src/components/sign-button';

export const SIGN_BUTTON_COMPONENT = {
  name: 'SignButton',
  alignment: 'center',
};

export const register = (
  registerComponent: (
    signButtonComponentName: string,
    getSignButton: () => React.StatelessComponent,
  ) => void,
) => registerComponent(SIGN_BUTTON_COMPONENT.name, () => SignButton);
