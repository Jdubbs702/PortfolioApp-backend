Hi, I'm Jeremy. I'm glad you've made it this far.

If you have not experienced the live site, the URL is:
https://portfolioapp-c45d1.web.app

In this repo, you will find the files for both the front end and backend of this simple REACT app.

Some of the libraries I'm using are react-tsparticles, react-simple-animate, react-icons, and react-vertical-timeline-component.

With consideration for UI/UX, I've made the app responsive to various screen sizes. On the portfolio page, I worked on eliminating CSS bugs due to the lack of hovering in mobile devices. I've implemented a solution that produces a similar effect when the cards come into the viewport.

Each "page" uses common components, including the navbar, a header, an error handling modal and loading spinner.

The Home page can route to my linkedIn or Github, download my resume, or route to my contact page.

The Contact page calls my API for handling emails, which generates a notification email sent to me, and a confirmation email sent to the user.

The Portfolio page calls my API for handling project data which is stored via MongoDb.
It then maps through an array of projects and uses a cloudinary link for the images.
I've use this approach so that I am able to add a new project to the DB without needing to write any additional code.
