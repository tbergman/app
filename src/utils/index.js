import { INSURANCE_TYPES } from '../constants';
export const isApartmentOwner = (insuranceType) => {
  switch (insuranceType) {
    case INSURANCE_TYPES.BRF:
    case INSURANCE_TYPES.SUBLET_BRF:
    case INSURANCE_TYPES.STUDENT_BRF:
      return true;
    default:
      return false;
  }
};

export const isStudentInsurance = (insuranceType) => {
  switch (insuranceType) {
    case INSURANCE_TYPES.STUDENT_BRF:
    case INSURANCE_TYPES.STUDENT_RENT:
      return true;
    default:
      return false;
  }
};
