import React from 'react'

const Button = ({children, onDismiss, className = ''}) =>
    <button onClick={onDismiss} className={className} type="button">
        {children}
    </button>;

export default Button;