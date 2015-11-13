# SillySpeed Me!

### Overview

This is my first foray into creating a **building your first real back-end app, with a front-end to match,** integrating 4 Restful APIs.


## OVERVIEW

My high-level project goals:
- **Build a single-page application (SPA)** with **basic user authentication** that interacts with a **custom API built by me**
- Build an app that can **create, read, update, and delete data** in a SQL database
- **Create detailed user stories and wireframes** (before writing code) as part of my app planning process.
- **Confidently presenting my finished app** to a technical audience (5-10 minute presentation)

---

## DELIVERABLES

When you present your project, you must hand in the following things

- A **working full-stack application, built by you**, hosted somewhere on the internet (see Technical Requirements, below)
- Two **Github repos** (one for your front-end and one for your back-end), with frequent commits dating back to the very beginning of the project. Each repo will need a **README.md file** with a link to the other repo. Your front-end repo's README should also have
  - An **explanation** of the what the app does and how it works, the approach taken in building it, and any unsolved problems that you hit.
  - **User stories** written for your app.
  - At least one **wireframe** (or a link to one) that you've created to plan out your app.
  - A **link** to the live application.

#### Technical Requirements

In order to get a satisfactory score, your app must:

* Have an **API** that is securely accessible by your browser app, built using frameworks covered in class.
* Create **at least 4 RESTful routes** for handling GET, POST, PUT/PATCH, and DELETE requests.
* **Utilize an ORM** to create a database table structure and interact with data.
* **Use a front-end Javascript app** to communicate with your API (both read and write) and render data that it receives in the browser.
* Have **semantically clean HTML and CSS**
* Be **deployed online**, so that it is accessible to the public

##### Stretch Goals

Once (and only once) you've satisfied the core requirements, here are some additional goals that you can shoot for:
* Incorporate Bootstrap, Handlebars, or some other front-end tool.
* Interact with third-party APIs and integrate them into your app.
* Put some extra thought and effort into visual and UI design.

##User stories
* The users in this scenario are individuals seeing to list a singlespeed bike for sale and favorite other bikes listed for sale.
The features of this app will address the following user stories.
* As a user, I can register an account.
* As a user, I can log in.
* As a user, I can browse listings
* As a user, I can list a bike for sale
* As a user, I can favorite/unfavorite a bike


##Wireframe
* The initial wireframe mockup of a potential site design is located [here.](http://i.imgur.com/QiL8V6o.jpg)

##App approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional app prototype
* After sketching a [wireframe](http://i.imgur.com/QiL8V6o.jpg) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling. Then I worked through the [user journey and app logic](http://i.imgur.com/5ErZUba.jpg) to solve the problem of creating, reading, updating, and deleting data.
* I also created a Rails backend, and structure my models, and associations, levering Ruby, SQL and ActiveRecord.
* After completing many data validation tests on the back end, I integrated the back-end to the front-end for functionality tests.

##Challenges
* My first challenge was figuring out the [data models], and how the data would relate to each other in the most logical manner with a goal of keeping my controllers skinny.
* My second challenge was creating a [user journey map] and [wireframes] that accurately achieved the goals of my user stories, while setting up a workflow process. I heavily leveraged Trello to keep track of items to do, in development and completed.
* My third challenge was structuring my code in a way that could more easily integrate the ajax requests/response while paying attention to separation of concerns.
* My fourth challenge was figuring out how the API sent data to, and received data from the backend back to the client side.
* My fifth challenge was trying to use the process I sussed out with respect to the steps needed to request and receive specific information from the API and actually *integrate* that into my app. [This is the process](https://www.dropbox.com/s/w05iarrdua5nkeu/Connecting-API-process-flow.pdf?dl=0).
* My sixth challenge was gathering the data from the back end successfully and structuring my controllers and serializers to achieve this goal.
* As of yet, I have not been successful in dynamically updating the content state of the viewport when a user favorites, unfavorites, or deletes a bike without refreshing the browser. I need to work on some more jQuery event handlers to make that functionality happen.

##Final Thoughts
* In general, I think this is a great second project for showing how we can leverage our knowledge to creat full-stack applications! Ready for more...

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other assets copyright
resource11, all rights reserved.
