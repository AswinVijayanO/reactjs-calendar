import React from 'react';
import './App.css';
import moment from 'moment';
import Calendar from './components/Calendar';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date:moment(),month:parseInt(moment().format("M"))-1};
    //this.changeDate = this.setState.bind( this );
    this.changeMonth = this.setState.bind( this );
  }
  handleChange = (e) => {
    let date = moment(this.state.date).set('month',e.target.value ); 
    let monthh = parseInt(moment(date).format("M"))-1
    this.setState({date:date ,month:monthh});
    console.log(e.target.value);
};
changeYear = (e) => {
  let date = moment(this.state.date).set('year',e.target.value ); 
  this.setState({date:date});
  console.log(e.target.value);
};
changeDate = (date) => {
  let newDate = moment(this.state.date).set('date',date); 
  this.setState({date:newDate});
};
incYear = (e) =>{
  let year = parseInt(moment(this.state.date).format("YYYY")) + 1;
  let date = moment(this.state.date).set('year',year); 
  this.setState({date:date});
};
decYear = (e) => {
  let year = parseInt(moment(this.state.date).format("YYYY")) -1;
  let date = moment(this.state.date).set('year',year); 
  this.setState({date:date});
};
  render(){
    return (
      <div className="App">
      <div className="fixedHeader">
      <div className = "header">
      <div className="picker">
      <select value={this.state.month}
                            onChange={this.handleChange} >
          {
            moment.months().map((month,i)=>{
              return <option value={i}>{month}</option>
            })
          }
        </select>
        <button className="addSub"  onClick={this.decYear}>
          -
        </button>
        <input type="number" 
     onInput={this.changeYear} value={moment(this.state.date).format("YYYY")} min = {1987} max={2050}/>
           <button className="addSub"  onClick={this.incYear}>
          +
        </button>
      </div>
        <a href="#today" className="currentDatePanel">
        <p style={{background:'rgba(238, 212, 68, 0.363)',color:'rgb(192, 149, 57)',borderRadius:'6px',padding:'5px 5px'}}>{moment(this.state.date).format("ddd DD")}</p>
        <p  style={{padding:'10px'}}>{moment(this.state.date).format("MMMM")}</p>
        <p  style={{padding:'10px'}}>{moment(this.state.date).format("YYYY")}</p>
        </a>
      </div>
     

      </div>
        <Calendar date={this.state.date} changeDate={this.changeDate}/>
      </div>
    );
  }

}

export default App;
