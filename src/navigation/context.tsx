import React from 'react';

interface NavigationContextInterface {
  componentId?: string;
}

export const NavigationContext = React.createContext<
  NavigationContextInterface
>({});
