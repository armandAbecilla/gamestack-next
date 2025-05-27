import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  JSX,
  forwardRef,
  Ref,
} from 'react';

type BaseProps = {
  id: string;
  className?: string;
};

type InputProps = BaseProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    textarea?: false;
  };

type TextareaProps = BaseProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    textarea: true;
  };

type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function Input({ id, className, textarea, ...props }, ref): JSX.Element {
    if (textarea) {
      return (
        <>
          <textarea
            id={id}
            name={id}
            className={`w-full bg-white px-2 py-1 text-xl text-stone-800 focus:outline-0 ${className || ''}`}
            {...(props as DetailedHTMLProps<
              TextareaHTMLAttributes<HTMLTextAreaElement>,
              HTMLTextAreaElement
            >)}
            ref={ref as Ref<HTMLTextAreaElement>}
          />
        </>
      );
    } else {
      return (
        <>
          <input
            id={id}
            name={id}
            className={`w-full bg-white px-2 py-1 text-xl text-stone-800 focus:outline-0 ${className || ''}`}
            {...(props as DetailedHTMLProps<
              InputHTMLAttributes<HTMLInputElement>,
              HTMLInputElement
            >)}
            ref={ref as Ref<HTMLInputElement>}
          />
        </>
      );
    }
  },
);

export default Input;
