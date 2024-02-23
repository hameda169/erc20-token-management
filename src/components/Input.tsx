import React, { ReactNode } from 'react';
import './styles.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

function TextInput({ label, ...props }: Props) {
  return (
    <label className='input-label'>
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

export default TextInput;
