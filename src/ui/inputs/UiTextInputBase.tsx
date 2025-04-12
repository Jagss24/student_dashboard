import { Asterisk } from 'lucide-react';
import { ForwardedRef, forwardRef } from 'react';

interface TTextInputBaseProps extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  icon?: React.ReactNode;
  containerClass?: string;
  isRequired?: boolean;
  textHintClassName?: string;
}

const UiTextInputBase = forwardRef<HTMLInputElement, TTextInputBaseProps>(
  (
    {
      label,
      icon,
      containerClass,
      isRequired,
      textHintClassName = '',
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    UiTextInputBase.displayName = 'TextInputBase';

    return (
      <div className={`flex flex-col w-full ${containerClass}`}>
        {label && (
          <label className='text-xs flex items-center gap-1 text-left text-body font-semibold pl-1'>
            {label}
            {isRequired && (
              <Asterisk className='size-2 text-error -translate-y-1' />
            )}
          </label>
        )}
        <section className='w-full relative'>
          <input
            {...rest}
            ref={ref}
            autoComplete='off'
            className={`inputGroup h-10 w-full text-sm 
              text-body font-semibold px-2 py-1 placeholder:font-medium placeholder:text-darkGray/80 outline-none rounded  
               z-10 border border-extraLightGray focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-extraLightGray/30  ${rest.className}`}
          />

          <span className='text-darkGray/80 absolute w-5 right-3 top-1/2 -translate-y-1/2 '>
            {icon}
          </span>
        </section>
      </div>
    );
  }
);

export default UiTextInputBase;
