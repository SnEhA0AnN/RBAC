import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role, Permission } from '../types';

interface Store {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  currentUser: User | null;
  deleteUser: (id: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  setCurrentUser: (user: User | null) => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultPermissions: Permission[] = [
  { id: '1', name: 'read:users', description: 'View Users' },
  { id: '2', name: 'write:users', description: 'Create/Edit Users' },
  { id: '3', name: 'delete:users', description: 'Delete Users' },
  { id: '4', name: 'read:roles', description: 'View Roles' },
  { id: '5', name: 'write:roles', description: 'Create/Edit Roles' },
  { id: '6', name: 'delete:roles', description: 'Delete Roles' },
  // New permissions
  { id: '7', name: 'owner', description: 'Full System Access' },
  { id: '8', name: 'editor', description: 'Edit Content' },
  { id: '9', name: 'viewer', description: 'View Only Access' },
];

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: defaultPermissions,
  },
  {
    id: '2',
    name: 'Owner',
    permissions: [
      defaultPermissions[6], // owner
      ...defaultPermissions.slice(0, 6), // all basic permissions
    ],
  },
  {
    id: '3',
    name: 'Editor',
    permissions: [
      defaultPermissions[7], // editor
      defaultPermissions[0], // read:users
      defaultPermissions[1], // write:users
      defaultPermissions[3], // read:roles
    ],
  },
  {
    id: '4',
    name: 'Viewer',
    permissions: [
      defaultPermissions[8], // viewer
      defaultPermissions[0], // read:users
      defaultPermissions[3], // read:roles
    ],
  },
];

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    roleId: '1',
    status: 'active',
  },
];

export const useStore = create<Store>()(
  persist(
    (set) => ({
      users: defaultUsers,
      roles: defaultRoles,
      permissions: defaultPermissions,
      currentUser: null,
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      updateUser: (user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
      setCurrentUser: (user) => set({ currentUser: user }),
      addRole: (role) =>
        set((state) => ({
          roles: [...state.roles, role],
        })),
      updateRole: (role) =>
        set((state) => ({
          roles: state.roles.map((r) => (r.id === role.id ? role : r)),
        })),
      deleteRole: (id) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== id),
        })),
      login: async (email, password) => {
        const user = defaultUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'rbac-storage',
    }
  )
);