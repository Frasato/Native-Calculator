import { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './src/Components/Button/Button';
import ButtonLager from './src/Components/ButtonLarge/ButtonLarge';
import { HistoryTypes } from './src/@Types/HistoryTypes';

export default function App() {

  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [calculating, setCalculating] = useState<string>('0');
  const [history, setHistory] = useState<HistoryTypes[]>([]);

  const handleNumberPress = (number: string) =>{
    if(operator){
      setSecondNumber(secondNumber + number);
    }else{
      setFirstNumber(firstNumber + number);
    }
  }

  const handleOperator = (oper: string) =>{
    setOperator(oper);
  }

  const calculate = () =>{
    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);
    let result: number;

    switch(operator){
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "/":
        result = first / second;
        break;
      case "X":
        result = first * second;
        break;
      case "*":
        result = first ** second;
        break;
      case "%":
        result = first % second;
        break;
      default:
        return;
    }

    const historyObject: HistoryTypes = {
      firstNumber: firstNumber,
      operator: operator,
      secondNumber: secondNumber,
      result: result.toString(),
    }

    setHistory([...history, historyObject])
    setCalculating(result.toString());
    setFirstNumber(result.toString());
    setSecondNumber('');
    setOperator('');
  }

  const clear = () =>{
    setFirstNumber('');
    setSecondNumber('');
    setOperator('');
    setCalculating('0');
  }

  const deleteHistory = (id: number): void => {
    const deleted: HistoryTypes[] = history.filter((item: HistoryTypes, index: number)=>{
      return index !== id;
    });

    setHistory(deleted);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.calcContainer}>
        {history.map((numbers, index: number) => {
          return(
          <View key={index} style={styles.hitoryContainer}>
            <TouchableOpacity onPress={()=> deleteHistory(index)}>
              <Text style={styles.history}>{numbers.firstNumber} {numbers.operator} {numbers.secondNumber} = {numbers.result}</Text>
            </TouchableOpacity>
          </View>
          )
        })}
        <Text style={styles.result}>
          {calculating !== '0'? calculating: firstNumber || secondNumber || '0'}
        </Text>
      </View>
      <View style={styles.keyboardContainer}>
        <View style={styles.buttonContainer}>
          <Button text='%' onKeyPress={()=> handleOperator('%')}/>
          <Button text='*' onKeyPress={()=> handleOperator('**')}/>
          <ButtonLager text='C' onKeyPress={()=> clear()}/>
          <Button text='7' onKeyPress={()=> handleNumberPress('7')}/>
          <Button text='8' onKeyPress={()=> handleNumberPress('8')}/>
          <Button text='9' onKeyPress={()=> handleNumberPress('9')}/>
          <Button text='X' onKeyPress={()=> handleOperator('X')}/>
          <Button text='4' onKeyPress={()=> handleNumberPress('4')}/>
          <Button text='5' onKeyPress={()=> handleNumberPress('5')}/>
          <Button text='6' onKeyPress={()=> handleNumberPress('6')}/>
          <Button text='-' onKeyPress={()=> handleOperator('-')}/>
          <Button text='1' onKeyPress={()=> handleNumberPress('1')}/>
          <Button text='2' onKeyPress={()=> handleNumberPress('2')}/>
          <Button text='3' onKeyPress={()=> handleNumberPress('3')}/>
          <Button text='/' onKeyPress={()=> handleOperator('/')}/>
          <Button text='0' onKeyPress={()=> handleNumberPress('0')}/>
          <Button text='+' onKeyPress={()=> handleOperator('+')}/>
          <ButtonLager text='=' onKeyPress={()=> calculate()}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000009',
    height: '100%',
  },
  hitoryContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#062c40',
    width: 250,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  history: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
  },
  calcContainer: {
    height: '45%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  result: {
    color: 'white',
    fontSize: 60,
  },
  keyboardContainer: {
    display: 'flex',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    height: '100%',
    padding: 5,
  },
});
