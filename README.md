### Overview - Sample App for Fides Interview

Simple react app to showcase my react/frontend skills.

Simple app for managing a list of tasks with basic CRUD functionality. Optimistic updates so state will update before the server responds with a success message.

In particular here are some react features I've used. Not really needed but I wanted to show that I have an advanced understanding of React.
- useReducer
- useContext / Provider Pattern
- useEffect
- Custom hooks
- Automated testing with React testing framework

Total project time was about 6-8 hours and I prioritized React and JS over CSS and UX/UI design. Obviously there are many things which could be better but I didn't want to spend more time on this than 8 hours. If I had more time I'd add more animation to the CSS for things like deleting tasks, marking them read etc. More tests with jest and selenium. Also, I'd make a more mobile responsive design

I used Material-UI CSS framework https://www.muicss.com/

One error I would like the point out is that the "Mark all complete" and "Delete all" API calls will not function correctly because I'm just looping PUT calls which causes 429s


### Mock API
https://mockapi.io/projects/62fd5d88b9e38585cd50fe30


### How to run the project:
npm run start

