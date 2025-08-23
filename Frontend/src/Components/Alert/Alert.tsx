
import "./Alert.css"

interface AlertProps {
    title: string
    message: string
    onClose: () => void
    isOpen: boolean
}
function Alert({title, message, isOpen, onClose}: AlertProps) {
    if (!isOpen) return null;
    
    return (
        <div className="alert-cont">
            <h2 className="alert-title">{title}</h2>
            <p className="alert-message">{message}</p>
            <button onClick={onClose}>Dismiss</button>
        </div>
    )
}

export default Alert