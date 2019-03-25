import * as React from 'react';
import { ContentHeader, HeaderItems } from '../styles';

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  background?: string;
};

function ActionBar({ left, right, center, background }: Props) {
  const isRightAligned = left || center ? false : true;

  return (
    <ContentHeader background={background || 'bgLight'}>
      {left && <HeaderItems>{left}</HeaderItems>}
      {center && <HeaderItems>{center}</HeaderItems>}
      {right && (
        <HeaderItems rightAligned={isRightAligned}>{right}</HeaderItems>
      )}
    </ContentHeader>
  );
}

export default ActionBar;
