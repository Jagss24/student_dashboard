import { LoaderCircle } from 'lucide-react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  text?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  tertiaryLoaderText?: string;
};

const UiButton = ({
  text,
  icon,
  isLoading,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={isLoading || rest.disabled}
      className={`text-sm text-body font-medium flex items-center justify-center   gap-1  
            cursor-pointer ${rest.className} hover:brightness-90 rounded transition-all disabled:opacity-60 
             disabled:cursor-not-allowed outline-none`}>
      <>
        {text ? <>{text}</> : <></>}
        {icon ? <span>{icon}</span> : <></>}
      </>
      {isLoading && <LoaderCircle className='size-5 animate-spin text-body' />}
    </button>
  );
};

export default UiButton;
