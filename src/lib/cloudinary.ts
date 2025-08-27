import { v2 as cloudinary } from 'cloudinary';
import { Cloudinary } from '@cloudinary/url-gen';

// Configure Cloudinary with your credentials
const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
};

// Initialize Cloudinary
cloudinary.config(cloudinaryConfig);

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

/**
 * Uploads a file to Cloudinary
 * @param file - The file to upload (File or Blob)
 * @param folder - The folder in Cloudinary where the file should be stored
 * @returns Promise with the upload result
 */
export const uploadToCloudinary = async (file: File, folder: string = 'proplex'): Promise<{
  url: string;
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload file to Cloudinary');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Deletes a file from Cloudinary
 * @param publicId - The public ID of the file to delete
 * @returns Promise with the deletion result
 */
export const deleteFromCloudinary = async (publicId: string): Promise<{ result: string }> => {
  try {
    const response = await fetch(
      `/api/cloudinary/delete?publicId=${encodeURIComponent(publicId)}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete file from Cloudinary');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
