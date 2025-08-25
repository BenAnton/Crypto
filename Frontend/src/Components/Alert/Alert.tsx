
import "./Alert.css"
import {useAlert} from "../../Context/AlertContext.tsx"


function Alert() {
    const {alert, isOpen, closeAlert} = useAlert();
    
    if (!isOpen) return null;
    
    return (
        <div className="alert-cont">
            <h2 className="alert-title">{alert.title}</h2>
            <p className="alert-message">{alert.message}</p>
            <button onClick={closeAlert}>Dismiss</button>
        </div>
    )
}

export default Alert