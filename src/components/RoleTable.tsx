import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Role, Permission } from '../types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function RoleTable() {
  const { roles, permissions, addRole, updateRole, deleteRole } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<Partial<Role>>({
    name: '',
    permissions: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      updateRole({ ...selectedRole, ...formData } as Role);
    } else {
      addRole({
        ...formData,
        id: crypto.randomUUID(),
      } as Role);
    }
    setShowForm(false);
    setSelectedRole(null);
    setFormData({ name: '', permissions: [] });
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setFormData(role);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Role
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {role.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {permission.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {selectedRole ? 'Edit Role' : 'Add Role'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Permissions
                </label>
                <div className="mt-2 space-y-2">
                  {permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions?.some(
                          (p) => p.id === permission.id
                        )}
                        onChange={(e) => {
                          const newPermissions = e.target.checked
                            ? [...(formData.permissions || []), permission]
                            : (formData.permissions || []).filter(
                                (p) => p.id !== permission.id
                              );
                          setFormData({ ...formData, permissions: newPermissions });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {permission.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedRole(null);
                    setFormData({ name: '', permissions: [] });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {selectedRole ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}