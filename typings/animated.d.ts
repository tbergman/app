import * as ReactNative from 'react-native';

declare module 'react-native' {
  export namespace Animated {
    export type BaseAnimatedStyle = {
      [K in keyof (
        | ViewStyle
        | TextStyle
        | ImageStyle)]?: Animated.AnimatedInterpolation
    };

    export type TransformsStyles = (
      | { [K in keyof PerpectiveTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof RotateTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof RotateXTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof RotateYTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof RotateZTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof ScaleTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof ScaleXTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof ScaleYTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof TranslateXTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof TranslateYTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof SkewXTransform]: Animated.AnimatedInterpolation }
      | { [K in keyof SkewYTransform]: Animated.AnimatedInterpolation })[];

    export type BaseTransformStyle = { transform?: TransformsStyles };

    export type AnimatedStyle = BaseAnimatedStyle | BaseTransformStyle;

    export function createAnimatedComponent<T>(
      component: React.ComponentType<T>,
    ): React.ComponentType<
      T | { style?: StyleProp<T['style'] | AnimatedStyle> }
    >;
  }
}
