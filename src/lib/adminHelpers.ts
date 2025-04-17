
import { supabase } from './supabaseClient';

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

/**
 * Initialize storage buckets if they don't exist
 */
export const initializeStorage = async (): Promise<void> => {
  try {
    const { data, error } = await supabase.storage.getBucket('screenshots');
    
    if (error && error.message.includes('bucket not found')) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket('screenshots', {
        public: false,
        fileSizeLimit: 5242880, // 5MB
      });
      
      if (createError) {
        console.error('Error creating screenshots bucket:', createError);
      } else {
        console.log('Screenshots bucket created successfully');
        
        // Set bucket policy for public read access
        const { error: policyError } = await supabase.storage.updateBucket('screenshots', {
          public: true,
        });
        
        if (policyError) {
          console.error('Error setting bucket policy:', policyError);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};
