import React from 'react';
import './globalStyles.scss';

interface childrenProps {
  children: React.ReactNode;
}

const GlobalStyles = (props: childrenProps) => {
  return <>{props.children}</>;
};

export default GlobalStyles;
