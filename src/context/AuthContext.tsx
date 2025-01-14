import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { ChildrenFC } from '../utils/type';
import { getSupabaseClient } from '../api/supabase';

type AuthContextType = User | null | undefined;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ChildrenFC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const supabase = getSupabaseClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
