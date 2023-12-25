import React from 'react'

function Alert(props) {

  return (
    <div style={{height: '50px'}}>
    {props.alert && <div className="alert alert-dismissible fade show text-primary" role="alert" style={{color: props.alert === 'white'?'dark':'white'}}>
        <strong> {props.alert.type} </strong> {props.alert.msg}
    </div>}
    </div>
  )
}

export default Alert
