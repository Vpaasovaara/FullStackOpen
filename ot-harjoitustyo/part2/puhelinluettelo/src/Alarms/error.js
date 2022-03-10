import React from 'react';

const Error = ({ error, setError }) => (
    <div 
        className={`alert alert-danger my-3 ${error ? 'alert-shown' : 'alert-hidden'}`}
        //onTransitionEnd={() => setWarning(false)}
        role="alert">
        Telephone number have already been deleted
    </div>
)


export default Error