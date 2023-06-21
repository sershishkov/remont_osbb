import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  producttype__get_all,
  producttype__delete_one,
} from '../../../features/refData/producttype/producttype__Slice';

const editLink = `/refdata/producttype`;

function ListProductType() {
  // const currentState = store.getState().users__state;
  const currentState = 'producttype__state';
  const headerFields = ['Name'];
  const tableFields = ['productTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={producttype__get_all}
        delete__one={producttype__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Типы товаров`}
      />
    </>
  );
}

export default ListProductType;
