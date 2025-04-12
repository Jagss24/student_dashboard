import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import UiButton from '../UiButton';

type ModalWrapperProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  headSection?: React.ReactNode;
  containerClass?: string;
  children: React.ReactNode;
  disableCloseButton?: boolean;
};

const UiModalContainer = ({
  isOpen,
  headSection,
  containerClass,
  children,
  disableCloseButton,
  handleCloseModal,
}: ModalWrapperProps) => {
  return (
    <Dialog
      as='div'
      className='relative z-50 focus:outline-none'
      open={isOpen}
      onClose={handleCloseModal}>
      <div className='fixed inset-0 z-50 w-screen overflow-y-auto backdrop-blur-sm' />
      <div className='fixed inset-0 z-50 w-screen bg-body/50 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <DialogPanel
            transition
            className={`relative bg-white rounded-lg px-6 py-6 flex flex-col gap-4 shadow-xl border-b-4 border-primary duration-300 ease-out  data-[closed]:opacity-0 ${containerClass}`}>
            <section className='flex items-start justify-between gap-8 '>
              {headSection}
              {!disableCloseButton ? (
                <UiButton
                  className='text-subHeading absolute top-6 right-6 '
                  icon={<X className='size-5' />}
                  onClick={handleCloseModal}
                  disabled={disableCloseButton}
                />
              ) : null}
            </section>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UiModalContainer;
