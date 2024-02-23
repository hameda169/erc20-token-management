import React from 'react';

function Form({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={`form ${className}`} {...props} />;
}

export default Form;
