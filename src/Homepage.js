import Dropdown from "./Dropdown"
import Loading from "./loading"
import  Centervac from "./Centervac"

import {useState,useEffect} from "react"
function Homepage(){
  const [datas,setData] = useState([])
  const [citys,setCity] = useState([])
  const [centers,setCenters] = useState([])
  const [centerid,setCentersid] = useState(0)
  const [selectedDate, setDate] = useState('');
  const [loading,setLoading] = useState(false)
  const [centersByPin,setPin] = useState([])
  const [centerPin,setCenterPin] = useState("")
  
  useEffect(()=>{
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then(res => res.json())
      .then(data => setData(data.states.map(x =>({name: x.state_name, id: x.state_id}))))
  }, [])
  
  

  const getDistrict =(id)=>{
   return fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+id)
    .then(res => res.json())
    .then(citys => {
      return(
        setCity(citys.districts.map(x =>({name: x.district_name, id: x.district_id})))
      )
      
    })
  }
  const getCenters =(id,date,pin) =>{
    if(date===""){
      alert("please select date")
    }else if(id !== 0 && pin===""){

      fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+id+"&date="+date)
      .then(res => res.json())
      .then(_centers => {
        if(_centers.sessions.length){
          setCenters(_centers.sessions)
          setLoading(false)
        }else{
          alert("No centers available here")
          setLoading(false)
  
        }
      })
      .catch((e)=> {
        console.log(e)
        
      })
    }
    else{
      
      fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pin+"&date="+date)
      .then(res=>res.json())
      .then(byPin => {
        console.log(byPin.centers)
        if(byPin.centers.length){
          setPin(byPin.centers)
          setLoading(false)
        }else{
          alert("No centers available here")
          setLoading(false)
  
        }
        
      })
    }
  
  }
  const loadingfun = (bool)=>{
  
    setLoading(bool)
  }
  
  
  const renderCenters =()=>{
    if(loading){
      return <Loading/>
    }else if(centerPin === "" && !loading ){
      return <Centervac centerArray ={centers}/>
    }else {
      return  <Centervac centerArray ={centersByPin}/>
    }
  }
    
   
  return<>
  <div style  ={{paddingTop:"15px", position:"relative", width:"100% "}}>
    <Dropdown stateArray = {datas} 
              onChange = {getDistrict}
              placeholder = "States"/>
    <Dropdown stateArray = {citys} 
          onChange = {(id) => setCentersid(id)}
          placeholder = "District"/>
           
    <div style = {{padding:"10px"}}>OR</div>
  <input 
    type = "number" 
    className = "pinInput" 
    placeholder = "Postal Code"
    onChange = {(e)=>{
        setCenterPin(e.target.value)
    }}/>
    <div style = {{marginLeft:"15px"}}>
      <input  className="menu" type="date" onChange={(e)=> {
        const date = new Date(e.target.value);
        const dateFormat = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        setDate(dateFormat);
      }}/>
    { 
    
    citys.length || centerPin ? <button className ="menu"onClick={() => {
    getCenters(centerid, selectedDate,centerPin)
    
    selectedDate!=="" ? loadingfun(true):loadingfun(false)
    }
  } >Go</button>  : <button className ="menu" 
  
  >Go</button>  
  
      }
    </div>
  <div style = {{display:"flex",justifyContent:"center"}}>
    
    {renderCenters()}
    
  </div>
  </div>
  </>
}
export default Homepage