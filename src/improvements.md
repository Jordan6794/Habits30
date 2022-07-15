-  Get good desktop screen for preview (or go carousel/video ?)
- add lifetime success/fail for stats ?
- Upgrade design of habit page (need to fill blank/titles etc)
- Initialise didChange at false ? or just not put in DB ?
- Find a name for branding
- Update ma nav
- Redirect/guard from landing if logged in
- Put a button (big enphasis) to make an account when in demo account
- Remove public acc

Improvements :
- recheck refacto
- Put loading text/skeleton on dashboard too
- Make it responsive in mobil (smaller fonts + reduce padding + habit details in column with 2 raws)
- Pour les await database UI faire un loading & success modal (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- implement le show password feature
- Spellcheck everything
- Gerer les user auth req erreurs et display dans le form
- get une favicon
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/
- Put Goath
- Put un routing redirect si on est logged in redirect vers main (and then can remove le navigate de Auth et only laisser refresh)
- Put link/pages on footer stuff
- Faire profile page ?
- Make un truc pour move up/down habits in the list
- fix le bug où je met le counter a 25 après undo sur finish streak ? (need to keep in state history of greencount when finishStreak) : will be good with undo/history into step array
- Get a domain name and spend a few 10s$ for marketing : SO WORTH for portfolio to have a real app with (few) active users
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))
- Make a score/gamifying ?
- Avoir un listener sur la db plutot que state
- Add lazy loading for router


Debatable ?
- Repasser client state update first before database requests ? (seems faster pas d'effet laggy)
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)