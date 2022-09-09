- Feedback
: Put different streaks and solidified habits as well in the example habits ?

- Faire un gitrepo pour la backend ? And switch from Heroku to Vercel
- Faire un readme pour git (check zach stone and others) : https://www.makeareadme.com/

Improvements :
- Improve colors in dashboard : round2 with less autumn-y colors ?
- Lacher 5e pour get un logo ; logo instead of text or not ?
- Improve icons ? ++ changed to checkmark cross ? And clear icon updated check google icons etc
- Improve design tos/privacy pages + make contact me page
- Fail preview display cue that alerts you if one more fail would make you lose your streak (codewise have to make another array fail preview that I update on each add, and check when failPreview[0] = FAIL_COLOR ? (not display if streak empty or already in fail streak)) (can add a tooltip explaining what it means which a 'don't show anymore' box with boolean in DB ?)
: Make the HowTo modal two pages Basics/Advanced if I start having more features like that ?
- Daily win/fails counter ?? yes/no ? On top habits page ? dashboard ? (add % too, can conditional color)
- Unit Testing with Jest
- Add lazy loading for router
- Improve ma landing page (habitify ou habstrak inspiration : background-image / switch backgrounds notament)
- Make a producthunt post ! (see https://blogtheorem.com/ https://www.producthunt.com/products/testimonialapi)
- recheck refacto
- Put each habits stats/infos on edit habit name modal (win/lose ration add camembert) (+ put date created, and some stats, winrate, time since created etc)
- Better embording : highlights ?
: make a highlight add first habit after the onboarding finish ?
: next level onboarding : https://www.appcues.com/blog/user-onboarding-ui-ux-patterns
- Pour les await database UI faire un loading & success modal/visual display? (see Zach Stone MAC)
- Update le state client AFTER les http request et manage les errors dans l'UX si error (certains put en await + UI, d'autres update client first mais ensuite make error modal si error)
- Responsiveness for ipad size
- Faire profile page ? (then put small round icon with profile pic on nav (can update and get it from google if OAuth))
: Could put checlist tasks for onboarding as well if profile 
- Make un truc pour move up/down habits in the list ? DRAG AND DROP WOULD BE GREAT, see how to do that ; or mouseclick (avec cursor qui change) on boarder of habit ?

Later/Osef :
- Put loading text/skeleton on dashboard too
- implement le show password feature
- Put active visual cue in hamberger modal left nav
- Refactor to have components not aware of auth stuff (Authform + onboarding in table)
- Archive button (+ archive page) for solidifed habits once success reach x (50-75-100) ?
- Improve token check + refresh :
: client-check each request; + une option : token refresh qui remplace pas le token mais qui va echanger contre un nouveau token la premiere fois que le token fail (si le token refresh est toujours valid) (need other than jwt then (ou check leur options))
- Avoir un listener sur la db plutot que state

Debatable ?
- Remove the demo animation ?
- leftNav sideNav in desktop ? (and put responsive uperbar for mobile) ?
-  Switch preview to carousel/video ?
- mettre le 0 counter en grey plutot que green ?
- make algorythm rules parametrables ? (in profile page)