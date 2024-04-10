import { useState } from 'react';
import './App.css';
import Alert from "./components/Alert/Alert";
 import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import TextForm from "./components/TextForm/TextForm";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState('null') 

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert("null");
    }, 2000);
  }

    const toggleMode = ()=>{
      if(mode === 'light'){
        setMode('dark');
        document.body.style.backgroundColor = '#042743';
        showAlert("Dark Mode has been enabled!", "Success :");
        
      }
      else{
        setMode('light')
        document.body.style.backgroundColor = 'white';
        showAlert("Light Mode has been enabled!", "Success :");
        
      }
    }

  return (
    <>
    <Router>
      <Navbar title="WordUtils" about="About US" mode={mode} toggleMode={toggleMode} /> 
      <Alert alert={alert} />
      <div className="container my-3">
      <Routes>
        <Route exact path="/about" element={<About mode={mode} />}/>
        <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try WordUtils - Word counter, Character counter, Remove extra spaces" mode={mode} />}/>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
