import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronsUpDownIcon } from 'lucide-react';

type TSelectorProps<T> = {
  placeholder: string;
  label?: string;
  value: any;
  options: T[];
  className?: string;
  accessorKey?: string;
  disabled?: boolean;
  onChange: (option: T) => void;
  containerClass?: string;
};
export default function UiSelector<T extends Record<string, any>>({
  placeholder = 'Select any option',
  label,
  value,
  onChange,
  options,
  disabled = false,
  className = '',
  accessorKey = 'name',
  containerClass,
}: TSelectorProps<T>) {
  return (
    <Listbox onChange={onChange} disabled={disabled}>
      {({ open }) => {
        return (
          <>
            <p className='text-xs font-semibold tracking-wider text-body pl-1'>
              {label}
            </p>
            <ListboxButton
              className={`w-full h-10 outline-none text-sm
          flex items-center justify-between text-body font-semibold pl-2 pr-1 ${className}
       disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-extraLightGray/30 `}>
              <span
                className={`text-sm  ${
                  value?.[accessorKey]
                    ? 'text-subHeading font-semibold'
                    : 'text-darkGray/80 font-medium'
                }`}>
                {value?.[accessorKey] || placeholder}
              </span>
              <span className='text-gray'>
                <ChevronsUpDownIcon className='h-5 w-5' aria-hidden='true' />
              </span>
            </ListboxButton>

            {open && (
              <ListboxOptions
                anchor='bottom'
                static
                as='div'
                className={`w-[var(--button-width)] shadow-md border bg-white
           border-extraLightGray rounded overflow-y-auto outline-none z-50 ${containerClass}`}>
                {options?.map((option) => (
                  <ListboxOption
                    key={option?.id}
                    value={option}
                    className='px-4 py-2 text-sm font-medium transition-colors cursor-auto select-none  outline-none
                   data-[selected]:text-white data-[selected]:bg-primary data-[focus]:text-body data-[focus]:bg-primary/20'>
                    {option?.[accessorKey]}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </>
        );
      }}
    </Listbox>
  );
}
