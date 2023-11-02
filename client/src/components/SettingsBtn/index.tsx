import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import SettingsModal from "../Modal/SettingsModal";

const SettingsBtn = () => {

    const [isOpen, setIsOpen] = useState(false)
    return (
    <>
    <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        <button className="btn btn-primary w-xs rounded-2xl mt-6 ml-4" onClick={() => setIsOpen(true)}>
            Set Settings 
            <AiOutlinePlus size={20}/>
    </button>
    </>
    )
}
 
export default SettingsBtn ;