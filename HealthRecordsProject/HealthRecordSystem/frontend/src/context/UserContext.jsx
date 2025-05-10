// filepath: c:\Users\saite\OneDrive\Desktop\HOSPITALMANAGMENT\frontend\src\context\UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.role;
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
    return null;
  });

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};