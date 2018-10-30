declare module 'react-native-hyperlink' {
  import { TextProps } from 'react-native';

  interface HyperlinkProps {
    linkStyle: TextProps['style'];
    linkDefault: boolean;
  }

  const Hyperlink: React.ComponentType<HyperlinkProps>;

  export default Hyperlink;
}
