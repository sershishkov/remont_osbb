import MyIconButtonAdd from '../../../components/common/MyIconButtonAdd';

import TableFilter from '../../../components/common/TableFilter';

import {
  thirdpartyservices__get_all,
  thirdpartyservices__delete_one,
} from '../../../features/refData/thirdpartyservices/thirdpartyservices__Slice';

const editLink = `/refdata/thirdpartyservices`;

function ListThirdPartyServices() {
  // const currentState = store.getState().users__state;
  const currentState = 'thirdpartyservices__state';
  const headerFields = [
    'thirdPartyServiceName',
    'unit',
    'thirdPartyServiceGroup',
    'priceBuyRecommend',
  ];
  const tableFields = [
    'thirdPartyServiceName',
    'unit.unitName',
    'thirdPartyServiceGroup.thirdPartyServiceGroupName',
    'priceBuyRecommend',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={thirdpartyservices__get_all}
        delete__one={thirdpartyservices__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Единицы измерения`}
      />
    </>
  );
}

export default ListThirdPartyServices;
