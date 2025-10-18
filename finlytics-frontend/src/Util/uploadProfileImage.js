import {API_ENDPOINTS} from "./apiEndPoints.js";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary upload failed with status: ${errorData.error.message || response.statusText}`);
        }
        const data = await response.json();
        console.log(`Image uploaded successfully: ${data}`);
        return data.secure_url;
    } catch (err) {
        console.error('Error uploading image to Cloudinary:', err);
        throw err;
    }
}
export default uploadProfileImage;