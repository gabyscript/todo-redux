
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

/* Thunks y métodos HTTP API */

export const getTodosData = createAsyncThunk(
    'todos/getTodosData',
    async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos');
            if (response) {
                const todos = await response.data
                return {todos}
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async({newTodo}, {rejectWithValue}) => {
        try {
            const response = await axios.post('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos', newTodo)
            const newTask = await response.data;
            return {newTask}
        } catch(error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const checkTodo = createAsyncThunk(
    'todos/checkTodo',
    async({todoId, isChecked}, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`,
            {id: todoId, checked: isChecked}
            )
            return {todoId, isChecked}
        } catch(error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async({todoId}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`,
            {id: todoId}
            )
            if (response) {
                return {todoId}
            }
        } catch(error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
        
    }
)

/* Slice */

const todoSlice = createSlice({
    name: "todosDataList",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getTodosData.pending]: (state, action) => {
            console.log("Consiguiendo información...");
        },
        [getTodosData.fulfilled]: (state, action) => {
            console.log("Información conseguida de manera correcta");
            return action.payload.todos;
        },  
        [addNewTodo.pending]: (state, action) => {
            console.log("Se está agregando una nueva tarea")
        },
        [addNewTodo.fulfilled]: (state, action) => {
            console.log("Tarea agregada correctamente")
            state.push(action.payload.newTask)
        },        
        [checkTodo.pending]: (state, action) => {
            console.log("Chequeando tarea")
        },
        [checkTodo.fulfilled]: (state, action) => {
            const todoIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
            state[todoIndex].checked = action.payload.isChecked;
            console.log("Tarea chequeada con éxito")
        },
        [deleteTodo.fulfilled] : (state, action) => {
            console.log(action.payload.todoId)
            return state.filter((todo) => todo.id !== action.payload.todoId)
        }
    }
});

export default todoSlice.reducer;