import logo from "./logo.svg";
import "./App.css";
import LoginTab from "../src/components/Login/Login";
import SignUp from "../src/components/Register/Register";
import Dashboard from "../src/components/Dashboard/Dashboard";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute/ProtectedRoute"
import {useState} from "react"
import Authentication from "../src/components/Authentication/Authentication"
function App() {
  const[isAuth, setIsAuth]= useState(true)
  function dynamicUrl(){
    const {account} = useParams
    return(<h3>url : {account}</h3>)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <LoginTab></LoginTab>
        </Route>
        <Route exact path="/register">
          <SignUp></SignUp>
        </Route>
        <Route  path='/oauth/authenticate/:access_token([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' isAuth={isAuth}><Authentication></Authentication></Route>
        {/* <Route  path='/oauth/authenticate/:access_token'><Authentication></Authentication></Route> */}
      <ProtectedRoute exact path='/dashboard' component = {Dashboard} isAuth={isAuth}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
