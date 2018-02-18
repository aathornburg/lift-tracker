# AngularJS Sandbox
Just a sandbox for messing around with AngularJS

The way this app is built (all of this could change later.  Just taking steps to learn different ways of doing things):
- ES6 classes as controllers
- ES6 import/export notation vs NodeJS require() notation
- import { name } from '...' syntax as the project is in a state of flux.  I'd like to ensure the name matches from app.module.js up to the name.module.js, to promote readability (at the expense of ease)
- Module-first pattern; that is, creating a module for every bit of code and wiring it up into angular in app.module.js

Next Steps:
- ~~Add scss styles into gulp configuration~~
- ~~Let scss styles be stored in their component folders (requires gulp update)~~
- Find default app font
- Determine color scheme
- Determine signed-in navigation bar look
- Create signed-in and signed-out navigation bar (signed-in has a profile/account dropdown; signed-out has a sign-in/sign-up button)
- Determine overall look-and-feel of page (general idea; this can change of course)

To Do:
- Update gulp so that I don't need to provide the base templates URL every time for every view (ideally, move every view into the folder of each component)
- Add sourcemaps for scss?
- Convert directives to components at some point (as a learning opportunity)
- Refactor the states so that I don't have the same view but different states for home/logo and dashboard
- Move my font(s) out of google so they can work offline

Personal notes:
- Importing an item using the import { name } from '...' syntax requires you to match the name with the name of what was exported!
- Compare this to using the import name from '...' syntax, where the name can be whatever you'd like.  It's just an alias for what was exported in '...'.
- When using ES6 classes as controllers, we don't need to register them as controllers on angular (still figuring out why?)
- When importing someething that was exported default, we need to import based on what was exported!  We should only import with curly braces when we didn't export a default.  See https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement
- Importing a package uses require syntax, vs. importing a custom anything uses the import from syntax.  Why?
- An input name attribute is used for validation and the input ng-model attribute is used for binding to the controller
- A form with 'novalidate' won't be validated by HTML5; AngularJS can still do validation logic
- ~~When setting an ES6 class as a controller on a directive, we DO need to put its name in quotes.  Only when importing using curly brace syntax, though.  Without curly brace syntax, we can pass in without quotes~~
- ~~NOTE FROM ABOVE:  For some reason, this changes how we pass items into directive attributes.  Without curly brace syntax, I can pass attributes into directives as string literals.  With curly brace syntax, it passes in as {{ ... }}.~~

Useful Links:
- Factories vs. Services vs. Providers: https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
- Transclusion: http://teropa.info/blog/2015/06/09/transclusion.html
- ES6 curly braces on import: https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement, https://stackoverflow.com/questions/33611812/javascript-es6-export-const-vs-export-default
- bindToController property for directives: http://www.tothenew.com/blog/using-bindtocontroller-with-controlleras-syntax-in-angular/
- ngAnnotate and ES6 classes as controllers: https://www.timroes.de/2015/07/29/using-ecmascript-6-es6-with-angularjs-1-x/
- Promises, as explained by a comic: http://andyshora.com/promises-angularjs-explained-as-cartoon.html
- The cases to use name and ng-model for form inputs: https://stackoverflow.com/questions/26217392/why-do-i-need-to-specify-both-a-name-and-ng-model-on-input-in-angularjs