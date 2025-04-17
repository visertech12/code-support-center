
import { createClient } from '@supabase/supabase-js';
import { supabase as defaultClient } from '@/integrations/supabase/client';

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
