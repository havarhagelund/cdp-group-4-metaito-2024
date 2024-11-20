## Which Dependencies are used in the project?

As with many modern web applications, even though many things have been made ground up, the project relies on a variety of dependencies to function correctly. We will go through some of them now:

#### Global State Management
For global state management two main libraries are used, Zustand and the built in React Context API.
- Zustand is used for the Splat Page component and serves to work and manage all components that need to do changes or retrieve information from the Splat. Zustand is also used for the ContentAdder, to handle which specific widget is being chosen.
- The React Context API is used for the AI Form, as it is a smaller component and does not need the full power of Zustand.

#### Styling
For styling, the project uses Tailwind CSS. Tailwind CSS is a utility-first CSS framework that is used to style the components in the project. It is used to style the whole application. We could reuse alot of styling with the inbuilt classes.

#### Testing
The project uses Jest and Cypress for testing.
- Jest is used for unit testing, and is used to test the Splat page, specifically the grid.
- Cypress is used for end-to-end testing, and is used to test the whole user flow, from the landing page to a generated Splat.

#### UI
There are two main UI libraries used, MUI and ShadCN.

#### Animations
For animations, the project uses Framer Motion. Framer Motion is a library that makes it easy to create animations in React. It is used to animate the grid and the widgets in the Splat.

#### Code Quality
For code quality, the project uses ESLint and Prettier.
- ESLint is used to enforce code quality and consistency in the project.
- Prettier is used to format the code in a consistent way.

#### OpenAI
For the AI Form, the project uses OpenAI's API. OpenAI is used to generate questions based on the answers given by the user, and to create embeddings to match with the templates of Splats in the Supabase database.

#### Supabase
Supabase is an open-source Firebase alternative that is used to store the Splats and the user data. We used the Supabase dependency to easily interact with the database.

#### Icons
We used the React Icons library and Lucide icons for the icons in the project.

#### Other
One other dependency worth mentioning was the gradient mesh used for the landing page and AI Form.
- @johnn-e/react-mesh-gradient
