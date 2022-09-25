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
      <div className="text-2xl font-bold pb-12 flex h-28">
        <div className="self-center w-48 text-right">
          {label && (
            <label className="mr-8 h-12" htmlFor={id}>
              {label}
            </label>
          )}
        </div>
        <div>
          <input
            className="w-112 h-12 rounded-full text-center p-8"
            type="text"
            id={id}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          {isError && (
            <p className="font-regular text-base text-red p-2 ml-4">{errMsg}</p>
          )}
        </div>
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
export default FormInput;
