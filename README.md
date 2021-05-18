# travel-mapbox-react-mongodb-docker

Dockerized Travel Mapping Application using ReactMapGL, Mapbox, NodeJS and MongoDB

Steps to run the application

1. Configure .env files according to your system setup in ```/client/.env.example``` and ```/server/.env.example```
2. Rename both the files back to .env
3. Navigate to ```/server``` directory and install the dependencies using ```npm i```
4. Start the server using ```npm run dev```
5. Once the server is up and running we can move onto starting the client application.
6. Navigate to the ```/client``` directory and install the dependencies using ```npm i -f``` (-f because package.json has been messed up because of fsevents for some reason)
7. Start the client using ```npm run start```

Stuff to resolve:

1. Disable panel button once button is clicked and location is reached.
2. Minor authentication fixes.

Some Screenshots:

<p align="center"><img src="https://imgur.com/b7MpTAc.gif" width="70%"></p>

<p align="center"><img src="https://imgur.com/PkvSIHp.gif" width="70%"></p>

<p align="center"><img src="https://imgur.com/EluMKMi.png" width="20%"></p>
