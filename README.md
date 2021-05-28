# travel-mapbox-react-mongodb-docker

Dockerized Travel Mapping Application using ReactMapGL, Mapbox, NodeJS and MongoDB

## Steps to run the application

1. Configure .env files according to your system setup in ```/client/.env.example``` and ```/server/.env.example```
2. Rename both the files back to .env
3. Navigate to ```/server``` directory and install the dependencies using ```npm i```
4. Start the server using ```npm run dev```
5. Once the server is up and running we can move onto starting the client application.
6. Navigate to the ```/client``` directory and install the dependencies using ```npm i -f``` (-f because package.json has been messed up because of fsevents for some reason)
7. Start the client using ```npm run start```

## Stuff to resolve:

1. Disable panel button once button is clicked and location is reached.
2. Minor authentication fixes.

## Some Screenshots:

<p align="center"><img src="https://imgur.com/b7MpTAc.gif" width="70%"></p>

<p align="center"><img src="https://imgur.com/PkvSIHp.gif" width="70%"></p>

<p align="center"><img src="https://imgur.com/EluMKMi.png" width="20%"></p>

## Steps to configure Pipeline:

1. Sign up at https://g.codefresh.io/
2. Configure your Git and Registry by going into ```/account-admin/account-conf/integration```
3. Create a new Project and add a new pipeline.
4. Use the codefresh.yml in the root of the repository.
5. Replace the repository name and registery name respectively.
6. Once configuration is done, run the piepline.
7. If everything goes right, all the stages would complete successfully and you'll get a successful output.

<p align="center"><img src="https://imgur.com/qsYgU3C.png" width="70%"></p>

## Note: 

docker-compose.yml is also included if you want to setup a local docker environment. Just build both the docker images using docker build and run the docker-compose command.
