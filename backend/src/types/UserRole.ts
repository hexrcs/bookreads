import { enumType } from 'nexus'

export const UserRole = enumType({
  name: 'UserRole',
  members: ['USER', 'ADMIN'],
})
