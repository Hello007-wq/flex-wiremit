import { User } from '../types';

const USERS_KEY = 'wiremit_users';
const CURRENT_USER_KEY = 'wiremit_current_user';

export const authService = {
  // Get all users from localStorage
  getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Save users to localStorage
  saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Register a new user
  register(userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; error?: string; user?: User } {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.find(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveUsers(users);
    
    return { success: true, user: newUser };
  },

  // Login user
  login(email: string, password: string): { success: boolean; error?: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    // Store current user (excluding password for security)
    const safeUser = { ...user, password: '' };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    
    return { success: true, user };
  },

  // Get current logged-in user
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};