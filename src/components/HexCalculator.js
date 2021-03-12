import React, { useState } from 'react';
import '../styles/HexCalculator.css';

function HexCalculator() {

  const calculateHexSum = (firstNumber, secondNumber, carry=0, index=0 , result="") => {
    // base case if index last digit has arrived add push carry to the start of result
    if(index < 0 ){
      // if carry is greater than 0 append it before result else return the result
      return carry  > 0 ? carry + result : result;
    }

    // converts to base 16 and adds carry from the last bit
    const sum = (parseInt(firstNumber[index-1], 16) || 0) + (parseInt(secondNumber[index-1], 16) || 0) +  carry

    // drops 4 bits and keeps the carry
    carry = sum >> 4

    // calls the recursion again to sum the hex
    const resultToBeReturned =  calculateHexSum(
      firstNumber,
      secondNumber,
      carry,
      index - 1,
      (sum & 15).toString(16) + result
      // in the above line sum & 15 actually intersections the 1111 and the digit
      // that we want to add in sum as we have already separated the carry
    )

    return resultToBeReturned
  }

  const [state, setState] = useState({
    firstHexNumber: "",
    secondHexNumber: "",
    output: ""
  });

  const inputChangeHandler = (evt) => {
    const {name, value} = evt.target;
    if(isHex(value) || value.length === 0 ){
      setState({
        ...state,
        output: "",
        [name]: value
      })
    }
  }

  const isHex = (input) => /^[0-9A-Fa-f]+$/.test(input)

  const calculateClickHandler = () => {
    const {firstHexNumber: firstNumber, secondHexNumber: secondNumber} = state;
    if(firstNumber.length < 1 || secondNumber.length < 1 ){
      alert('Please enter both numbers first.')
    }
    else {
      const index = firstNumber.length > secondNumber.length ? firstNumber.length : secondNumber.length;
      setState({
        output: calculateHexSum(firstNumber, secondNumber, 0, index)
      })
    }
  }

  return (
    <div className="Calculator">
      <div>
        <input type="text" className="field" name="firstHexNumber" onChange={inputChangeHandler} placeholder='Add First hexadecimal number' value={state.firstHexNumber} />
      </div>

      <div>
        <input type="text" className="field" name="secondHexNumber" onChange={inputChangeHandler} placeholder='Add Second hexadecimal number'  value={state.secondHexNumber}/>
      </div>

      {
        state.output &&
        <div>
          <span className="output">
            Result: {state.output}
          </span>
        </div>
      }

      <button className="btn" onClick={calculateClickHandler}> Calculate</button>
    </div>
  );
}

export default HexCalculator;
