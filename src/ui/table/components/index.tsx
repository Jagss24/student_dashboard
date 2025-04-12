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
      data-column-id={dataColumnId}>
      {children}
    </Component>
  );
};

export { TableRow, TableCell };
