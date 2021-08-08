import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
/* BaseContainer */
import { BaseContainer } from '../uiParts/layout';
/* organisms */
import { BaseHeader, Drawer, FooterNavigation } from '../organisms';
/* molecules */
import { BaseToast, BaseLoading } from '../molecules';
/* customHook */
import { ToastType } from '../../../customHook/useToastAction';
/* reducks */
import { fetchSettingAndUser } from '../../../reducks/services/Setting';
/* types */
import { settingAndUser } from '../../../types/Setting';
/*  */
import LocalStorage from '../../../utils/LocalStorage';

const CommonWrapTemplate = ({
  children,
  toastActions,
  isLoading = false,
}: {
  children: ReactNode;
  toastActions?: ToastType;
  isLoading?: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const localStorage = new LocalStorage();
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  /* TODO Authクラスを作成して認証周辺の管理をさせる。 */
  const isLogindCheck = () => {
    const perimitPages = ['/signup', '/login', '/']; //ログインしても許可されているページ
    const perimitPageExists = perimitPages.find((pageName) => pageName === router.pathname);
    if (
      // pages以外のところでトークンがない、かつ許可されたページではない時にリダイレクト
      !localStorage.loginedStorageExists() &&
      !perimitPageExists
    ) {
      router.push('/login');
    }
  };

  useEffect(() => {
    isLogindCheck();
    if (localStorage.loginedStorageExists()) {
      (async () => {
        const response: any = await dispatch(fetchSettingAndUser());
        // 認証に失敗した場合はtokenの破棄
        // 401はdeviseの指定されている
        if (response.payload?.statusText === 'Unauthorized') {
          localStorage.removeLoginedStorage();
          router.push('/login');
        }
      })();
    }
  }, []);

  return (
    <>
      <BaseLoading open={isLoading} />
      {toastActions && <BaseToast {...toastActions} />}
      <BaseHeader {...{ toggleDrawer, settingState }} />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseContainer>{children}</BaseContainer>
      <FooterNavigation />
    </>
  );
};

export default CommonWrapTemplate;
