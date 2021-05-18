import Heart from "./assets/—Pngtree—vector heart beat icon_3989757.png"
import {useState} from "react"
function Login (){
    const[number,setNumber] = useState(0)  

    const genrateOtp = (otp)=>{
        fetch("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",{
            method:"POST",
            headers:{
                "content-type":'application/json'
            },
            body: JSON.stringify(otp)
        }).then(data =>data.json())

    }



    return<> 
    <div className ="bigCircle">
        <div className ="smallCircle">
            <img style = {{width: "80px",height: "80px"}} alt = "heart" src = {Heart}/>
        </div>
    </div>
    <div className = "loginCard">
        <div style = {{marginTop: "85px"}}>
            <h4 style = {{marginBottom: "33px"}}>
            Register or Sign-In for Certificate
            </h4>            
            <input  
            className = "LoginInput" 
            placeholder = "Enter Number" 
            type = "number"
            onChange = {(e)=>setNumber(e.target.value)}/>
            <button onClick = {()=>genrateOtp(number)}className = "getOtp">Get Otp</button>
        </div>
    </div>
    </>
}

export default Login