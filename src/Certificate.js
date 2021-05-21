import {useState} from "react"
import Loading from "./loading"
function Certificate(props){
const [value,setvalue] = useState("")
const[isTrue,setTrue]  = useState(false)
const[Style,setStyle] = useState({
    newStyle:{},
    styles:{}
})
const Download = (id)=>{
  return  fetch("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id="+id,
    {
      method:"GET",
      headers:{
        "Accept": "application/pdf",
        'Authorization': `Bearer ${props.token.token}` ,
      }
    })
    .then(res =>res.blob())
    .then(blob=>{
        if(blob===null) {
            alert("Did you Vaccinated?")
        }
        else{
            var a = document.createElement("a")
            a.href = URL.createObjectURL(blob)
            a.setAttribute("download",a.href)
            a.click()
        } 
    })
    
}

const loadingShow = (bool)=>{
    setTrue(bool)
            const newStyle={
                width: "2px",
                height: "2px",
                marginTop:"-8px",
                border: "3px solid #c4d1d6",
                borderTop:"3px solid #000000"
            }
            const styles ={
                height:"7px"
            }
            setStyle({newStyle:newStyle,styles:styles})
}

return (
    <div className = "certificate">
        <div style = {{marginTop: "25px",
                        marginBottom: "9px",
                        fontSize: "21px"}}>
       Get your certificate
        </div>
       
       <input placeholder =" Reference Id" 
              onChange = {
                  (event)=>{
                        setvalue(event.target.value)
                  }} 
              type ="number"  /> 
       
       
           {isTrue?<Loading newStyle = {Style.newStyle} style ={Style.styles}/>:null}
       <div>

       <button className = "downloadButton" onClick  = {()=>{
           if(value.length!==14){
                alert("Not Vaild")
           }else{
               loadingShow(true)
               Download(value)
               .then(()=>setTrue(false))
           }

           }}>Download</button>
       </div>
    </div>
)
}
export default Certificate