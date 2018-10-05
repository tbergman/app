import 'jest';

import { TextKeys } from './types';
import { normalizeTranslations } from './provider';

test('should normalize translations response into object', () => {
  const result: TextKeys = normalizeTranslations([
    {
      key: {
        value: 'mock',
      },
      text: 'test',
    },
  ]);

  expect(result['mock']).toEqual('test');
});
