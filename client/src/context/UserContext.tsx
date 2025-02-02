import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

interface courseDetails {
    courseId: string;
    courseName: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    courseEnrolled?: courseDetails[];
    isAdmin?: boolean;
}

interface UserContextType {
    userData: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    setReTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [reTrigger, setReTrigger] = useState<number>(0);

    useEffect(() => {
        const fetchUserStatus = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/checkstatus`, null, {   
                    withCredentials: true,
                });
                if (response.data && response.data.user) {
                    setUserData(response.data.user);
                    setIsLoggedIn(true);
                } else {
                    setUserData(null);
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.log('No user found')
                setUserData(null);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserStatus();
    }, [reTrigger]);

    return (
        <UserContext.Provider value={{ userData, isLoggedIn, isLoading, setReTrigger }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserProvider;
