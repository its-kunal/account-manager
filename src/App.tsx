import React, { useEffect, useRef } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar'
import AsideNavbar from './components/AsideNavbar'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './app/hook'
import { selectBook, addEntry } from "./features/book"
import { Chart } from "react-google-charts";
import { Entry } from './interfaces/entry'

export default function App() {
  const book = useAppSelector(selectBook)

  // Chart Data
  let totalExpenses: number = 0, totalSavings: number = 0, totalFlow: number = 0
  const options = {
    title: "Savings, Expenses and Cash Flow",
    hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
    legend: "none"
  };
  book.forEach((v) => {
    totalFlow += Number(v.amount)
    if (v.type == 'Expenses') {
      totalExpenses += Number(v.amount)
    }
    else {
      totalSavings += Number(v.amount)
    }
  })
  const data = [
    ["Type", "Amount"],
    ["Savings", totalSavings],
    ["Expenses", totalExpenses],
    ["Cash Flow", totalFlow]
  ]
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Body */}
      <div className="container d-flex mt-4">
        {/* Aside Navbar */}
        <AsideNavbar />
        <div className="container">
          <div className="container">
            {FormComponent()}
          </div>
          {/* Routes */}
          <Routes>
            {/* Route - / */}
            <Route element={
              <div className='container'>
                {/* Chart */}
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width="80%"
                  height="400px"
                  legendToggle
                />
              </div>
            } path="/" />
            {/* Route - /savings */}
            <Route path='/savings' element={
              <div className="container">
                <ol className="list-group list-group-numbered">
                  {
                    book.map((v, i) => {
                      if (v.type == "Savings") {
                        return (
                          <ListComponent v={v} />
                        )
                      }
                    })
                  }
                </ol>
              </div>
            } />
            {/* Route - /account */}
            <Route path='/account' element={
              <div className="container">
                <ol className="list-group list-group-numbered">
                  {
                    book.map((v, i) => {
                      return (
                        <ListComponent v={v} />
                      )
                    })
                  }
                </ol>
              </div>
            } />
            {/* Route - /expenses */}
            <Route path='/expenses' element={
              <div className="container">
                <ol className="list-group list-group-numbered">
                  {
                    book.map((v, i) => {
                      if (v.type == "Expenses") {
                        return (
                          <ListComponent v={v} />
                        )
                      }
                    })
                  }
                </ol>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </>
  )
}

// Form Component
function FormComponent() {
  const formRef = useRef<any>()
  const dispatch = useAppDispatch()
  return <form ref={formRef} className='row gx-4' onSubmit={(e) => {
    e.preventDefault()

    let d: Entry = {
      amount: Number(formRef.current.amount.value),
      createdAt: Date.now().toString(),
      title: String(formRef.current.entry.value),
      type: formRef.current.type.value == 'savings' ? 'Savings' : 'Expenses'
    }
    console.log(d)
    dispatch(addEntry(d))
  }}>
    <div className="mb-3 col-4">
      <label htmlFor="exampleInputEmail1" className="form-label">Entry Details</label>
      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='entry' required />
    </div>
    <div className="mb-3 col-2">
      <label htmlFor="exampleInputEmail" className="form-label">Entry Amount ($)</label>
      <input type="number" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name='amount' required />
    </div>
    <div className="mb-3 col-auto">
      <label htmlFor="selectBox" className='form-label'>Select Entry Type</label>
      <select className="form-select" aria-label="Default select example" id='selectBox' name='type' required>
        <option value="savings" selected>Savings</option>
        <option value="expenses">Expenses</option>
      </select>
    </div>
    <div className="mb-3 col-auto d-flex flex-column">
      <label htmlFor="" className='form-label'>&nbsp;</label>
      <button className="btn btn-primary" type='submit'>
        <i className="bi bi-plus-circle"></i>
      </button>
    </div>
  </form>
}

// List Component
export function ListComponent({ v }: { v: Entry }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{v.title}</div>
        {/* {(new Date(Date(v.createdAt))).getDate()} */}
      </div>
      {v.type == "Savings" ?
        <span className="badge bg-success rounded-pill"><i className="bi bi-plus-square"></i><span>&nbsp;&nbsp;</span><span>$&nbsp;{Number(v.amount)}</span></span> :
        <span className="badge bg-danger rounded-pill"><i className="bi bi-dash-square-dotted"></i><span>&nbsp;&nbsp;</span>$&nbsp;{Number(v.amount)}</span>}
    </li>
  )
}
