- Improve colors in dashboard : feedback (update screenshot when validated)

- Faire un gitrepo pour la backend ?
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/
- add lifetime success/fail for stats

Improvements :
- Lacher 5e pour get un logo ; logo instead of text or not ?
- Improve design tos/privacy pages + make contact me page
- Improve ma landing page (habitify ou habstrak inspiration : background-image / switch backgrounds notament)
- Make a producthunt post ! (see https://blogtheorem.com/ https://www.producthunt.com/products/testimonialapi)
- Put loading text/skeleton on dashboard too
- recheck refacto
- Better embording!!! (HowTo open by default on first use ? (wbutton don't show again ), DIFFERENT HowToModal split in multiple parts where each part can read more / exit ?) (and precise that can always click How to BTN to read more)
- Add lazy loading for router
- Pour les await database UI faire un loading & success modal/visual display? (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- 
- implement le show password feature
- Put each habits stats/infos on edit habit name modal (need lifetime win/fails first too) (+ put date created, and some stats, winrate, time since created etc)
- Fail preview display cue that alerts you if one more fail would make you lose your streak (codewise have to make another array fail preview that I update on each add, and check when failPreview[0] = FAIL_COLOR ? (not display if streak empty or already in fail streak)) (can add a tooltip explaining what it means which a 'don't show anymore' box with boolean in DB ?)
: Make the HowTo modal two pages Basics/Advanced if I start having more features like that ?
- Responsiveness for ipad size
- Put active visual cue in hamberger modal left nav
- Initialise didChange at false ? or just not put in DB ?
- Faire profile page ? (then put small round icon with profile pic on nav (can update and get it from google if OAuth))
- Make un truc pour move up/down habits in the list ?

Later/Osef :
- Archive button (+ archive page) for solidifed habits once success reach x (50-75-100) ?
- Avoir un listener sur la db plutot que state
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))

Debatable ?
- leftNav sideNav in desktop ? (and put responsive uperbar for mobile) ?
-  Switch preview to carousel/video ?
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)


Names : Habits30 // Habitistreak StreakHabit StreakHab 
