import { Dimensions } from 'react-native';

// Example
// import { vSizeClass, hSizeClass, V_SPACIOUS, V_REGULAR, V_COMPACT } from './DimensionSizes';
// const styles = StyleSheet.create({
//   image: {
//     height: {
//       [V_SPACIOUS]: 200,
//       [V_REGULAR]: 150,
//       [V_COMPACT]: 100,
//     }[vSizeClass]
//   }
// })

// Common device sizes from
// https://material.io/devices/
// http://iosres.com/

// Size class: compact
// iPhone 1 to 4        320 x 480
// iPhone 5             320 x 568
// Android One          320 x 569

// Size class: regular
// Common Android       360 x 640
// Galaxy S5 to S7 Edge 360 x 640
// iPhone 6 to 8        375 x 667

// Size class: spacious
// iPhone 6 Plus        414 x 736
// iPhone X             375 x 812
// Google Pixel and XL  411 x 731
// Galaxy S8 and S8+    360 x 740

const HORIZONTAL_SIZE_COMPACT = 320;
const HORIZONTAL_SIZE_REGULAR = 375;
const VERTICAL_SIZE_COMPACT = 639;
const VERTICAL_SIZE_REGULAR = 719;

const HORIZONTAL_SIZE_CLASS_COMPACT = 'horizontal:compact';
const HORIZONTAL_SIZE_CLASS_REGULAR = 'horizontal:regular';
const HORIZONTAL_SIZE_CLASS_SPACIOUS = 'horizontal:spacious';

const VERTICAL_SIZE_CLASS_COMPACT = 'vertical:compact';
const VERTICAL_SIZE_CLASS_REGULAR = 'vertical:regular';
const VERTICAL_SIZE_CLASS_SPACIOUS = 'vertical:spacious';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const getHorizontalSizeClass = (sizeDpx) => {
  let sizeClass;
  if (sizeDpx <= HORIZONTAL_SIZE_COMPACT) {
    sizeClass = HORIZONTAL_SIZE_CLASS_COMPACT;
  } else if (
    sizeDpx > HORIZONTAL_SIZE_COMPACT &&
    sizeDpx <= HORIZONTAL_SIZE_REGULAR
  ) {
    sizeClass = HORIZONTAL_SIZE_CLASS_REGULAR;
  } else {
    sizeClass = HORIZONTAL_SIZE_CLASS_SPACIOUS;
  }
  return sizeClass;
};

const getVerticalSizeClass = (sizeDpx) => {
  let sizeClass;
  if (sizeDpx <= VERTICAL_SIZE_COMPACT) {
    sizeClass = VERTICAL_SIZE_CLASS_COMPACT;
  } else if (
    sizeDpx > VERTICAL_SIZE_COMPACT &&
    sizeDpx <= VERTICAL_SIZE_REGULAR
  ) {
    sizeClass = VERTICAL_SIZE_CLASS_REGULAR;
  } else {
    sizeClass = VERTICAL_SIZE_CLASS_SPACIOUS;
  }
  return sizeClass;
};

const isPortrait = (viewportWidth, viewportHeight) => {
  return viewportHeight > viewportWidth;
};

// ToDo tests
export const getHorizontalSizeClassForDevice = (
  viewportWidth,
  viewportHeight,
) => {
  return isPortrait(viewportWidth, viewportHeight)
    ? getHorizontalSizeClass(viewportWidth)
    : getVerticalSizeClass(viewportWidth);
};

// ToDo tests
export const getVerticalSizeClassForDevice = (
  viewportWidth,
  viewportHeight,
) => {
  return isPortrait(viewportWidth, viewportHeight)
    ? getVerticalSizeClass(viewportHeight)
    : getHorizontalSizeClass(viewportHeight);
};

export const horizontalSizeClass = getHorizontalSizeClassForDevice(
  viewportWidth,
  viewportHeight,
);

export const verticalSizeClass = getVerticalSizeClassForDevice(
  viewportWidth,
  viewportHeight,
);

export { HORIZONTAL_SIZE_CLASS_COMPACT as H_COMPACT };
export { HORIZONTAL_SIZE_CLASS_REGULAR as H_REGULAR };
export { HORIZONTAL_SIZE_CLASS_SPACIOUS as H_SPACIOUS };
export { VERTICAL_SIZE_CLASS_COMPACT as V_COMPACT };
export { VERTICAL_SIZE_CLASS_REGULAR as V_REGULAR };
export { VERTICAL_SIZE_CLASS_SPACIOUS as V_SPACIOUS };
