// Client-side Cloudinary utilities for browser use
// This avoids server-side SDK issues in the browser

/**
 * Converts a file to base64 data URL for storage
 * @param file - The file to convert
 * @returns Promise with base64 data URL
 */
const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Uploads a file to Cloudinary using unsigned upload (client-side compatible)
 * Falls back to blob URLs if Cloudinary upload fails
 * @param file - The file to upload (File object or Blob)
 * @param folder - The folder in Cloudinary where the file should be stored
 * @param resourceType - The resource type ('image' for images, 'raw' for PDFs)
 * @returns Promise with the upload result
 */
export const uploadToCloudinary = async (
  file: File | Blob,
  folder: string = 'proplex',
  resourceType?: 'image' | 'raw'
): Promise<{
  url: string;
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
}> => {
  try {
    const fileObj = file as File;
    const fileName = fileObj.name || 'file';
    const format = fileName.split('.').pop()?.toLowerCase() || 'unknown';

    // Auto-detect resource type if not provided
    let detectedResourceType = resourceType;
    if (!detectedResourceType) {
      const isPdf =
        format === 'pdf' ||
        fileObj.type === 'application/pdf' ||
        fileName.toLowerCase().endsWith('.pdf');
      detectedResourceType = isPdf ? 'raw' : 'image';
      console.log(
        `Auto-detected file type: isPdf=${isPdf}, final resourceType=${detectedResourceType}`
      );
    }

    console.log(
      `Uploading file: ${fileName}, detected format: ${format}, resource type: ${detectedResourceType}`
    );
    console.log('File type:', fileObj.type, 'File size:', fileObj.size);

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';
    const cloudName = import.meta.env.VITE_CLOUD_NAME || 'dv0zsp0hr';

    console.log('Upload preset:', uploadPreset, 'Cloud name:', cloudName);

    if (cloudName) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', folder);

        // ✅ use detected resourceType in the URL
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${detectedResourceType}/upload`;

        console.log(
          'Attempting Cloudinary upload to:',
          uploadUrl,
          'with resource type:',
          detectedResourceType
        );

        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Cloudinary upload successful:', result);

          return {
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
          };
        } else {
          const error = await response.text();
          console.warn('Cloudinary upload failed with status:', response.status);
          console.warn('Cloudinary error response:', error);
          throw new Error(`Upload failed: ${response.status} - ${error}`);
        }
      } catch (cloudinaryError) {
        console.warn(
          'Cloudinary upload failed, falling back to local storage:',
          cloudinaryError
        );
      }
    }

    // --- Fallback blob/data URL ---
    console.log('Using fallback blob URL approach');

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);
    const publicId = `${folder}/${timestamp}_${randomId}`;

    const blobUrl = URL.createObjectURL(file);

    let dataUrl = blobUrl;
    if (format === 'pdf') {
      dataUrl = await fileToBase64(file);
      if (!dataUrl.startsWith('data:application/pdf')) {
        const base64Data = dataUrl.split(',')[1];
        dataUrl = `data:application/pdf;base64,${base64Data}`;
      }
    }

    return {
      url: blobUrl,
      public_id: publicId,
      secure_url: dataUrl,
      format: format,
      bytes: fileObj.size || 0,
      width: undefined,
      height: undefined,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Deletes a file from Cloudinary using the backend API
 * @param publicId - The public ID of the file to delete
 * @param resourceType - The resource type ('image' for images, 'raw' for PDFs)
 * @returns Promise with the deletion result
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<{ result: string }> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/cloudinary/delete?publicId=${encodeURIComponent(publicId)}&resourceType=${resourceType}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Deletion failed: ${error.message || response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};