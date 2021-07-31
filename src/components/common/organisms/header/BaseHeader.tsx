import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { BaseIcon, BaseLink } from '../../uiParts/atoms';
import { Menu, MenuItem } from '@material-ui/core';
/* const */
import { COLORS } from '../../../../const/color';
/* pageMap */
import { page } from '../../../../pageMap';
/* pageMap */
import { ommisionText } from '../../../../utils/function';
import useIsAfterSsr from '../../../../customHook/useIsAfterSsr';
/* types */
import { settingAndUser } from '../../../../types/Setting';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

const BaseHeader = ({
  className = '',
  toggleDrawer,
  settingState,
}: {
  className?: string;
  toggleDrawer: any;
  settingState: settingAndUser;
}) => {
  const classes = materialStyles({
    headerTitle: {
      color: COLORS.TEXT_GREEN,
    },
  });

  const router = useRouter();
  const isAfterSsr = useIsAfterSsr();
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  // TODO ログアウトは Authクラス等を作成して管理する。localStorageのkeyもClientStorageクラス等を作成して管理させる。
  // もしくはとりあえずLocalStorageのクラスに全部移動させてもいいかも
  const logOut = (router: NextRouter) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    setAnchorEl(null);
    router.push(page.login.link());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headPathName = settingState.user.id ? page.top.link() : page.root.link();

  return (
    <AppBar position="static" className={className + ' sticky z-10 top-0'} color={'inherit'}>
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <div className="left flex items-center">
            {/* このaccessTokenがあるかという処理は変更予定。セッションが切れた時にトークンだけ残り続けてしまうのでそのタイミングで破棄をする必要がある。*/}
            {isAfterSsr && localStorage?.getItem('accessToken') && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <BaseLink pathname={headPathName}>
              <Typography variant="h6" className={classes.headerTitle}>
                TATEKAE
              </Typography>
            </BaseLink>
          </div>
          {/* このaccessTokenがあるかという処理は変更予定。セッションが切れた時にトークンだけ残り続けてしまうのでそのタイミングで破棄をする必要がある。*/}
          {isAfterSsr && localStorage?.getItem('accessToken') && (
            <div className="flex items-center">
              {settingState.user?.name && (
                <div className="mr-2">{ommisionText(settingState.user.name)}</div>
              )}
              <BaseIcon icon="accountCircle" onClick={handleClick} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => logOut(router)}>ログアウト</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
