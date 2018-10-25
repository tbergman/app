import * as React from 'react';

import { Message, MessageType } from './Message';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';

import { MessagesComponent, DirectDebitStatus } from 'src/graphql/components';

export const Messages: React.SFC = () => (
  <MessagesComponent>
    {({ data, loading, error }) =>
      loading || error || data === undefined ? (
        <Spacing height={24} />
      ) : (
        <>
          {data.directDebitStatus === DirectDebitStatus.NEEDS_SETUP && (
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
          )}
          <Spacing height={24} />
        </>
      )
    }
  </MessagesComponent>
);
