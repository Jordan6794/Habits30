- Feedback colors in dashboard ?
- Put Goath
- Uncoment redirect in App.tsx (change pathnames for landing and table ?)
- Make it responsive in mobil : Finish nav (make sliding modals for hamburger and ...)

Improvements :
- Mettre token a 10days ? Useful for demo accounts (and recheck si tokenexpire logout corectly)
- Lacher 5e pour get un logo
- add lifetime success/fail for stats ?
- Put loading text/skeleton on dashboard too
- Add lazy loading for router
- Pour les await database UI faire un loading & success modal (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- implement le show password feature
- get une favicon
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/
- Put link/pages on footer stuff
- recheck refacto
- Initialise didChange at false ? or just not put in DB ?
- Improve ma landing page (habitify ou habstrak inspiration : background-image / switch backgrounds notament)
- Faire profile page ?
- Make un truc pour move up/down habits in the list ?
- Get a domain name and spend a few 10s$ for marketing : SO WORTH for portfolio to have a real app with (few) active users

Later/Osef :
- Responsiveness for ipad size
- Make a score/gamifying ?
- Avoir un listener sur la db plutot que state
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))


Debatable ?
- leftNav sideNav in desktop ? (and put responsive uperbar for mobile) ?
-  Switch preview to carousel/video ?
- Repasser client state update first before database requests ? (seems faster pas d'effet laggy)
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)


Names : Habits30 // Habitistreak StreakHabit StreakHab 
