
import './App.css';
import Homepage from "./Homepage"
import Login from "./Loginpage"
import {BrowserRouter,Route,Switch,Link} from "react-router-dom"
import { useState } from 'react';


function App() {
  const[hide,setHide] = useState(false)


  const hideFun = ()=>{
    
    return setHide(true)
  }
  
  return (

    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        <h1 style ={{marginBottom:"3px",height: "59px"}}>
          Co-win Resources
        </h1>
          <Link to  = "/sign-in">
            <button onClick = {()=> {hideFun();console.log(hide)}} 
             style = {hide||window.location.pathname.includes("/sign-in")? 
             {display:"none"}:null} 
              className = "loginButton">
              Sign in yourself
              </button>
              </Link>
        
      </header>
        <Switch>
        <Route path = "/sign-in">
            <Login/>

        </Route>
        <Route path = "/">
            <Homepage/>
        </Route>
       
      </Switch>
      
      </BrowserRouter>
    </div>
    
      
    
  )
}

export default App;
