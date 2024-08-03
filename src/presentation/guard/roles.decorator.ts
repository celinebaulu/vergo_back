/* istanbul ignore file */
import { SetMetadata } from '@nestjs/common';

import { USER_ROLE } from '@presentation/guard/userRole';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: USER_ROLE[]) => SetMetadata(ROLES_KEY, roles); // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
