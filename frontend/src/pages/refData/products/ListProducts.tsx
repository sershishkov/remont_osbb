import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  products__get_all,
  products__delete_one,
} from '../../../features/refData/products/products__Slice';

const editLink = `/refdata/products`;

function ListProducts() {
  // const currentState = store.getState().users__state;
  const currentState = 'products__state';
  const headerFields = [
    'productName',
    'unit',
    'priceBuyRecommend',
    'productType',
  ];
  const tableFields = [
    'productName',
    'unit.unitName',
    'priceBuyRecommend',
    'productType.productTypeName',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={products__get_all}
        delete__one={products__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Товары`}
      />
    </>
  );
}

export default ListProducts;
