import { USER_ROLE } from '@presentation/guard/userRole';
import { UserDbModel } from '@service/db/model/user.db.model';

export const userRopo: UserDbModel = {
  id: '65d4d015261e894a1da31a64',
  code: 'ropo',
  password:
    'uDLybl8FgPRbBicleIp/Hbb7ujedTr5gukZlcygGnYz4zyJsMAAdL0WEwxfwO6+1jI93qSR676s2QuyuKVD57w==',
  name_first: 'Robert',
  name_last: 'Paulson',
  description: 'password with secret secretKey',
  mail: 'r.paulson@bob.com',
  role: USER_ROLE.ADMIN,
  active: true,
};
