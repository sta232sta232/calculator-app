import { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // App.js
  const [memory, setMemory] = useState(0);

  const memoryAdd = () => setMemory(m => m + parseFloat(display));
  const memorySubtract = () => setMemory(m => m - parseFloat(display));
  const memoryRecall = () => setDisplay(memory.toString());
  const memoryClear = () => setMemory(0);



  const handleNumber = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setEquation(equation + display + operator);
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleCalculate = () => {
    const finalEquation = equation + display;
    try {
      const result = evaluate(finalEquation);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // App.js
  const handleScientific = (func) => {
    try {
      let result;
      switch(func) {
        case 'sqrt':
          result = Math.sqrt(parseFloat(display));
          break;
        case 'sin':
          result = Math.sin(parseFloat(display));
          break;
        case 'cos':
          result = Math.cos(parseFloat(display));
          break;
        case 'tan':
          result = Math.tan(parseFloat(display));
          break;
        default:
          throw new Error('Unknown function');
      }
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };


  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="current">{display}</div>
      </div>
      <div className="buttons">
        <div className="scientific-buttons">
          <button onClick={() => handleScientific('sin')}>sin</button>
          <button onClick={() => handleScientific('cos')}>cos</button>
          <button onClick={() => handleScientific('tan')}>tan</button>
          <button onClick={() => handleScientific('sqrt')}>√</button>
        </div>

        <button onClick={memoryAdd}>M+</button>
        <button onClick={memorySubtract}>M-</button>
        <button onClick={memoryRecall}>MR</button>
        <button onClick={memoryClear}>MC</button>

        <button className="span-2" onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleOperator('/')}>/</button>
        
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('*')}>×</button>
        
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')}>-</button>
        
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('+')}>+</button>
        
        <button onClick={() => handleNumber('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="span-2" onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}



export default App;