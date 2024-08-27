import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    setquizName:'',
    setquizType:'',
    setquestions:[] 
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizName(state, action) {
            state.quizName = action.payload;
        },
        setQuizType(state, action) {
            state.quizType = action.payload;
        },
        setQuestions(state, action) {
            state.questions = action.payload;
        },
    },
});

export const { setQuizName, setQuizType, setQuestions } = quizSlice.actions;
export default quizSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk for creating a quiz
// export const createQuiz = createAsyncThunk(
//   'quiz/createQuiz',
//   async (quizData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/quizze/createquiz', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(quizData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create quiz');
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const quizSlice = createSlice({
//   name: 'quiz',
//   initialState: {
//     quizName: '',
//     quizType: '',
//     questions: [],
//     status: 'idle', // or 'loading' or 'succeeded' or 'failed'
//     error: null,
//   },
//   reducers: {
//     setQuizName: (state, action) => {
//       state.quizName = action.payload;
//     },
//     setQuizType: (state, action) => {
//       state.quizType = action.payload;
//     },
//     setQuestions: (state, action) => {
//       state.questions = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createQuiz.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createQuiz.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Handle the successful response
//       })
//       .addCase(createQuiz.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { setQuizName, setQuizType, setQuestions } = quizSlice.actions;
// export default quizSlice.reducer;