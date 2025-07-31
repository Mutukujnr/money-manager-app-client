import { apiEndpoints } from "./ApiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = 'moneymanager';

export const uploadProfileImage = async(image) =>{
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(apiEndpoints.UPLOAD_IMAGE, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}