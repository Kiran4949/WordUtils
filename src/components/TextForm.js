import React, { useState } from 'react'  



export default function TextForm(props) {
  const handleOnChange =(event)=>{  
    setText(event.target.value)
  }

  const handleUpClick=()=>{
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to Upper Case!", "Success :")
  }

  const handleLoClick =()=>{
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to Lower Case!", "Success :")
  }

  const handleClearClick =()=>{
    let newText = '';
    setText(newText)
    props.showAlert("Text Cleared!", "Success :")
    
  }

  const handleCopy =()=>{
    navigator.clipboard.writeText(text);  
    props.showAlert("Copied to Clipboard!", "Success :")
  }

  const handleExtraSpaces =()=>{
    let newText = text.split(/[ ]+/);  
    setText(newText.join(" "))
    props.showAlert("Extra Spaces removed!", "Success :")
  }


  const [text, setText] = useState(''); 

  return (
    <> 
    <div className="container" style={{color: props.mode === 'dark'?'white':'#042743'}}>
        <h2 className='my-2'> {props.heading} </h2>
        <div className="mb-3">
        <textarea className="form-control" id="myBox" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark'?'#13466e':'white', color: props.mode === 'dark'?'white':'#042743'}} rows="8"></textarea> 
        </div>                                                                                
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick} > Convert to UpperCase </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick} > Convert to LowerCase </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy} > Copy </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces} > Remove Extra Spaces </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick} > Clear Text </button>
    </div>
    <div className="container my-3" style={{color: props.mode === 'dark'?'white':'#042743'}}>
      <h2> Your text summary</h2>
      <p> {text.split (/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters. </p>
                          {/* /\s+/ it is a regular expression and \s (backslash s means white space) is for space including new line (and + is for one or more space)   */}
      <p> {0.008 * text.split (" ").filter((element)=>{return element.length!==0}).length} minutes required to read.</p>
      <h2> Preview </h2>
      <p> {text.length>0?text:"Nothing to Preview!"} </p>
    </div>
    </>
  )
}
