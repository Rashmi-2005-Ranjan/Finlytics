import {useRef, useState} from "react";
import {Trash, Upload, User} from "lucide-react";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputref = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    // Function to remove selected image
    const handleRemoveImage = (e) => {
        e.preventDefault()
        setImage(null);
        setPreviewUrl(null);
    }

    // Function to open file explorer
    const onChoosefile = (e) => {
        e.preventDefault()
        inputref.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file"
                   accept="image/*"
                   ref={inputref}
                   onChange={handleImageChange}
                   className="hidden"
            />
            {!image ? (
                <div className="h-20 w-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User className="text-purple-500" size={35}/>
                    <button
                        onClick={onChoosefile}
                        className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <Upload size={15}/>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="h-20 w-20 object-cover rounded-full"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center bg-red-600 text-white absolute rounded-full -bottom-1 -right-1">
                        <Trash size={15}/>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilePhotoSelector;