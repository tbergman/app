import * as React from 'react';
import isUrl from 'is-url';
import path from 'path';

import { Props } from './types';
import { TextMessage } from './text';
import { GiphyMessage } from './giphy';
import { ImageMessage } from './image';

const isGiphyMessage = (url: string) => url.includes('giphy.com');
const isImageMessage = (url: string) =>
  !!['.jpg', '.png', '.gif', '.jpeg'].find((extension) =>
    path.extname(url).includes(extension),
  );

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
