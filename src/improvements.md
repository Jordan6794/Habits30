- Finish design et make footer ; undo et clear en plain text btn ?
- add login and make database user based
- counter de green days ecrit dans le nom de l'habbit
- move le form input en last row du table ?
- make un explanation / title area
- Keep or remove 'day' dans each cell ?
- finish refacto
- add interfaces and models for the rest (formData, User, context etc)
- undo clear ? maybe not
- add prevArray (for undo) dans la data ?
- Template habit si 0 habits : fix que ca save dans la DB ? (will check quand je fais habits par user)

Improvements :
- Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
- put first habit with few days already done if habbits array nul in begining
- get une favicon
- make algorythm rules parametrables ?
- Add un counter de added streak en darkred/finished
- Make name editable (popup edit habit onclick sur le name ?) (ou alors contenteditable + manually onChange qui update in state & db ?)
+ maybe add arrows to move up/down habits in the list