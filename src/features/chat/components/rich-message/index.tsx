import * as React from 'react';
import isUrl from 'is-url';

import { Props } from './types';
import { TextMessage } from './text';
import { GiphyMessage } from './giphy';
import { ImageMessage } from './image';

import { isGiphyMessage, isImageMessage } from './utils';

export const RichMessage: React.SFC<Props> = ({
  message,
  withMargin,
  index,
}) => {
  if (isUrl(message.body.text)) {
    if (isGiphyMessage(message.body.text)) {
      return (
        <GiphyMessage message={message} withMargin={withMargin} index={index} />
      );
    }

    if (isImageMessage(message.body.text)) {
      return (
        <ImageMessage message={message} withMargin={withMargin} index={index} />
      );
    }
  }

  return (
    <TextMessage message={message} withMargin={withMargin} index={index} />
  );
};
