const TableRow = ({
  children,
  type = 'row',
  className = '',
}: {
  children: React.ReactNode;
  type?: string;
  className?: string;
}) => {
  return (
    <tr
      data-head={type === 'head'}
      className={`text-left data-[head=true]:sticky data-[head=true]:-top-[1.3px] data-[head=true]:bg-offWhite
       bg-white z-[10]  data-[head=true]:rounded-t hover:bg-offWhite/40 ${className}`}>
      {children}
    </tr>
  );
};

const TableCell = ({
  type = 'td',
  children,
  className,
  leftOffset, // Receive leftOffset as prop instead of calculating
  dataColumnId,
}: {
  children: React.ReactNode;
  type: React.ElementType;
  className?: string;
  leftOffset?: number;
  dataColumnId?: string;
}) => {
  const Component = type;
  return (
    <Component
      className={`px-4 py-4 flex-1 text-sm h-10 border border-extraLightGray text-nowrap ${className}
        ${
          type === 'th'
            ? 'font-semibold text-body bg-offWhite'
            : ' text-heading font-semibold bg-white'
        }`}
      style={{
        position: leftOffset !== undefined ? 'sticky' : '',
        left: leftOffset !== undefined ? `${leftOffset - 0.2}px` : '',
        zIndex: leftOffset !== undefined ? 1 : '',
      }}
      data-column-id={dataColumnId}>
      {children}
    </Component>
  );
};

export { TableRow, TableCell };
