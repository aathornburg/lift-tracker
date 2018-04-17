# Lift Tracker

The way this app is built (all of this could change later.  Just taking steps to learn different ways of doing things):
- ES6 classes as controllers
- ES6 import/export notation vs NodeJS require() notation
- import { name } from '...' syntax as the project is in a state of flux.  I'd like to ensure the name matches from app.module.js up to the name.module.js, to promote readability (at the expense of ease)
- Module-first pattern; that is, creating a module for every bit of code and wiring it up into angular in app.module.js

Getting Started:
- Node.js needs to be installed
- nodemon needs to be installed globally by "npm install -g nodemon"
- Start the app using "npm run dev-start"
- You have to run "gulp buildAssets" first before starting the app.  Assets need to be in the folder where the server is run but don't need to be built every time.

Next Steps:
- ~~Add scss styles into gulp configuration~~
- ~~Let scss styles be stored in their component folders (requires gulp update)~~
- ~~Find default app font~~ (WIP)
- ~~Determine color scheme~~ (WIP)
- Determine signed-in navigation bar look (WIP)
- Create signed-in and signed-out navigation bar (signed-in has a profile/account dropdown; signed-out has a sign-in/sign-up button) (WIP)
- ~~Determine overall look-and-feel of page (general idea; this can change of course)~~ (WIP)
- ~~Set up DB to store lifts into~~
- ~~Make +/- butons on lifts actually update DB~~
- ~~Move the Add Lift labels into their input boxes (to be moved on focus/hover)~~
- Create an input box for Reps and show that info in the All Lifts section (and update DB, of course!)
- Create a reusable add button (attribute directive?) (since the add workouts and add lift buttons are very similar)
- ~~Add CSS to show when a button has been focused (vs. hovered)~~
- ~~Add CSS to show which page you're currently on (change nav bar)~~
- MAJOR OVERHAUL of Lifts page.  Will be changing each lift into a "card" with CSS Grids!
    - Note:  Each lift "card" can be a different color?  Connecting it to its workout (i.e. each workout can have a user-specified color)
- Create workouts page (WIP)
- Create notification after deleting a lift asking if the user if sure and giving them a chance to undo
- Allow the user to input lift variations (i.e. different weights for different sets x reps) (WIP)
- Create a new "Dashboard" and ~~create a link for Lifts~~ (as that's what the dashboard currently is)
- Move all these todos into the issues category in GitHub
- ~~Make a Lift module~~
- ~~Create a checkbox for "Straight sets" underneath the # of sets input on the add lift modal~~
- Create form validation for add lift form
- Create tool tip to describe what Straight sets are
- Update the AddLiftForm class to actually save <i>all</i> lift data that users enter now, since there's more data
- Make modals open up from the right and be full-height

To Do:
- Update gulp so that I don't need to provide the base templates URL every time for every view (ideally, move every view into the folder of each component)
- Add sourcemaps for scss?
- Convert directives to components at some point (as a learning opportunity)
- Refactor the states so that I don't have the same view but different states for home/logo and dashboard
- Move my font(s) out of google so they can work offline
- ~~Create images/SVG icons instead of using text with line-height on buttons~~
- Figure out how to pass a function into an attribute directive from a parent scope and call it in the link function without a directive controller (and specifically, how to call it without changing the parameter to it)
- ~~Make gulp serve also start nodemon (or other way around using node scripts)~~
- Maybe change all task running into node scripts?  (This will fix the issue of nodemon starting twice in development)
- Convert gulp into an ES6 format:  https://markgoodyear.com/2015/06/using-es6-with-gulp/
- Convert the button icon rotation/color changing into a single class
- Create a directive for my buttons that are very similar to each other
- ~~Clean up all the modules (reorganize so all like components can share a module... duh)~~
- Host the Google material icons locally
- Make dropdowns close on tab-out
- ~~Determine why I need to pass dropdownCtrl into a scope.$watch when init'ing a dropdownMenu directive, vs. just using the already-set this.ctrl~~ This is explained by the scope.$watch having to match up with the controllerAs syntax for the directive!!!
- Allow dropdowns to be configured on if we want to close them on click/tab out or not

Personal notes:
- Importing an item using the import { name } from '...' syntax requires you to match the name with the name of what was exported!
- Compare this to using the import name from '...' syntax, where the name can be whatever you'd like.  It's just an alias for what was exported in '...'.
- When using ES6 classes as controllers, we don't need to register them as controllers on angular (still figuring out why?)
- When importing someething that was exported default, we need to import based on what was exported!  We should only import with curly braces when we didn't export a default.  See https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement
- Importing a package uses require syntax, vs. importing a custom anything uses the import from syntax.  Why?
- An input name attribute is used for validation and the input ng-model attribute is used for binding to the controller
- A form with 'novalidate' won't be validated by HTML5; AngularJS can still do validation logic
- Node acts as basically a back-end API.  With express, it can create REST calls (GET, POST, etc) that the front-end can access.  This is fundamentally different from Spring/Struts, so don't think of it that way
- ~~When setting an ES6 class as a controller on a directive, we DO need to put its name in quotes.  Only when importing using curly brace syntax, though.  Without curly brace syntax, we can pass in without quotes~~
- ~~NOTE FROM ABOVE:  For some reason, this changes how we pass items into directive attributes.  Without curly brace syntax, I can pass attributes into directives as string literals.  With curly brace syntax, it passes in as {{ ... }}.~~

Useful Links:
- AngularJS good practices (although I don't agree with all of them): http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
- Factories vs. Services vs. Providers: https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/, http://anandmanisankar.com/posts/angularjs-provider-subsystem/, http://www.simplygoodcode.com/2015/11/the-difference-between-service-provider-and-factory-in-angularjs/
- Transclusion: http://teropa.info/blog/2015/06/09/transclusion.html
- Mongoose:  https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
- ES6 curly braces on import: https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement, https://stackoverflow.com/questions/33611812/javascript-es6-export-const-vs-export-default
- bindToController property for directives: http://www.tothenew.com/blog/using-bindtocontroller-with-controlleras-syntax-in-angular/
- ngAnnotate and ES6 classes as controllers: https://www.timroes.de/2015/07/29/using-ecmascript-6-es6-with-angularjs-1-x/
- Promises, as explained by a comic: http://andyshora.com/promises-angularjs-explained-as-cartoon.html
- The cases to use name and ng-model for form inputs: https://stackoverflow.com/questions/26217392/why-do-i-need-to-specify-both-a-name-and-ng-model-on-input-in-angularjs
- ngModelController and creating a custom directive that contains an input: https://www.nadeau.tv/using-ngmodelcontroller-with-custom-directives/