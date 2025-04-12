import { CheckIcon } from 'lucide-react';

interface IToggleProps {
  enabled: boolean;
  setEnabled?: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  className?: string;
}

const UiCheckbox = ({ enabled, setEnabled, id, className }: IToggleProps) => {
  return (
    <>
      <label
        htmlFor={id}
        data-checked={enabled}
        className={`group rounded ring-1 ring-gray data-[checked=true]:bg-primary
         data-[checked=true]:ring-primary flex items-center justify-center cursor-pointer ${className}`}>
        <CheckIcon className='hidden text-white group-data-[checked=true]:block' />
      </label>
      <input
        id={id}
        type='checkbox'
        checked={enabled}
        onChange={setEnabled?.bind(this)}
        className='border-transparent hidden'
      />
    </>
  );
};

export default UiCheckbox;
