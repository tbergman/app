import { ChatButton } from 'src/components/chat-button';

type ComponentCreator = () => React.SFC;

export const register = (
  registerComponent: (name: string, componentCreator: ComponentCreator) => void,
) => registerComponent('ChatButton', () => ChatButton);
