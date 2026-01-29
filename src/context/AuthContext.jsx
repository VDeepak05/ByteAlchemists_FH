import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // limit loading 
        setLoading(true);
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = async (userData) => {
        // Mock Signup
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const { phone, password, name, location, role } = userData;

                // Get existing users
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                // Check if user exists
                if (users.find(u => u.phone === phone)) {
                    reject(new Error('User with this phone number already exists'));
                    return;
                }

                const newUser = {
                    uid: Date.now().toString(), // Mock UID
                    phone,
                    password, // In a real app never store plan text passwords
                    name,
                    location,
                    role,
                    createdAt: new Date().toISOString()
                };

                // Save user
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // Auto login
                const userSession = { ...newUser };
                delete userSession.password; // Don't keep password in session

                setCurrentUser(userSession);
                localStorage.setItem('currentUser', JSON.stringify(userSession));

                resolve(userSession);
            }, 800); // Simulate network delay
        });
    };

    const login = async (phone, password) => {
        // Mock Login
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.phone === phone && u.password === password);

                if (user) {
                    const userSession = { ...user };
                    delete userSession.password;

                    setCurrentUser(userSession);
                    localStorage.setItem('currentUser', JSON.stringify(userSession));
                    resolve(userSession);
                } else {
                    reject(new Error('Invalid phone number or password'));
                    // Note: Changed from boolean return to Promise/Error to match likely expectations but previous code used boolean return for login. 
                    // Let's stick to returning a session or throwing, but the previous Login.jsx expected a boolean or promise.
                    // Actually, looking at Login.jsx: `const success = login(...)`. It treated it as sync or async returning truthy/falsy.
                    // Let's return the user object on success (truthy) and null/throw on fail. 
                    // Wait, the previous Login.jsx was: `const success = login(...)`. If I change login signature, I must update Login.jsx.
                    // I will update Login.jsx as well.
                }
            }, 800);
        });
    };

    const updateProfile = async (updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedUser = { ...currentUser, ...updates };

                // Update local storage users list
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const userIndex = users.findIndex(u => u.phone === currentUser.phone);

                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], ...updates };
                    localStorage.setItem('users', JSON.stringify(users));
                }

                // Update current user session
                setCurrentUser(updatedUser);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                resolve(updatedUser);
            }, 500);
        });
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
