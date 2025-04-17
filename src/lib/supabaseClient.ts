
import { createClient } from '@supabase/supabase-js';
import { supabase as defaultClient } from '@/integrations/supabase/client';

// Create a bucket for storing screenshots if it doesn't exist
export const initializeStorage = async () => {
  try {
    const { data, error } = await defaultClient.storage.getBucket('screenshots');
    
    if (error && error.message.includes('bucket not found')) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await defaultClient.storage.createBucket('screenshots', {
        public: false,
        fileSizeLimit: 5242880, // 5MB
      });
      
      if (createError) {
        console.error('Error creating screenshots bucket:', createError);
      } else {
        console.log('Screenshots bucket created successfully');
        
        // Set bucket policy for public read access
        const { error: policyError } = await defaultClient.storage.updateBucket('screenshots', {
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

// Re-export the Supabase client for backward compatibility
export { defaultClient as supabase };

// Function to upload a screenshot and get the URL
export const uploadScreenshot = async (file: File, userId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    
    const { error: uploadError } = await defaultClient.storage
      .from('screenshots')
      .upload(filePath, file);
      
    if (uploadError) {
      throw uploadError;
    }
    
    const { data: publicUrlData } = defaultClient.storage
      .from('screenshots')
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading screenshot:', error);
    throw error;
  }
};
