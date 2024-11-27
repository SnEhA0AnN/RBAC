# Role-Based Access Control (RBAC) System

A modern and secure Role-Based Access Control system built with React, TypeScript, and Zustand. This application provides a comprehensive solution for managing users, roles, and permissions in a secure environment.

## Features

### User Management
- Create, edit, and delete users
- Assign roles to users
- Manage user status (active/inactive)
- Search and filter users
- Sort users by different fields
- Avatar support with fallback initials

### Role Management
- Create and manage roles with specific permissions
- Pre-defined roles: Admin, Owner, Editor, Viewer
- Flexible permission assignment
- Visual permission management interface

### Permission System
- Granular permissions for different actions
- Built-in permissions:
  - User Management (read, write, delete)
  - Role Management (read, write, delete)
  - Special access levels (owner, editor, viewer)

### Security
- Protected routes
- Secure authentication system
- Session persistence
- Role-based access control

### Modern UI/UX
- Clean and intuitive interface
- Responsive design
- Real-time feedback
- Sorting and filtering capabilities
- Modern glass effect design
- Smooth animations and transitions

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Default Credentials

- Email: admin@example.com
- Password: admin123

## Available Roles

1. **Admin**
   - Full system access
   - All permissions granted

2. **Owner**
   - content viewing permission
   - content editing permission

3. **Editor**
   - Content editing permissions

4. **Viewer**
   - Basic viewing permissions

## Project Structure

```
src/
├── components/          # React components
├── store/              # Zustand store
├── types/              # TypeScript types
├── lib/                # Utility functions
└── assets/            # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License