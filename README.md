This is a [Next.js](https://nextjs.org) project that has a sample screen details for Z2Data.

[Clickhere](https://codesandbox.io/p/github/NiteshSoma/z2data-ui/draft/jolly-panka) to preview the application in codesandbox.

## Features implemented
- A global layout that can resued in every component.
- Common components like button, breadcumb can be resued by just passing necessary props along with and in any given components.
- Menu that is responsive for all the screens and can be updated by adding necessary items to the given array and be passed for routing with necessary styles.
- A screen for '404' that will not just give user an error, but a sweet message that can make the user hangon for more to come.
- A sample dashboard page which given some details in folders with information regarding the electronics, supply, etc.
- A JSON server that runs simultaneously along side the front server to provide data for the screens. This server can be used for CRUD using our port in which the server is running. (Used only GET as of now).
- Utility functions that can be used accross the components.

## Improvements
  - Can implement other feature like Create, Delete and Update data using JSON server.
  - Imlementation of redux for state management will be a better uproach. As of now using just inbuilt state which is managable.
  - Having global implementation of styles by exporting generic styles like fontSize, fontColor, etc in global and importing where ever needed.

## Local setup
  - git clone https://github.com/NiteshSoma/z2data-ui.git
  - cd z2data-ui
  - run 'yarn install' inorder to install dependencies from package.json
  - run 'yarn dev' which will run both frontend server and JSON server for data access from db.json file.
