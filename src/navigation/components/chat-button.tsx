import { ChatButton } from 'src/components/chat-button';

export const CHAT_BUTTON_COMPONENT = {
  name: 'ChatButton',
  alignment: 'center',
};

type ComponentCreator = () => React.SFC;

export const register = (
  registerComponent: (name: string, componentCreator: ComponentCreator) => void,
) => registerComponent(CHAT_BUTTON_COMPONENT.name, () => ChatButton);
