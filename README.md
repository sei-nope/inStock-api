# inStock
 ## **Intro**

**Front End Repository**: (https://github.com/sei-nope/inStock-client)
**Back End Repository**: (https://github.com/sei-nope/inStock-api)
**Front End Deployed Site**: (https://sei-nope.github.io/inStock-client/)
**Back End Deployed Site**: (https://stark-reaches-40888.herokuapp.com/)

## **Set Up**

**Dependencies**
- `npm install`
- `npm isntall grunt`
- `npm run s` to launch the local server for testing

**Templates**
- [Browser Template] (https://git.generalassemb.ly/ga-wdi-boston/browser-template)
- [API Template] (https://git.generalassemb.ly/ga-wdi-boston/express-api-template)
- [Login Template] (https://codepen.io/suez/pen/RpNXOR?editors=1000)

**ERD**
[Link] (https://media.git.generalassemb.ly/user/25287/files/6d5b0e80-637c-11ea-91d7-fe4dfb8503b0)

**Wireframe**
[Link] (https://media.git.generalassemb.ly/user/25287/files/74821c80-637c-11ea-8094-d7aeba4851eb)

**User Stories**
-As an unregistered user, I would like to sign up with email and password. 
-As a registered user, I would like to sign in with email and password.
-As a signed in user, I would like to change password.
-As a signed in user, I would like to sign out.
-As a signed in user, I would like to create an inventory item.
-As a signed in user, I would like to update my inventory items.
-As a signed in user, I would like to delete my inventory items.
-As a signed in user, I would like to see all items.
-As a signed in user, I would like to see the quantity and price of each item.
-As a signed in user, I want to be able to update or create inventory without having to know what my current inventory levels are.
--If the product exists in the inventory, the app should make a PATCH request to update the existing item. If I don't have enough product (when reducing product counts) the app should not allow the update.
--If the product does not exists in the inventory, the app should make a POST request to create the new item.

## **Process*

**Technologies Used**
- HTML5
- CSS3
- JavaScript
- Express.js
- Handlebars
- Bootstrap
- MongoDB
- Heroku
- Github
- Atom text editor


**Day 1**
- On the first day of the project, the team sat down and had a planning meeting. Hua and JJ were tasked with setting up the API template while Yuna and Erika were responsible for setting up the browser template. This process took until lunch, at which point the teams switched. Hua and JJ worked on setting up the HTTP requests on the browser side while Yuna and Erika began working on the custom functionality in the API. This process lasted until the end of the day

**Day 2**
- On the second day of project week, the team got together for the morning scrum meeting and we went over the progress we made. The final thing that needed to be implemented was the custom functionality. The team used mob programming to solve the issue and after that began working on bug fixes. The process for this was fairly straightforward. The team launched the development app and began testing it. If there was a bug, it was written on the whiteboard. After a series of tests and bug finding, each of the team members took the reigns on different bug fixes and got to work. After all of the issues the team had found were closed, they repeated this process until no further bugs were found. This style of work continued throughout the day into the following morning.

**Day 3**
- On the third day of the project, the team came together to discuss what needed to be finished. There were a few final bugs to work out and styling to be done. After the bugs were worked out, each member of the team took to a different task. Hua set up implementation for QR codes, JJ found and set up a login template, Yuna rearranged the data that is returned after an inventory is showed into a chart, and Erika set up in line editing instead of using a modal.

## **Routes**
- **User Routes**
  - Sign-Up: POST
  - Sign-In: POST
  - Change Password: PATCH
  - Sign-Out: DELETE

- **Inventory Routes**
  - Add Inventory: POST
  - Show Inventory: GET
  - Edit Inventory: PATCH
  - Remove Inventory: DELETE