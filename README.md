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
- Create navigation bar

To Do:
- Update gulp so that I don't need to provide the base templates URL every time for every view (ideally, move every view into the folder of each component)
- Add sourcemaps for scss?

Personal notes:
- Importing an item using the import { name } from '...' syntax requires you to match the name with the name of what was exported!
- Compare this to using the import name from '...' syntax, where the name can be whatever you'd like.  It's just an alias for what was exported in '...'.