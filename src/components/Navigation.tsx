import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home, Plus, Database } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-foreground">TaskManager</h1>
            <div className="hidden md:flex space-x-4">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant={isActive('/tasks/new') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/tasks/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={isActive('/profile') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button
              variant={isActive('/admin/database') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/admin/database">
                <Database className="h-4 w-4 mr-2" />
                Database Admin
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;