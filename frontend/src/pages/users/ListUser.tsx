import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import MyIconButtonAdd from '../../components/account/MyIconButtonAdd';

import TableSimple from '../../components/account/TableSimple';

import {
  user__get_all,
  user__delete_one,
} from '../../features/users/users__Slice';

const editLink = `/user-admin`;

const ListUser = () => {
  const { items, total, isLoading } = useAppSelector(
    (state: RootState) => state.users__state
  );
  const headerFields = ['Name', 'email', 'role'];
  const tableFields = ['name', 'email', 'role'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableSimple
        items={items}
        total={total}
        isLoading={isLoading}
        get__all={user__get_all}
        delete__one={user__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
      />
    </>
  );
};

export default ListUser;
