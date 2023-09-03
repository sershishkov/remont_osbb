import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  servicework_group__get_all,
  servicework_group__delete_one,
} from '../../../features/refData/servicework_group/servicework_group__Slice';

const editLink = `/refdata/servicework-group`;

function ListServiceWorkGroup() {
  // const currentState = store.getState().users__state;
  const currentState = 'servicework_group__state';
  const headerFields = ['Наименование'];
  const tableFields = ['serviceWorkGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={servicework_group__get_all}
        delete__one={servicework_group__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Группы работ`}
      />
    </>
  );
}

export default ListServiceWorkGroup;
