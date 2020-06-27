import React from 'react';
import moment from 'moment'
import './Calendar.css';

function Calendar(props) {
    var currentDate = moment(props.date);
    var weekdayshort = moment.weekdaysShort();
    let weekdayshortname = weekdayshort.map(day => {
        return (
          <th key={day} className="week-day cell">
           {day}
          </th>
        );
     });
     let onChange = (e)=>{
      props.changeDate(e.target.value);
     }
     let firstDayOfMonth = () => {
        let firstDay = moment(currentDate)
                     .startOf("month")
                     .format("d"); 
       return firstDay;
    };
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(
        <td  key={-i} className="calendar-day empty">{""}</td>
      );
    }
    let daysInMonth = [];
    for (let d = 1; d <=moment(currentDate).daysInMonth(); d++) {
        let today = d == currentDate.format("D") ? "-today" : "";
        let sunday = (parseInt(firstDayOfMonth()-1)+parseInt(d))%7 == 0 ? "sunday" : ""
      daysInMonth.push(
        <td id={today === "" ? d : "today"}key={d} className={"calendar-day cell"+today} >
        <button className={"button"+today} onClick={onChange} value={d}>
          {d}
        </button>
        <div className={"hiddenDay "+sunday}>
          <p>{weekdayshort[(parseInt(firstDayOfMonth()-1)+parseInt(d))%7]}</p>
        </div>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
          cells.push(row); // if index not equal 7 that means not go to next week
        } else {
          rows.push(cells); // when reach next week we contain all td in last week to rows 
          cells = []; // empty container 
          cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
          rows.push(cells);
        }
      });
      let daysinmonth = rows.map((d, i) => {
        return <tr>{d}</tr>;
      });
  return (
    <div className="Calendar">
        <table className="">
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
    </div>
  );
}

export default Calendar;