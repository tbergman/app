import React from 'react';
import { PerilsCategory } from './PerilsCategory';

const PerilCategories = ({ perilCategories }) => (
  <React.Fragment>
    {perilCategories.map(({ title, description, perils, iconUrl }, i) => (
      <PerilsCategory
        title={title}
        description={description}
        perils={perils}
        iconUrl={iconUrl}
        key={i}
      />
    ))}
  </React.Fragment>
);

export { PerilCategories };
