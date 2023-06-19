import MyIconButtonAdd from '../../components/common/MyIconButtonAdd';

import TableFilter from '../../components/common/TableFilter';

import {
  user__get_all,
  user__delete_one,
} from '../../features/users/users__Slice';

const editLink = `/user-admin`;

const ListUser = () => {
  // const currentState = store.getState().users__state;
  const currentState = 'users__state';
  const headerFields = ['Name', 'email', 'role'];
  const tableFields = ['name', 'email', 'role'];

  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={user__get_all}
        delete__one={user__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`ПольЗователи`}
      />
    </>
  );
};

export default ListUser;
