- Finish design : add cross pour close auth form modal ; et make footer ; undo et clear en plain text btn ?
- counter de green days ecrit dans le nom de l'habbit (+add dans la data obv)
- move le form input en last row du table ?
- make un explanation / title area
- Gerer les user auth req erreurs et display dans le form
- Auth form btn disabled quand champs pas bien remplis ? Actually easy to do
- finish refacto (maybe can refacto effects in setHabits by having a logic function returning the updated array)
- add interfaces and models for the rest (formData, User, context etc)
- add prevArray (for undo) dans la data ?

Improvements :
- Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
- put first habit with few days already done if habbits array nul in begining
- get une favicon
- Make un truc pour move up/down habits in the list
- make algorythm rules parametrables ?
- Add un counter de added streak en darkred/finished
- Make name editable (popup edit habit onclick sur le name ?) (ou alors contenteditable + manually onChange qui update in state & db ?)