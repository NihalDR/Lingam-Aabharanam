
import type { User } from './types';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const fetchUserRole = async (userId: string, email?: string): Promise<'user' | 'admin'> => {
  console.log('[AuthContext] fetchUserRole called for userId:', userId, 'email:', email);

  if (!userId) return 'user';

  // For admin email, directly assign admin role without querying profiles
  if (email?.toLowerCase() === 'admin@lingam.com') {
    console.log('[AuthContext] Assigning admin role for hardcoded admin email:', email);
    return 'admin';
  }

  // For regular users, always return 'user' role since we don't have a profiles table
  return 'user';
};

export const fetchUserPhone = async (userId: string): Promise<string | undefined> => {
  // Since we don't have a profiles table, return undefined for phone
  // In a real implementation, this would come from the profiles table
  return undefined;
};

export const buildUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null;

  const role = await fetchUserRole(supabaseUser.id, supabaseUser.email ?? '');
  const phone = await fetchUserPhone(supabaseUser.id);

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name: supabaseUser.user_metadata?.full_name ?? undefined,
    phone,
    role,
  };
};
