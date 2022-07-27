- feedback SVG
- Put Goath
- Rewrite all text properly + spellcheck
- Get un header pour le phone w time battery etc
- LandingPage: put slide animation on every part (nearly)
- Redirect/guard from landing if logged in (can remove navigate after auth and only let refresh too after that)
- Remove public acc
- Make it responsive in mobil (smaller fonts + reduce padding + habit details in column with 2 raws)

Improvements :
- Gerer les user auth req erreurs et display dans le form
- Put tokentime to 999days ?
- Lacher 5e pour get un logo
- add lifetime success/fail for stats ?
- Make a leftNav design on desktop ? (same habitify et habstreak)
- Initialise didChange at false ? or just not put in DB ?
- Put loading text/skeleton on dashboard too
- Add lazy loading for router
- Pour les await database UI faire un loading & success modal (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- implement le show password feature
- Spellcheck everything
- get une favicon
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/
- Put link/pages on footer stuff
- recheck refacto
- Improve ma landing page (habitify ou habstrak inspiration : background-image / switch backgrounds notament)
- Faire profile page ?
- Make un truc pour move up/down habits in the list ?
- Get a domain name and spend a few 10s$ for marketing : SO WORTH for portfolio to have a real app with (few) active users

Later/Osef :
- Make a score/gamifying ?
- Avoir un listener sur la db plutot que state
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))


Debatable ?
- Design sideNav (and put responsive uperbar for mobile) ?
-  Switch preview to carousel/video ?
- Repasser client state update first before database requests ? (seems faster pas d'effet laggy)
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)


Names : Habits30 // Habitistreak StreakHabit StreakHab 
