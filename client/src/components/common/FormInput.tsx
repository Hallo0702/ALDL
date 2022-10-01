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
      <div className="flex text-xl font-bold pb-12 h-24 pr-2">
        <div className="self-center w-48 text-right mt-1">
          {label && (
            <label className="mr-8 h-12" htmlFor={id}>
              {label}
            </label>
          )}
        </div>
        <div>
          <input
            className="flex w-80 h-12 border border-black rounded-full text-center p-4"
            type="text"
            id={id}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          {isError && (
            <p className="font-medium text-base text-red p-2 ml-4">{errMsg}</p>
          )}
        </div>
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
export default FormInput;
