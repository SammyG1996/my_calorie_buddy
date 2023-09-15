# My Calorie Buddy Application

Link to nutrition API: https://api-ninjas.com/api/nutrition

Link to backend API that handles the database: https://github.com/SammyG1996/my_calorie_buddy_NodeJS

## Exciting Updates 📲

Hey everyone, I'm thrilled to share some exciting updates about the ongoing transformation of "My Calorie Buddy's" backend architecture, and I'd absolutely love to hear your thoughts and suggestions!

Currently, I'm using PostgreSQL, which has served me well, but it also means I'm locked into the table-based storage paradigm. I've got a 'user' table holding all my user data, and a 'foodEntry' table housing every food entry from every user. While it's functional, the one-to-many relationship between a user and their food entries has its limitations. Whenever I need to retrieve a user's food data, it involves running a query matching usernames, and as my database scales, this operation inevitably becomes more time-consuming with an O(n) complexity.

Not only does this approach impact performance, but it also leaves my data relatively inflexible. So, here's the exciting part: I'm embarking on a migration journey to MongoDB! This transition not only completes my transition to a full MERN stack application but also promises a significant boost in performance.

Here's a sneak peek at the structure I have in mind: I'll have a "User" collection that houses all my individual users. Within each document, you'll discover all the pertinent user information neatly organized. Plus, I'm keeping things tidy by utilizing objects throughout the document for any elements that can be deleted. This design shift ensures that Creating, Reading, Updating, and Deleting operations will be lightning-fast at O(1).

##


## My Calorie Buddy is a calorie counting application that was created to showcase my ability as a full-stack engineer. 
It is a React JS front end that connects to a Node JS backend. 

They application connects to the nutrition API by ninja. This API allows for natural language in the search bar. 
Therefore you can type "1 cup of rice" and get the exact nutrition. 

Here were the technologies used in the front end: 
-	React
-	Tailwind
-	React Router 
-	Axios
-	Jest

In the back end here where the technologies used: 
-	Node JS
-	Express JS
-	Bcrypt 
-	PostgreSQL Database 
-	Jest

Please feel free to look at the working application here: https://my-calorie-buddy.vercel.app/

To download the application make sure to install all dependencies using NPM install. 
