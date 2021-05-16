// whoever what to use this library, please send data as name, id
function Dropdown(props){
    const dropMenu = ()=>{
      return  props.stateArray.map((state)=>{
            return <option key ={state.id} value={state.id} >{state.name}</option>
                
        })
    }
    return(
        <>
        <select className = "menu"name="state" defaultValue=""  onChange={(e)=> props.onChange(e.target.value)}
        style = {{width:"190px"}}>
        <option value="" disabled >{props.placeholder}</option>
             { dropMenu()
              }
        </select>
        </>
    )
}
export default Dropdown