- Update screenshots in preview

Improvements :
- Improve colors in dashboard ?
- Get a domain name and reput goauth in
- Put Goath : design button
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/
- Mettre token a 10days ? Useful for demo accounts (and recheck si tokenexpire logout corectly)
- get une favicon
- Lacher 5e pour get un logo
- add lifetime success/fail for stats ?
- Put loading text/skeleton on dashboard too
- Add lazy loading for router
- Pour les await database UI faire un loading & success modal (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- implement le show password feature
- Put link/pages on footer stuff
- 
- recheck refacto
- Put each habits stats/infos on edit habit name modal (need lifetime win/fails first too)
- Put active visual cue in hamberger modal left nav
- Initialise didChange at false ? or just not put in DB ?
- Make a sidebranch in github and push to main branch only validated new versions
- Improve ma landing page (habitify ou habstrak inspiration : background-image / switch backgrounds notament)
- Faire profile page ? (then put small round icon with profile pic on nav (can update and get it from google if OAuth))
- Make un truc pour move up/down habits in the list ?

Later/Osef :
- Responsiveness for ipad size
- Make a score/gamifying ?
- Avoir un listener sur la db plutot que state
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))

Small fixes :
- Landing animation in mobile screen howto trigger too late (triggered at bottom of div)


Debatable ?
- leftNav sideNav in desktop ? (and put responsive uperbar for mobile) ?
-  Switch preview to carousel/video ?
- Repasser client state update first before database requests ? (seems faster pas d'effet laggy)
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)


Names : Habits30 // Habitistreak StreakHabit StreakHab 
