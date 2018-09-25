import * as React from 'react';

import { TranslationsConsumer } from './consumer';

export const TranslationNode: React.SFC = ({ children }) => <>{children}</>;

interface TranslationsPlaceholderConsumerProps {
  children: (nodes: React.ReactNode[]) => React.ReactNode;
  textKey: string;
  placeholders: React.ReactNode[];
}

const placeholderRegex = new RegExp('({[0-9]+})', 'g');
const placeholderIndexRegex = new RegExp('([0-9]+)', 'g');

export const replacePlaceholders = (
  placeholders: React.ReactNode[],
  text: string,
) => {
  const matches = text.split(placeholderRegex).filter((value) => value);

  if (!matches) {
    return [];
  }

  return matches.map((placeholder) => {
    if (!placeholderIndexRegex.test(placeholder)) return placeholder;
    const index = parseInt(placeholder.match(placeholderIndexRegex)![0]);

    if (placeholders[index]) {
      return (
        <TranslationNode key={index}>{placeholders[index]}</TranslationNode>
      );
    }

    return placeholder;
  });
};

export const TranslationsPlaceholderConsumer: React.SFC<
  TranslationsPlaceholderConsumerProps
> = ({ textKey, placeholders, children }) => (
  <TranslationsConsumer textKey={textKey}>
    {(text) => children(replacePlaceholders(placeholders, text))}
  </TranslationsConsumer>
);
