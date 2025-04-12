import { LoaderCircle } from 'lucide-react';

export const UIPageFullLoader = () => {
  return (
    <main className='h-screen relative w-full flex items-center justify-center'>
      <LoaderCircle className='size-60 text-blue-500 stroke-1 animate-spin' />
      <p
        className='absolute text-heading top-1/2 left-1/2  text-lg -translate-x-1/2 -translate-y-1/2 z-10
      font-semibold tracking-wider'>
        Loading...
      </p>
    </main>
  );
};
