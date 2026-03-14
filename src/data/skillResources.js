export const skillResources = {
  "HTML": {
    youtube: "https://www.youtube.com/watch?v=kUMe1FH4CGY",
    website: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    description: "Learn HTML structure, tags, forms, and semantic elements."
  },
  "CSS": {
    youtube: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
    website: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    description: "Understand CSS styling, Flexbox, Grid, and responsive design."
  },
  "JavaScript": {
    youtube: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    website: "https://javascript.info/",
    description: "Master JavaScript basics, ES6 features, DOM manipulation, and logic."
  },
  "React": {
    youtube: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    website: "https://react.dev/learn",
    description: "Learn React basics, components, props, state, and build one mini project."
  },
  "Git": {
    youtube: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    website: "https://git-scm.com/doc",
    description: "Learn version control basics like commit, push, pull, and branching."
  },
  "Responsive Design": {
    youtube: "https://www.youtube.com/watch?v=srvUrASNj0s",
    website: "https://www.freecodecamp.org/learn/responsive-web-design/",
    description: "Learn to build websites that look good on all screen sizes."
  },
  "Node.js": {
    youtube: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
    website: "https://nodejs.org/en/learn",
    description: "Learn asynchronous programming, file system interactions, and basic backend concepts."
  },
  "Express": {
    youtube: "https://www.youtube.com/watch?v=SccSCuHhOw0",
    website: "https://expressjs.com/",
    description: "Build efficient web servers and RESTful APIs using Express.js."
  },
  "Database Management": {
    youtube: "https://www.youtube.com/watch?v=HXV3zeJZ1EQ",
    website: "https://www.khanacademy.org/computing/computer-programming/sql",
    description: "Learn how to store, manage, and query data efficiently."
  },
  "API Design": {
    youtube: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
    website: "https://restfulapi.net/",
    description: "Understand REST principles, HTTP methods, and status codes."
  },
  "Python": {
    youtube: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    website: "https://docs.python.org/3/tutorial/index.html",
    description: "Learn Python syntax, data structures, and basic scripting."
  },
  "SQL": {
    youtube: "https://www.youtube.com/watch?v=HXV3zeJZ1EQ",
    website: "https://www.w3schools.com/sql/",
    description: "Learn how to write SQL queries to extract and modify database information."
  },
  "Data Visualization": {
    youtube: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
    website: "https://matplotlib.org/",
    description: "Learn to represent data visually using charts and graphs."
  },
  "Excel": {
    youtube: "https://www.youtube.com/watch?v=Vl0H-qTclOg",
    website: "https://support.microsoft.com/en-us/excel",
    description: "Master spreadsheet functions, pivot tables, and data analysis in Excel."
  },
  "Statistics": {
    youtube: "https://www.youtube.com/watch?v=xxpc-HPKN28",
    website: "https://www.khanacademy.org/math/statistics-probability",
    description: "Learn foundational statistical concepts for data analysis."
  },
  "Pandas": {
    youtube: "https://www.youtube.com/watch?v=vmEHCJofslg",
    website: "https://pandas.pydata.org/docs/user_guide/index.html",
    description: "Learn data manipulation and analysis using the Pandas library in Python."
  },
  "Figma": {
    youtube: "https://www.youtube.com/watch?v=jk1T0CdLxwU",
    website: "https://help.figma.com/hc/en-us",
    description: "Learn interface design, wireframing, and interactive prototyping in Figma."
  },
  "Wireframing": {
    youtube: "https://www.youtube.com/watch?v=e2JRCwgHQWE",
    website: "https://www.interaction-design.org/literature/topics/wireframing",
    description: "Learn to create structural blueprints for web pages and apps."
  },
  "Prototyping": {
    youtube: "https://www.youtube.com/watch?v=zJXZDUSLpLw",
    website: "https://www.nngroup.com/articles/ux-prototypes/",
    description: "Learn to build interactive mockups to test user flows."
  },
  "User Research": {
    youtube: "https://www.youtube.com/watch?v=0hUXMA4vEuk",
    website: "https://www.nngroup.com/articles/which-ux-research-methods/",
    description: "Learn how to gather insights about user needs and behaviors."
  },
  "Color Theory": {
    youtube: "https://www.youtube.com/watch?v=_2LlSqsOtiE",
    website: "https://www.canva.com/colors/color-wheel/",
    description: "Understand how to combine colors effectively for UI design."
  },
  "Accessibility": {
    youtube: "https://www.youtube.com/watch?v=20SHvU2PKsM",
    website: "https://www.a11yproject.com/",
    description: "Learn to design and build inclusive experiences for all users."
  }
};

export const getFallbackResource = (skill) => ({
  youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + ' tutorial beginner')}`,
  website: `https://www.google.com/search?q=${encodeURIComponent(skill + ' beginner tutorial or official documentation')}`,
  description: `Learn the basics of ${skill} using beginner-friendly tutorials or official documentation.`
});
