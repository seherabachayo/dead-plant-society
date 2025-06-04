# Project Overview
Dead Plant Society allows you to mourn your dead plants with friends! You can make posts, diaries, check out the causes of deaths of plants, comment on other's posts, and more.

## To run project
1) clone this repo
2) cd into ../dead-plant-society in the cloned repo and run these commands:
   ->npm install
   ->npm install @rollup/rollup-linux-x64-gnu --save-dev
3) and in ../dead-plant-society/client
   ->npm rebuild esbuild 
5) "npm run start" in the directory .../dead-plant-society
6) Go to: http://localhost:5173/
   
## Frontend/Client
[Wireframe with Figma](https://www.figma.com/proto/CmIghaJqtwueHUzS7WTfpB/dead-plant-society-wireframe?node-id=14-359&t=kMpSE8qtOruoIAtG-1)

## Backend/server
Backend uses Mongoose to connect to MongoDB and dynamically store data on this web based database.


