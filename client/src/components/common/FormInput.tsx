import type { FC } from 'react';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  id: string;
  isError?: boolean;
  errMsg?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  id,
  isError,
  errMsg,
  ...rest
}) => {
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
          {...rest}
        />
        {isError && (
          <p className="font-regular text-base text-red p-2 ml-4">{errMsg}</p>
        )}
      </div>
    </div>
  );
};
export default FormInput;
