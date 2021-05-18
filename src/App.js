
import './App.css';
import Homepage from "./Homepage"
import Login from "./Loginpage"
import {BrowserRouter,Route,Switch,Link} from "react-router-dom"



function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        <h1 style ={{marginBottom:"3px"}}>
          Co-win Resources
        </h1>
     <Link to  = "/sign-in"><button className = "loginButton">Sign in yourself</button></Link>  
        
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
