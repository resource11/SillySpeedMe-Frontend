# SillySpeed Me!

This is my first foray into creating a **building your first real [back-end](https://mighty-lowlands-8515.herokuapp.com) app, with a [front-end]( http://resource11.github.io/ssme_frontend) to match,** integrating 4 Restful APIs.

## OVERVIEW

SillySpeed Me! is an app designed to allow the user to list a bike for sale and favorite a bike they'd like to buy. The target audience is those who love to race cyclocross, particularly on a singlespeed (aka, a SillySpeed) bike!

## HIGH-LEVEL PROJECT GOALS
- **Build a single-page application (SPA)** with **basic user authentication** that interacts with a **custom API built by me**
- Build an app that can **create, read, update, and delete data** in a SQL database
- **Create detailed user stories and wireframes** (before writing code) as part of my app planning process.
- **Confidently presenting my finished app** to a technical audience (5-10 minute presentation)

---

## PROJECT DELIVERABLES

- A **working full-stack application**, hosted somewhere on the internet.
- Two **Github repos** (this one for my front-end and one for my [back-end](https://github.com/resource11/project2-api)). 
- An **explanation** of the what the app does and how it works, the approach taken in building it, and any unsolved problems that you hit.
  - **User stories** written for your app.
  - At least one **wireframe** (or a link to one) that you've created to plan out your app.
  - A **link** to the live application.

#### Technical Requirements

* Have an **API** that is securely accessible by the browser app, built using frameworks covered in class.
* Create **at least 4 RESTful routes** for handling GET, POST, PUT/PATCH, and DELETE requests.
* **Utilize an ORM** to create a database table structure and interact with data.
* **Use a front-end Javascript app** to communicate with the API (both read and write) and render data that it receives in the browser.
* Have **semantically clean HTML and CSS**
* Be **deployed online**, so that it is accessible to the public

##### Stretch Goals.
* Put some extra thought and effort into visual and UI design.
* Integrate photo upload
* Integrate some jQuery and CSS animations

##User stories
* The users in this scenario are individuals seeing to list a singlespeed bike for sale and favorite other bikes listed for sale.
The features of this app will address the following user stories.
* As a user, I can register an account.
* As a user, I can log in.
* As a user, I can browse listings
* As a user, I can list a bike for sale
* As a user, I can favorite/unfavorite a bike


##Wireframe
* The initial wireframe mockup of a potential site design is located [here.](https://www.dropbox.com/s/xi5r1fu76du7bjr/ssme_wireframes.pdf?dl=0)

##App approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional app prototype
* After sketching a [wireframe](https://www.dropbox.com/s/xi5r1fu76du7bjr/ssme_wireframes.pdf?dl=0) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling. Then I worked through the [user journey and app logic](https://www.dropbox.com/s/lsjt6hj2m70r4mh/ssme_User_Journey.png?dl=0) to solve the problem of creating, reading, updating, and deleting data.
* I also created a Rails backend, and structure my [ERD models](https://www.dropbox.com/s/sy0v0j76ejnk1xl/ssme_ERD_Models.png?dl=0) and associations, leveraging Ruby, SQL and ActiveRecord.
* After completing many data validation tests on the back end, I integrated the back-end to the front-end for functionality tests.

##Challenges
* My first challenge was figuring out the [data models], and how the data would relate to each other in the most logical manner with a goal of keeping my controllers skinny.
* My second challenge was creating a [user journey map](https://www.dropbox.com/s/lsjt6hj2m70r4mh/ssme_User_Journey.png?dl=0) and [wireframes](https://www.dropbox.com/s/xi5r1fu76du7bjr/ssme_wireframes.pdf?dl=0) that accurately achieved the goals of my user stories, while setting up a workflow process. I heavily leveraged Trello to keep track of items to do, in development and completed.
* My third challenge was structuring my code in a way that could more easily integrate the ajax requests/response while paying attention to separation of concerns.
* My fourth challenge was figuring out how the API sent data to, and received data from the backend back to the client side.
* My fifth challenge was trying to use the process I sussed out with respect to the steps needed to request and receive specific information from the API and actually *integrate* that into my app.
* My sixth challenge was gathering the data from the back end successfully and structuring my controllers and serializers to achieve this goal.
* As of yet, I have not been successful in dynamically updating the content state of the viewport when a user favorites, unfavorites, or deletes a bike without refreshing the browser. I need to work on some more jQuery event handlers to make that functionality happen.

##Final Thoughts
* In general, I think this is a great second project for showing how we can leverage our knowledge to creat full-stack applications! Ready for more...

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other visual assets copyright
resource11, all rights reserved.
