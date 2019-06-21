import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    calcStr: ""   //need it to be string not mixing types
  };
  
  makeCalcStr = (calc) => {
    switch (calc) {
      case "=":   this.calculteIt(); break
      case "DEL": this.deleteIt(); break
      case "CLR": this.clearIt(); break
      case "0":   if (this.state.calcStr == ""){calc=""}; break //clear leading 0
      default:    if (this.state.calcStr == "ERR"){this.state.calcStr = ""} //setState doesnt wirk so fudge it!
                  this.setState({calcStr: this.state.calcStr+calc})
    }//end switch
  } //end makeCalcStr
  deleteIt = () => {
    this.setState({calcStr: ""})
  }
  clearIt = () => {
    /*remove last key entered*/
    this.setState({calcStr: this.state.calcStr.slice(0, -1)})
  }
  calculteIt = () => {
    let result = ""
    try {result = eval(this.state.calcStr || "")}
    catch (err) { console.log('error'); result = "ERR"}
    this.setState({calcStr: result.toString()})
  }
  
  render() {
    const buttonArray = ["(", ")", ".", "/",
                    "7", "8", "9", "*",
                    "4", "5", "6", "+",
                    "1", "2", "3", "-",
                    "0", "DEL", "CLR", "="]
    return (
        <div className="calculatorBox">
              <KeyBox num={buttonArray} calc={this.makeCalcStr}/>
            <div id="outputBox">{this.state.calcStr}</div>
        </div>
    );
  }
}

const KeyBox = props => (
  <div className = "numberBox">
  {
    props.num.map(buttonVal => {
      return <button name={buttonVal} onClick={event => props.calc(event.target.name)}>{buttonVal}</button>
    })
  }

  </div>
)


export default App;
