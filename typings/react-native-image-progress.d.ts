declare module 'react-native-image-progress' {
  import { ComponentType } from 'react';

  import { ImageProps } from 'react-native';
  import * as Progress from 'react-native-progress';

  interface ImageProgressProps {
    indicator?:
      | typeof Progress.CircleSnail
      | typeof Progress.Bar
      | typeof Progress.Circle
      | typeof Progress.Pie;
    indicatorProps?: any;
  }

  const Image: ComponentType<ImageProps & ImageProgressProps>;

  export default Image;
}
