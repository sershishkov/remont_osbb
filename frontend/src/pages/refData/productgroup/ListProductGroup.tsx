import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  productgroup__get_all,
  productgroup__delete_one,
} from '../../../features/refData/productgroup/productgroup__Slice';

const editLink = `/refdata/productgroup`;

function ListProductGroup() {
  // const currentState = store.getState().users__state;
  const currentState = 'productgroup__state';
  const headerFields = ['Наименование'];
  const tableFields = ['productGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={productgroup__get_all}
        delete__one={productgroup__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Группы товаров`}
      />
    </>
  );
}

export default ListProductGroup;
