import { setSettings } from '../../../redux/Slices/contentSlice';
import { useAppDispatch } from '../../../redux/store';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ( {isOpen, onClose}) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')
    const [err, setErr] = useState('')

    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || !modalRoot) return null;

    const handleSetSettings = async () => {
    if(!value || +value <= 0){
        setErr('Please enter valid interval!')
    } else {
        dispatch(setSettings(value))
        onClose()
    }
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="relative flex flex-col items-center bg-white rounded-lg p-8 max-w-xl mx-auto w-11/12" onClick={e => e.stopPropagation()}>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h1 className="mb-6">Set Settings</h1>
                <input type="text" placeholder="Interval(ms)" value={value} onChange={(e) => {
                    setErr('')
                    setValue(e.target.value)}}  className="input input-bordered input-primary w-full mb-4" />
                <label className="label">
                        <span className="label-text text-red-400">{err && err}</span>
                        <span className="label-text-alt"></span>
                        </label>
                <button className="btn btn-primary" onClick={handleSetSettings}>Start</button>
            </div>
        </div>,
        modalRoot
    );
    
};

export default Modal;
