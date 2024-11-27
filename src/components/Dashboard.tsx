import { useStore } from '../store/useStore';
import { Users, Shield, UserCheck, UserX } from 'lucide-react';

export function Dashboard() {
  const { users, roles } = useStore();

  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Users',
      value: activeUsers,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      name: 'Inactive Users',
      value: inactiveUsers,
      icon: UserX,
      color: 'bg-red-500',
    },
    {
      name: 'Total Roles',
      value: roles.length,
      icon: Shield,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="card hover:scale-105 transition-transform duration-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}