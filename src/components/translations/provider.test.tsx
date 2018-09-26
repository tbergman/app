import 'jest';

import { TextKeys } from './types';
import { normalizeKeys } from './provider';

test('should normalize text keys response into object', () => {
  const result: TextKeys = normalizeKeys([
    {
      key: 'mock',
      text: 'test',
    },
  ]);

  expect(result['mock']).toEqual('test');
});
