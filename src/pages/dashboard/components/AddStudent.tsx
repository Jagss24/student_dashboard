import { addStudent } from '@/features/students/studentSlice';
import UiTextInputBase from '@/ui/inputs/UiTextInputBase';
import UiModalContainer from '@/ui/modal/UiModal';
import UiButton from '@/ui/UiButton';
import { ArrowRight, User } from 'lucide-react';
import { useDispatch } from 'react-redux';

const AddStudent = ({
  handleClose,
  isOpen,
}: {
  handleClose: () => void;
  isOpen: boolean;
}) => {
  const dispatch = useDispatch();
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
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.target as HTMLFormElement;
          const formData = new FormData(formElement);
          const name = formData.get('name') as string;
          const rollNumber = formData.get('roll_number') as string;
          dispatch(
            addStudent({
              name,
              roll_number: rollNumber,
              class: '10th',
              section: 'B',
              marks: { english: 81, maths: 80, science: 90 },
              attendance: 55,
            })
          );
          handleClose();
        }}
        className='flex flex-col gap-4 w-[500px]'>
        <UiTextInputBase
          name='name'
          label='Name'
          placeholder='Eg: Rohan Shetty'
        />
        <UiTextInputBase
          name='roll_number'
          label='Roll Number'
          placeholder='Eg: S0101'
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
