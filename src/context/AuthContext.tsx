import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User } from '@supabase/supabase-js';

import { ChildrenFC } from '../utils/type';
import { getSupabaseClient } from '../api/supabase';

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user: User | null;
  signOut: () => void;
  signIn: (params: SignInParams) => void;
  signUp: (params: SignUpParams) => Promise<{ data: any; error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ChildrenFC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUserData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async ({ email, password }: SignInParams) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpParams) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      return { data, error };
    } catch (error) {
      console.error('Sign up error:', error);

      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const value = useMemo(
    () => ({ user, signOut, signIn, signUp }),
    [user, signOut, signIn, signUp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
