//jshint esversion:6
import React, { useState } from "react";
import Habbit from "./Habbit";
import { v4 as uuidv4 } from 'uuid';

//TODO  put database
// need to put a onChange fonction pour changer le habbit.name when change contentEditable ?
// put first habbit with few days already done if habbits array nul in begining
// faire un petit explanation paragraph on top (2 reds or 3 reds in 14 = back to day 1, 14 green = bigGreen etc)
// design
// refacto code a bit (allcaps nonchanging const that are exported, not allcaps if stays within the file)
// make soem small sort of animation when clicking some buttons ? Already by defaut seems, a voir when redesign btns

// Improvements : Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habbit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
// Add un counter de added streak en darkred/finished

function Table() {
  const [habbits, setHabbits] = useState([]);
  const [habbitInput, setHabbitInput] = useState("");
  const numberOfDays = 20;
  let daysArray = [];

  function makeDayArray(){
    for(let i= 1 ; i <= numberOfDays ; i++){
      daysArray.push(i);
    }
  }

  makeDayArray();

  function changeInput(e) {
    const inputValue = e.target.value;
    setHabbitInput(inputValue);
  }

  function submitHabbit(e) {
      const newHabbit = {name: habbitInput, id: uuidv4()};
    setHabbits([...habbits, newHabbit]);
    e.preventDefault();
    setHabbitInput("");
  }

  function deleteHabbit(deleteIndex){
      
    setHabbits(prevHabbits => {
        return prevHabbits.filter((habbit, index) =>{
            return index !== deleteIndex;
        }
        );
    }
    );

    // setHabbits((prevValue) => {
    //       const newValue = prevValue.filter((habbit, id) => {
    //           if(id !== index){return habbit;}
    //       }
    //   );
    //   return newValue;
    // });
    //   setHabbits(habbits.filter((habbit, id) => {
    //     if(id !== index){return habbit;}
    // }));
}

  function createHabbit(habbit, index){
    return <Habbit name={habbit.name} key={habbit.id} index={index} delete={deleteHabbit}/>;
  }

  function MakeDays(day){
    return(
        <th key={day}>Day {day}</th>
    )
  }

  return (
    <div>
      <form post="/">
        <input onChange={changeInput} value={habbitInput}></input>
        <button onClick={submitHabbit} type="submit">
          Submit
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Habbit</th>
            {daysArray.map(MakeDays)}
          </tr>
        </thead>

        <tbody>
          <Habbit name="Organizer morning" />
          {habbits.map(createHabbit)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
