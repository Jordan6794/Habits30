- Finish design add grey profile pic ?:  et make footer ; undo et clear en plain text btn ?
- Make name editable (popup edit habit onclick sur le name ?) (ou alors contenteditable + manually onChange qui update in state & db ?)
- remove side effects in undo button the same way I did with add colors
- move le form input en last row du table ?
- make un explanation / title area
- implement le show password feature
- Gerer les user auth req erreurs et display dans le form
- finish refacto
- switch en redux
- Update le state client AFTER les http request et manage les errors dans l'UX si error
- add email to signup (and login with email too)

Improvements :
- Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
- get une favicon
- Make un truc pour move up/down habits in the list
- make algorythm rules parametrables ?
- fix le bug où je met le counter a 25 après undo sur finish streak ? (need to keep in state history of greencount when finishStreak)
- Rendre multipage ? make le website plus landing page like avec explanation page & habits page ? make organizer dans une page ?
- Avoir un listener sur la db plutot que state
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))

Debatable ?
- change design of cells borders ?
- Change design/colors of win/lose cells
- mettre le 0 counter en grey plutot que green ?