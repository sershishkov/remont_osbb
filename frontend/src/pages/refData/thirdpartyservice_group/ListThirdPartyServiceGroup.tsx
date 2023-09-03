import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  thirdpartyservice_group__get_all,
  thirdpartyservice_group__delete_one,
} from '../../../features/refData/thirdpartyservice_group/thirdpartyservice_group__Slice';

const editLink = `/refdata/thirdpartyservice-group`;

function ListThirdPartyServiceGroup() {
  // const currentState = store.getState().users__state;
  const currentState = 'thirdpartyservice_group__state';
  const headerFields = ['Наименование'];
  const tableFields = ['thirdPartyServiceGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={thirdpartyservice_group__get_all}
        delete__one={thirdpartyservice_group__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Группы сторонних сервисов`}
      />
    </>
  );
}

export default ListThirdPartyServiceGroup;
