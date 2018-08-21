export const INSURANCE_TYPES = {
  BRF: 'BRF',
  SUBLET_BRF: 'SUBLET_BRF',
  RENT: 'RENT',
  SUBLET_RENT: 'SUBLET_RENT',
  STUDENT_BRF: 'STUDENT_BRF',
  STUDENT_RENT: 'STUDENT_RENT',
};

export const SEEN_MARKETING_CAROUSEL_KEY =
  '@hedvig:alreadySeenMarketingCarousel';

// BEWARE CODE SMELL
// Duplicated in hedvig-redux/src/sagas
// Fix when merging hedvig-redux into app src
export const IS_VIEWING_OFFER = '@hedvig:isViewingOffer';

export const schemaUri = 'hedvig:///';
