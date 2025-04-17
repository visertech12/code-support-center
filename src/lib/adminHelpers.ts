
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the admin setup has been completed
 * This works by checking if any admin users exist in the admin_users table
 */
export const checkAdminSetup = async (): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error checking admin setup:', error);
      return false;
    }
    
    // If no admin users exist, admin setup is not completed
    return count > 0;
  } catch (error) {
    console.error('Error checking admin setup:', error);
    return false;
  }
};
