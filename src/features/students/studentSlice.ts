import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { students } from '@/data/students_data.json';

export interface IStudent {
  id: number;
  name: string;
  roll_number: string;
  class: string;
  section: string;
  attendance: number;
  marks: {
    maths: number;
    science: number;
    english: number;
  };
}

const initialState: { students: IStudent[] } = {
  students: students,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Omit<IStudent, 'id'>>) => {
      const newStudentId = state.students[students.length - 1]?.id + 1;
      state.students.unshift({ id: newStudentId, ...action.payload });
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
