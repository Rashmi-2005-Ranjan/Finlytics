import {useState} from "react";
import {Image, SquareX} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 cursor-pointer">
                <div
                    className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <img src={icon} alt={icon} className="h-12 w-12"/>
                    ) : (
                        <Image/>
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-7 h-7 flex items-center justify-center bg-white border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                        <SquareX size={15}/>
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;