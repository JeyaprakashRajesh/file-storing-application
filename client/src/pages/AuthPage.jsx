import { useEffect, useState } from "react"
import "../App.css"
import Login from "../components/Login"
import Signup from "../components/Signup"


function AuthPage() {
    const [isSignIn,setSignIn] = useState(true)
    const [component,setComponent] = useState(null)
    useEffect(() => {
        isSignIn ? setComponent(<Login setSignIn={setSignIn}/>) : setComponent(<Signup setSignIn={setSignIn}/>)
    },[isSignIn])
    return (
        <div className="auth">
            {component}
        </div>
    )
}
export default AuthPage
