import React from 'react';
import { Footnote, FootnoteIcon, FootnoteText } from './Footnote';
import { isStudentInsurance } from 'src/utils';

const InsuranceAmountFootnote = ({ insuranceType }) => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/pris.png')} />
    <FootnoteText>
      Prylarna försäkras totalt till{' '}
      {isStudentInsurance({ insuranceType }) ? '200 000' : '1 000 000'} kr
    </FootnoteText>
  </Footnote>
);

export { InsuranceAmountFootnote };
