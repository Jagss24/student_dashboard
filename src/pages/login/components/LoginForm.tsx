import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  const {
    functions: { handleSubmit },
  } = useLogin();
  return (
    <section className='flex items-start justify-center'>
      <section className='w-[500px] border border-offWhite relative flex flex-col gap-6  bg-white z-10 px-8  py-8 rounded-md shadow-xl'>
        <section className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-2xl font-semibold'>Welcome</h2>
          <p className='text-dark-gray font-medium text-sm'>
            Sign in to access your students dashboard analytics.
          </p>
        </section>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 items-center gap-2'>
            <label className='text-subHeading text-sm font-medium'>
              Select Role:{' '}
            </label>
            <select
              name='role'
              className='border border-offWhite outline-none p-1 rounded text-sm focus:focus:border-uiBlue'>
              <option value='admin'>Admin</option>
              <option value='student'>Student</option>
            </select>
          </div>
          <input
            type='text'
            name='username'
            className=' border border-gray outline-none rounded p-2 text-sm focus:border-uiBlue'
            placeholder='Enter your username'
          />
          <input
            type='password'
            name='password'
            className=' border border-gray outline-none rounded p-2 text-sm focus:border-uiBlue'
            placeholder='Enter your password'
          />

          <button
            type='submit'
            className='bg-uiBlue text-white rounded w-full flex items-center justify-center p-2 hover:brightness-90 duration-300 cursor-pointer h-12'>
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default LoginForm;
