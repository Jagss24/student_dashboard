import { ReactNode } from 'react';

function UiPageWrapper({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={` h-screen ${className} w-full overflow-x-hidden`}>
      {children}
    </div>
  );
}

export default UiPageWrapper;
