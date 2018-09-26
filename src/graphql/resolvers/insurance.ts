import { AsyncStorage } from 'react-native';
import Config from '@hedviginsurance/react-native-config';
import { getUser } from './user';
import { QueryToInsuranceResolver, Query, Insurance } from '../types';

const getInsurance = async (token: string) => {
  const data = await fetch(`${Config.API_BASE_URL}/insurance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.json();
};

const insurance: QueryToInsuranceResolver<Query, Insurance> = async (
  _root,
  _args,
  { getToken },
) => {
  const token = await getToken();
  const [insurance, user] = await Promise.all([
    getInsurance(token),
    getUser(token),
  ]);

  return {
    personsInHousehold: insurance.personsInHousehold,
    monthlyCost: insurance.currentTotalPrice,
    address: insurance.addressStreet,
    certificateUrl: insurance.certificateUrl,
    status: insurance.status,
    type: insurance.insuranceType,
    activeFrom: insurance.activeFrom,
    perilCategories: insurance.categories,
    safetyIncreasers: user.safetyIncreasers,
  };
};

export { insurance };
