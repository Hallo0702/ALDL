import { FC, forwardRef } from 'react';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  id: string;
  isError?: boolean;
  errMsg?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, isError, errMsg, onChange, ...rest }, ref) => {
    return (
      <div className="flex flex-col text-xl font-bold w-full justify-center items-center h-20">
        <input
          className="w-full max-w-sm h-12 p-4 border border-black bg-white rounded-full focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 text-center text-black"
          type="text"
          id={id}
          placeholder={label}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        <p className="h-4 font-medium text-sm text-red">{isError && errMsg}</p>
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
export default FormInput;
