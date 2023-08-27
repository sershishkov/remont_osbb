import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  serviceworks__get_all,
  serviceworks__delete_one,
} from '../../../features/refData/serviceworks/serviceworks__Slice';

const editLink = `/refdata/serviceworks`;

function ListServiceWorks() {
  // const currentState = store.getState().users__state;
  const currentState = 'serviceworks__state';
  const headerFields = ['serviceWorkName', 'unit', 'priceWorkerRecommend'];
  const tableFields = [
    'serviceWorkName',
    'unit.unitName',
    'priceWorkerRecommend',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={serviceworks__get_all}
        delete__one={serviceworks__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Услуги (работы)`}
      />
    </>
  );
}

export default ListServiceWorks;
