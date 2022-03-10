import React from 'react';

const Info = ({ info, setInfo }) => (
    <div 
        className={`alert alert-primary my-3 ${info ? 'alert-shown' : 'alert-hidden'}`}
        //onTransitionEnd={() => setInfo(false)}
        role="alert">
        Telephone number succesfully changed! ;)
    </div>
)


export default Info