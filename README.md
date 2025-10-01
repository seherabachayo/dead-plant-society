# Dead Plant Society

## Live Demo 
https://dead-plant-society.onrender.com 

## Overview
Dead Plant Society allows you to mourn your dead plants — together!

This community-driven platform gives users a space to share and reflect on the lives (and deaths) of the plants they’ve cared for. You can create posts about your plant’s journey, comment on others’ experiences, explore common causes of death, and keep detailed logs through exclusive plant diaries — all with a slightly comedic twist to soften the tragedy.

## Features

 ### 1. Post and Comment
In a manner similar to an online plant forum, users can upload pictures and write detailed captions in a post to share stories of their beloved (or currently deceased) plants. Other users can react and leave comments, fostering connection, humor, and support. 
### 2. Log Plant Info on Plant Diaries 
To keep track of their plants and monitor their well-being (or slow, inevitable decline), users can log updates in plant diaries. These entries are visible to others and can be filtered by plant type, category, or symptom—making it easy to spot patterns, empathize with fellow plant owners, or just admire the effort.
### 3. Customizable profiles for each user 
Every user receives a unique profile, initially set with a randomized plant-themed avatar. Upon logging in, users can customize their username and profile picture. They can also view all the posts they've authored, making it easy to track their plant tributes. 


## To run project
1) **<u>git clone https://github.com/Dead-Plant-Society/dead-plant-society.git**<u>
     - OR,
     **<u>tar -xzf dead-plant-society.tar.gz**<u>
       - if you are unpacking the source code from a tarball 
2) **<u>cd dead-plant-society**<u>
3) **<u>npm install**<u>
4) **<u>cd client**<u>
5) **<u>npm install**<u>
6) **<u>cd ..**<u>
      - to run this program in the directory of dead-plant-society 
7) **<u>npm run start**<u>

     FYI: make sure this starts 2 servers if it doesn't, stop all your servers and run
       1. "npm run dev" .../dead-plant-society
       2.  "npm run dev" in .../dead-plant-society/client
   
8) Go to: http://localhost:5173/ 
   
## Frontend/Client
[Wireframe with Figma](https://www.figma.com/proto/CmIghaJqtwueHUzS7WTfpB/dead-plant-society-wireframe?node-id=14-359&t=kMpSE8qtOruoIAtG-1)

## Backend/server
Backend uses Mongoose to connect to MongoDB and dynamically store data on this web based database.


