import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

type TBasicObj = { name: string; value: string };
export const useDashboard = () => {
  const [selectedClass, setSelectedClass] = useState<null | TBasicObj>(null);
  const [selectedSection, setSelectedSection] = useState<null | TBasicObj>(
    null
  );
  const [attendanceRange, setAttendanceRange] = useState({
    from: '',
    to: '',
  });
  const { students } = useSelector((state: RootState) => state.students);
  const [addStudentModal, setAddStudentModal] = useState(false);

  const filteredData = useMemo(() => {
    return students.filter((item) => {
      const matchesClass = selectedClass
        ? item.class === selectedClass.value
        : true;

      const matchesSection = selectedSection
        ? item.section === selectedSection.value
        : true;
      const attendance = item.attendance; // or item.attendancePercentage

      const matchesRange =
        (!attendanceRange.from || attendance >= Number(attendanceRange.from)) &&
        (!attendanceRange.to || attendance <= Number(attendanceRange.to));

      return matchesClass && matchesSection && matchesRange;
    });
  }, [students, selectedClass, selectedSection, attendanceRange]);
  return {
    states: {
      filteredData,
      selectedClass,
      selectedSection,
      attendanceRange,
      addStudentModal,
    },
    setStates: {
      setSelectedClass,
      setSelectedSection,
      setAttendanceRange,
      setAddStudentModal,
    },
  };
};
