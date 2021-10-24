# Milestone 3 

## About
-   React component added to milestone 2 with a flask backend


### Purpose:
    - Make a website that desplays top songs from your favorite artists for individual user accounts that allows you to save artists to your account as well as remove them

### Tech Stack:
    - Python
        - flask for web framework
        - requests for api calls
        - SQLALCHEMY for postgres db
    - HTML & CSS
    - Heroku for deployment environment 

    - JavaScript
        - React for reactive components

### What it does:
1. My project takes a list of artist ids from the PostgreSQL database on each user account from Spotify, makes 2 requests to the Spotify API:
    1. A call to the artist endpoint:
        - This gets the artist name as well as the artist picture
    2. A call to their top songs endpoint:
        - This gets the top song names, album art  and song preview
2. Then it makes a call to the genius api, passes the song name and the artist name and gets the link to the lyrics page.

3. Lastly, my app takes all this data and passes it to the react front end where it loops through all the artists, their songs, ect..., randomly chooses one to display and adds a section for adding and removing artists

Live demo located at `https://milestone3-rmiller87.herokuapp.com`

### Questions

1. What are at least 3 technical issues you encountered with your project? How did you fix them? 
    - First being deploying the CI into the project, my solution for it was reading the documentation
    
    - The second was making tests for mocking the database, I didnt remember that well back to the lecture on how to do it, my solution was to google some examples and look into how others did it.

    - Making sure my react styling after moving it to a react component was up to par and was consistant with what it should be

2. What part of the stack do you feel most comfortable with? What part are you least comfortable with?
    
    - I felt most comfortable with the python part of the stack, it is my native language I code in and it is easy for me to do it on the fly
    
    - I felt least comfortable with the react components of the stack, while I still know these fairly well, it was just a little tougher to work through

# Imports

For Python api requesting:
```
requests - for api requests
os - for .env variables
dotenv - for env variables
```

For python website:
```
flask - for web
flask-login - for login functionality
```

To import use `pip install <package>`


# How to run

1. clone down the project from github
    - `git clone https://www.github.com/csc4350-f21/milestone3-rmiller87`

2. install all packages in [Imports](#imports)

3. create a .env file where you will store your environment variables
    ```
    Needed environment Variables:

    FROM SPOTIFY:

    CLIENT_ID=''
    CLIENT_SECRET = ''

    FROM GENIUS:

    GENIUS_ACCESS_TOKEN=''

    DATABASE_URL=''

    SECRET_KEY=''

    ```

4. run `npm i` to install all the react dependencies

5. run `npm start build` to build the components necessary to running this as a flask deployed client

6. open and run app.py `python3 app.py`
