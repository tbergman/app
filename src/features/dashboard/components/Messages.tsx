import * as React from 'react';

import { Message, MessageType } from './Message';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';

export const Messages: React.SFC = () => {
  if (true) {
    return <Spacing height={24} />;
  }

  return (
    <>
      <Message
        message={
          <TranslationsConsumer textKey="TRUSTLY_PAYMENT_SETUP_MESSAGE">
            {(t) => t}
          </TranslationsConsumer>
        }
        messageType={MessageType.NOTIFY}
        action={
          <TranslationsConsumer textKey="TRUSTLY_PAYMENT_SETUP_ACTION">
            {(t) => t}
          </TranslationsConsumer>
        }
        onPressAction={() => {}}
      />
      <Spacing height={24} />
    </>
  );
};
