import React from 'react';
import { Footnote, FootnoteIcon, FootnoteText } from './Footnote';

const DeductibleFootnote = () => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/pris.png')} />
    <FootnoteText>Din självrisk är 1 500 kr</FootnoteText>
  </Footnote>
);

export { DeductibleFootnote };
