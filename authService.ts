import { User } from '../types';

// This is a simple client-side "database" using localStorage.
// In a real-world application, this would be handled by a secure backend server.
const USERS_DB_KEY = 'youtube_automator_users';

interface StoredUser extends User {
    // In a real app, this would be a securely salted and hashed password.
    passwordHash: string; 
}

// Helper to get all users from localStorage
const getUsers = (): StoredUser[] => {
    try {
        const usersJson = localStorage.getItem(USERS_DB_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
        console.error("Could not parse users from localStorage", error);
        return [];
    }
};

// Helper to save users to localStorage
const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

export const signUp = async (name: string, email: string, password: string): Promise<User> => {
    // Simulate network delay for better UX
    await new Promise(res => setTimeout(res, 500));
    
    const users = getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    if(password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    }

    const newUser: StoredUser = {
        id: Date.now().toString(),
        name,
        email,
        // In a real app, NEVER store plain text passwords. This should be a strong hash.
        passwordHash: password, 
    };

    users.push(newUser);
    saveUsers(users);

    const { passwordHash, ...user } = newUser;
    return user;
};

export const login = async (email: string, password: string): Promise<User> => {
    // Simulate network delay for better UX
    await new Promise(res => setTimeout(res, 500));

    const users = getUsers();
    const userToLogin = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!userToLogin) {
        throw new Error('Invalid email or password.');
    }

    // In a real app, you would use a secure method to compare the provided password
    // with the stored hash (e.g., bcrypt.compare).
    if (userToLogin.passwordHash !== password) {
        throw new Error('Invalid email or password.');
    }

    const { passwordHash, ...user } = userToLogin;
    return user;
};
