
interface SeedUser {
email: string;
fullName: string;
password: string;
roles: string[];
permissionMenu: string[];
phone: string;
picture: string;
branch: string;
}

interface SeedData {
  users: SeedUser[];
}


export const initialData: SeedData = {

  users: [
    {
      email: 'test1@google.com',
      fullName: 'Test 1',
      password: 'Abc123',
      roles: ['admin'],
      permissionMenu: ['job-orders'],
      phone: '414-514-2165',
      picture: 'test1.jpg',
      branch: 'Latim'
    },
    {
      email: 'test2@google.com',
      fullName: 'Test 2',
      password: 'Abc123',
      roles: ['user', 'super-user'],
      permissionMenu: ['job-orders'],
      phone: '424-614-3628',
      picture: 'test2.jpg',
      branch: 'Latim'
    }
  ],
}