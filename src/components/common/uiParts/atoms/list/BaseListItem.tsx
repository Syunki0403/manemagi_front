import React, { ReactNode } from 'react';
import { ListItem } from '@material-ui/core/';

const BaseListItem = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => <ListItem className={className}>{children}</ListItem>;

export default BaseListItem;
