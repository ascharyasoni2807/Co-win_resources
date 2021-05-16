import {useState} from "react"
function Certificate(props){
const [value,setvalue] = useState("")
    

return (
    <div className = "certificate">
        <div>
       Get your certificate
        </div>
       <span >
        Reference_id : 
       <input placeholder ="Ex:1234567890" 
              onChange = {
                  (event)=>{
                        setvalue(event.target.value)
                  }} 
              type ="number"  /> 
       
       </span>
       <div>

       <button onClick  = {()=>props.Download(value)}>Download</button>
       </div>
    </div>
)
}
export default Certificate