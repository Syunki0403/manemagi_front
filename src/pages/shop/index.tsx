import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts/atoms';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShop } from '../../types/Shop';

const Shop = (): JSX.Element => {
  const [shops, setShopNames] = useState<TShop[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchShopsAndSetShops();
  }, []);

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    const shops: TShop[] = response.payload.data.shops;
    setShopNames(shops);
  };

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.shop.list.name()}</BasePageTitle>
      <p>
        一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。お店の情報も少ないので詳細画面は作らない予定。
      </p>
      <ul className="py-4">
        {shops.map((shop, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <div>店名：{shop.name}</div>
            <div>説明：{shop.description}</div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default Shop;
