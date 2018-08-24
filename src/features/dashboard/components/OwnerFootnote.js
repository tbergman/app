import React from 'react';
import { Footnote, FootnoteIcon, FootnoteText } from './Footnote';
import { isApartmentOwner } from 'src/utils';

const OwnerFootnote = ({ insuranceType }) =>
  isApartmentOwner({ insuranceType }) ? (
    <Footnote>
      <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
      <FootnoteText>Lägenheten försäkras till sitt fulla värde</FootnoteText>
    </Footnote>
  ) : null;

export { OwnerFootnote };
