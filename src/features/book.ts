import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Entry } from "../interfaces/entry"


const initialState: Array<Entry> = [
    {
        amount: 8000,
        createdAt: Date.now().toString(),
        title: 'Freelancing Earning',
        type: 'Savings'
    },
    {
        amount: 900,
        createdAt: Date.now().toString(),
        title: 'Gretas Show in west',
        type: 'Expenses'
    },
    {
        amount: 890,
        createdAt: Date.now().toString(),
        title: 'Side Hustle Earning',
        type: 'Savings'
    },
    {
        amount: 100,
        createdAt: Date.now().toString(),
        title: 'Tea Fea',
        type: 'Expenses'
    },
    {
        amount: 10000,
        createdAt: Date.now().toString(),
        title: 'GYM fees',
        type: 'Expenses'
    },
    {
        amount: 1200,
        createdAt: Date.now().toString(),
        title: 'Sports Equipments',
        type: 'Expenses'
    },
    {
        amount: 900,
        createdAt: Date.now().toString(),
        title: 'Health Suplements',
        type: 'Expenses'
    }
]

const bookSlice = createSlice({
    name: 'book',
    initialState: initialState,
    reducers: {
        addEntry: (state, action: PayloadAction<Entry>) => {
            state.push(action.payload)
        }
    }
})

export default bookSlice.reducer
export const { addEntry } = bookSlice.actions
export const selectBook = (state: RootState) => state.book