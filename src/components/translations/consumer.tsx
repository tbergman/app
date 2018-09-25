import * as React from 'react';
import { TranslationsContext } from './context';

interface ConsumerProps {
  children: (text: string) => React.ReactNode;
  textKey: string;
  placeholders?: string[];
}

const placeholderRegex = new RegExp('{([0-9]+)}', 'g');
const placeholderIndexRegex = new RegExp('([0-9]+)', 'g');

export const replacePlaceholders = (placeholders: string[], text: string) =>
  text.replace(placeholderRegex, (placeholder) => {
    if (!placeholderIndexRegex.test(placeholder)) return placeholder;
    const index = parseInt(placeholder.match(placeholderIndexRegex)![0]);

    if (placeholders[index]) {
      return placeholders[index];
    }

    return placeholder;
  });

export const TranslationsConsumer: React.SFC<ConsumerProps> = ({
  children,
  textKey,
  placeholders,
}) => (
  <TranslationsContext.Consumer>
    {({ textKeys }) => {
      return children(
        (placeholders
          ? replacePlaceholders(placeholders, textKeys[textKey])
          : textKeys[textKey]) || textKey,
      );
    }}
  </TranslationsContext.Consumer>
);
