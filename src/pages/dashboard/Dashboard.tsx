import { deleteStudent, IStudent } from '@/features/students/studentSlice';
import UiCheckbox from '@/ui/checkbox/UiCheckBox';
import UiTable from '@/ui/table/UiTable';
import UiPageWrapper from '@/ui/UIPageWrapper';
import { ColumnDef } from '@tanstack/react-table';
import UiButton from '@/ui/UiButton';
import { Funnel, Plus, Trash } from 'lucide-react';
import { useCheckPermissions } from '@/services/useCheckPermissions';
import { useDashboard } from './hooks/useDashboard';
import UiSelector from '@/ui/selectore/UiSelector';
import { students } from '@/data/students_data.json';
import AddStudent from './components/AddStudent';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const {
    states: { isAdmin },
  } = useCheckPermissions();

  const dispatch = useDispatch();

  const {
    states: { selectedClass, selectedSection, filteredData, addStudentModal },
    setStates: { setSelectedClass, setSelectedSection, setAddStudentModal },
  } = useDashboard();
  const columnDef: ColumnDef<IStudent>[] = [
    {
      accessorKey: 'id',
      header: ({ table }) => {
        const allSelected = table.getIsAllPageRowsSelected();

        return (
          <UiCheckbox
            id='header'
            className='size-4 bg-white'
            enabled={allSelected}
            setEnabled={table.getToggleAllPageRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <UiCheckbox
          className='size-4 bg-white'
          id={String(row?.original?.id)}
          enabled={row.getIsSelected()}
          setEnabled={row.getToggleSelectedHandler()}
        />
      ),
    },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'roll_number', header: 'Roll Number' },
    { accessorKey: 'class', header: 'Class' },
    { accessorKey: 'section', header: 'Section' },
    {
      accessorKey: 'attendance',
      header: 'Attendance',
      cell: ({
        row: {
          original: { attendance },
        },
      }) => {
        return <span>{attendance}%</span>;
      },
    },
    {
      accessorKey: 'marks',
      header: 'Avg. marks',
      cell: ({ row: { original } }) => {
        const avgMarks = Math.round(
          Object.values(original.marks).reduce((acc, curr) => acc + curr, 0) /
            Object.values(original.marks).length
        );
        return <span>{avgMarks}</span>;
      },
    },
  ];

  if (isAdmin) {
    columnDef.push({
      header: 'Actions',
      cell: (cell) => {
        const id = cell.row.original.id;
        return (
          <UiButton
            className='w-6 h-6 bg-error/10 text-error'
            icon={<Trash className='size-4' />}
            onClick={() => {
              dispatch(deleteStudent(id));
            }}
          />
        );
      },
    });
  }

  const uniqueClassOptions = Array.from(
    new Set(students.map((student) => student.class))
  ).map((eachStudent) => ({
    name: eachStudent,
    value: eachStudent,
  }));

  const uniqueSections = Array.from(
    new Set(students.map((student) => student.section))
  ).map((eachSection) => ({
    name: eachSection,
    value: eachSection,
  }));

  return (
    <UiPageWrapper className='p-4'>
      <div className='border border-offWhite rounded w-full p-2 flex flex-col gap-4'>
        <h3 className='text-heading text-md flex items-center gap-2'>
          <Funnel className='size-4' />
          <span>Filter Students</span>
        </h3>
        <section className='flex items-center gap-4'>
          <UiSelector
            label='Class'
            placeholder='Select Class'
            value={selectedClass}
            options={uniqueClassOptions}
            onChange={(val) => {
              setSelectedClass(val);
            }}
            className='border  border-offWhite w-60 h-8 rounded'
            containerClass=''
          />
          <UiSelector
            label='Section'
            placeholder='Select Sections'
            value={selectedSection}
            options={uniqueSections}
            onChange={(val) => {
              setSelectedSection(val);
            }}
            className='border  border-offWhite w-60 h-8 rounded'
          />
        </section>
      </div>
      <UiTable
        columnsSchema={columnDef}
        dataSet={filteredData}
        actionButtonComponent={
          isAdmin ? (
            <UiButton
              text='Add Student'
              className='px-4 h-9 flex flex-row-reverse bg-uiBlue text-white'
              icon={<Plus className='size-4' />}
              onClick={() => setAddStudentModal(true)}
            />
          ) : (
            <></>
          )
        }
        maxHeightClassName='h-[calc(100vh-20vh)]'
      />
      {addStudentModal && (
        <AddStudent
          isOpen={addStudentModal}
          handleClose={() => setAddStudentModal(false)}
        />
      )}
    </UiPageWrapper>
  );
};

export default Dashboard;
