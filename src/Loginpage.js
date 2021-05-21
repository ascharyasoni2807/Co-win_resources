import Heart from "./assets/—Pngtree—vector heart beat icon_3989757.png"
import Loading from "./loading"
import {useState} from "react"
import  Certificate from "./Certificate"
import {sha256}from "js-sha256"
function Login (){
    const[number,setNumber] = useState("")
    const [tokenid,setTokenid] = useState({})
    const [token,setToken] = useState({})
    
    const[loginLoding,setLoading] =useState(false)
    const[Style,setStyle] = useState({
        newStyle:{},
        styles:{}
    })
    const[minNumber,setMinNumber] = useState(10)
    const[otpCard,setOtpCard] = useState({
        heading: "Register or Sign-In for Certificate",
        buttonText:"Get Otp",
        placeholder:"Enter Number"
    })

    
    
    const genrateOtp = (number)=>{
        if(number.length !== 6){
         return fetch("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",{
                method:"POST",
                headers:{
                    "content-type":'application/json'
                },
                body: JSON.stringify({mobile:number})
            }).then(data =>data.json()).then(data=>setTokenid(data))


        } else{

         return fetch("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({otp:sha256(number),txnId:tokenid.txnId})

            }).then(token=>token.json()).then(token=>setToken(token))
        }

    }
    console.log(token)
     const loading = (bool)=>{
            setLoading(bool)
            const newStyle={
                width: "2px",
                height: "2px",
                marginTop:"6px",
                border: "3px solid #c4d1d6",
                borderTop:"3px solid #000000"
            }
            const styles ={
                height:"20px"
            }
            setStyle({newStyle:newStyle,styles:styles})
     }



    return<>
      <div className ="bigCircle">
        <div className ="smallCircle">
            <img style = {{width: "80px",height: "80px"}} alt = "heart" src = {Heart}/>
        </div>
    </div>
    {!token.hasOwnProperty("token")? <div className = "loginCard">
        <div style = {{marginTop: "85px"}}>
            <h4 style = {{marginBottom: "33px"}}>
            {otpCard.heading}
            </h4>
            <input
            className = "LoginInput"
            placeholder = {otpCard.placeholder}
            type = "number"
            value ={number}
            onChange = {(e)=>setNumber(e.target.value)}/>
            {loginLoding?<Loading newStyle = {Style.newStyle} style ={Style.styles}/>:null}
            <button onClick = {()=>{
                if(number.length!==minNumber){
                    alert("enter vaild number")
                }else{
                        loading(true)
                        genrateOtp(number)
                        .then(()=>setLoading(false))
                        .then(()=>{
                            setOtpCard({heading:"OTP Verification",buttonText:"Verify & Proceed",placeholder:"Enter Otp"})
                            setNumber("")
                        })
                        setMinNumber(6)
                    }

            }}className = "getOtp">{otpCard.buttonText}</button>

        </div>
    </div>: <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100%"}}>

<Certificate token= {token}  
            />   
</div>}
    
    </>
}

export default Login