import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

import Navbar from "./Components/Navbar";
import Friendlist from "./Components/Friendlist";
import FriendState from "./Context/Friends/FriendState";
import DocState from "./Context/Docs/DocState";




function App() {
  
 
  return (
    <div className='App'>
      <FriendState>
      <DocState>
      <Router>
      <Navbar/>
     
      <div className="container">
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/friends' element={<Friendlist />} />
       
         
        </Routes>        
       </div> 

      </Router>
      </DocState>
      </FriendState>
    
    </div>
  );
}

export default App;
