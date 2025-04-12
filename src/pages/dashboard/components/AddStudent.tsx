import UiTextInputBase from '@/ui/inputs/UiTextInputBase';
import UiModalContainer from '@/ui/modal/UiModal';
import UiButton from '@/ui/UiButton';
import { ArrowRight, User } from 'lucide-react';

const AddStudent = ({
  handleClose,
  isOpen,
}: {
  handleClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <UiModalContainer
      handleCloseModal={handleClose}
      isOpen={isOpen}
      headSection={
        <div className='flex items-start gap-4  '>
          <section className='w-8 h-8 p-1 bg-primary/90 text-white flex  items-center justify-center rounded-full shadow-md'>
            <User className='size-4' />
          </section>
          <section className='leading-5'>
            <h2 className='text-md font-semibold text-heading'>Add Student</h2>
            <p className='text-sm font-normal text-darkGray'>
              Add a new student to the database
            </p>
          </section>
        </div>
      }>
      <form
        // onSubmit={formMethods.handleSubmit(formSubmitHandler)}
        className='flex flex-col gap-4 w-[500px]'>
        <UiTextInputBase
          name='name'
          label='Name'
          placeholder='Eg: Rohan Shetty'
        />

        <section className='flex items-center gap-2 mt-2'>
          <UiButton
            text='Cancel'
            className='w-full border border-offWhite h-10'
            onClick={handleClose}
          />
          <UiButton
            type='submit'
            text='Submit'
            icon={<ArrowRight className='size-4' />}
            className='w-full bg-uiBlue text-white  border border-offWhite h-10'
          />
        </section>
      </form>
    </UiModalContainer>
  );
};

export default AddStudent;
