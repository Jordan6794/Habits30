import React, { useState } from "react";

function Habbit(props) {
   const [colors, setColors] = useState([]);
   const daysToValidateStep = 4; //TODO put back to 13 normally
   const [previousArray, setPreviousArray] = useState([]);
   const [undidStreak, setUndidStreak] = useState(false);

   function clickedGood() {
      setColors((prevValue) => {
         if (prevValue[0] === "r" || prevValue[0] === "dr") {
            return ["g"];
         } else if (prevValue[0] === "f") {
            const redCount = colorCounter(prevValue, "r");
            if (redCount === 0) {
               return ["f"];
            } else {
               return [...prevValue, "g"];
            }
         } else {
            return [...prevValue, "g"]; // g = green = good
         }
      });
      greenStreakChecks();
   }

   function clickedBad() {
      setColors((prevValue) => {
         if (prevValue[0] === "dr") {
            return ["dr"];
         } else {
            return [...prevValue, "r"];
         } // r = red = bad
      });
      redStreakChecks();
   }

   function greenStreakChecks() {
      setColors((prevValue) => {
         const dgCount = colorCounter(prevValue, "dg");
         const greenCount = colorCounter(prevValue, "g");
         const fCount = colorCounter(prevValue, "f");
         if (fCount === 0) {
            if (dgCount === 0) {
               if (greenCount >= daysToValidateStep) {
                  setPreviousArray(prevValue);
                  setUndidStreak(false);
                  return ["dg"];
               } else {
                  return prevValue;
               }
            } else if (dgCount === 1) {
               if (greenCount >= daysToValidateStep) {
                  const redCount = colorCounter(prevValue, "r");
                  if (redCount === 0) {
                     // if 0 fail upgrade to fg directly
                     setPreviousArray(prevValue);
                     setUndidStreak(false);
                     return ["f"];
                  } else {
                     setPreviousArray(prevValue);
                     setUndidStreak(false);
                     return ["dg", "dg"];
                  }
               } else {
                  return prevValue;
               }
            } else if (dgCount === 2) {
               if (greenCount >= daysToValidateStep) {
                  setPreviousArray(prevValue);
                  setUndidStreak(false);
                  return ["f"]; // f = finished = Habbit validated
               } else {
                  return prevValue;
               }
            } else {
               console.log("dg count not in boundaries, dgCount : " + dgCount);
               return prevValue;
            }
         } else {
            const redCount = colorCounter(prevValue, "r");
            if (greenCount > redCount * 3) {
               setPreviousArray(prevValue);
               setUndidStreak(false);
               return ["f"];
            } else {
               return prevValue;
            }
         }
      });
   }

   function redStreakChecks() {
      setColors((prevValue) => {
         //checking for 2 red consequtive or 3 reds in first 14 days : reset the habbits to 0
         if (hasTooManyRedConsecutive(prevValue) || hasTooManyRed(prevValue)) {
            const fgCount = colorCounter(prevValue, "f");
            if (fgCount === 1) {
               setPreviousArray(prevValue);
               console.log(`the previous array is ${previousArray}`);
               setUndidStreak(false);
               return ["dg"];
            } else {
               setPreviousArray(prevValue);
               setUndidStreak(false);
               return ["dr"]; // dr = darkred = streak of bad
            }
         } else {
            return prevValue;
         }
      });
   }

   function hasTooManyRedConsecutive(arr) {
      const dgCount = colorCounter(arr, "dg");
      const fgCount = colorCounter(arr, "f");
      let maxConsecutiveNumber = 2;
      if (dgCount >= 2 || fgCount === 1) {
         maxConsecutiveNumber = 3;
      }

      let previous = null;
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
         if (arr[i] !== previous) {
            previous = arr[i];
            count = 0;
         }
         count += 1;
         if (maxConsecutiveNumber <= count) {
            if (arr[i] === "r" || arr[i] === "dr") {
               return true;
            }
         }
      }
      return false;
   }

   function hasTooManyRed(array) {
      const dgCount = colorCounter(array, "dg");
      const fgCount = colorCounter(array, "f");
      const redCount = colorCounter(array, "r");

      if (dgCount < 2 && fgCount === 0) {
         if (redCount >= 3) {
            return true;
         } else {
            return false;
         }
      } else {
         if (redCount >= 4) {
            return true;
         } else {
            return false;
         }
      }
   }

   function colorCounter(array, color) {
      let counter = 0;
      for (let i = 0; i < array.length; i++) {
         if (array[i] === color) {
            counter++;
         }
      }
      return counter;
   }

   function deleteButton() {
      const id = props.index;
      props.delete(id);
   }

   function clearButton() {
      setColors([]);
   }

   function undoButton() {
      setColors((prevValue) => {
         const lastIndex = prevValue.length - 1;
         if (
            prevValue[lastIndex] === "dg" ||
            prevValue[lastIndex] === "dr" ||
            prevValue[lastIndex] === "f"
         ) {
            if (!undidStreak) {
               setUndidStreak(true);
               return previousArray.filter((prevValue, index) => {
                  const lastPreviousIndex = previousArray.length - 1;
                  return index !== lastPreviousIndex;
               });
            } else {
               return prevValue; // if we already undid one streak we don't do anything
            }
         } else {
            return prevValue.filter((prevValue, index) => {
               return index !== lastIndex;
            });
         }
      });
   }

   function putColors(color, index) {
      return (
         <th
            key={index}
            bgcolor={
               color === "g"
                  ? "green"
                  : color === "dg"
                  ? "darkgreen"
                  : color === "f"
                  ? "lightgreen"
                  : color === "r"
                  ? "red"
                  : color === "dr"
                  ? "darkred"
                  : ""
            }
         ></th>
      );
   }

   return (
      <tr>
         <th>
            <button onClick={clearButton}>Clear</button>{" "}
            <button onClick={deleteButton}>Delete</button>
            <span contentEditable="true">{props.name}</span>
            <button onClick={clickedGood}>+</button>{" "}
            <button onClick={clickedBad}>-</button>
         </th>
         {colors.map(putColors)}
         <th>
            <button onClick={undoButton}>Undo</button>
         </th>
      </tr>
   );
}

export default Habbit;
