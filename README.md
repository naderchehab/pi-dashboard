# Raspberry Pi Dashboard

Node + React based home automation dashboard to manage my Raspberry Pi.

## Features
- D3 charts that show variation of temperature and humidity at home.
- Toggles for switching devices on/off (lights, webcam, AC, computer etc...)
- Responsive UI
- Login screen and secure endpoints. HTTPS is recommended.

## Hardware
I am using the following hardware components:
- Raspberry Pi 3. All components are connected to it + it acts as the web server.
- DHT22/AM2302 Digital Temperature and Humidity Sensor
- Etekcity Wireless Remote Control Electrical Outlet Switch
- SMAKN® 433Mhz RF Transmitter and Receiver to control the Etekcity outlet
- Logitech - HD Webcam C310. Acts as a home surveillance cam.
- HC-SR501 Infrared PIR Motion Sensor. When motion is detected, the webcam starts recording.

That said, this dashboard can easily be adapted to suit your needs.

## Installation

To install server-side node modules:
```
npm install
```
To install client-side node modules:
```
cd ./client
npm install
```

To install the MongoDB database server:
```
sudo apt-get install mongodb-server
```


## Running the website
#### Server
To start the server on port 8080 (default):
```
npm start
```

#### Webpack
This project uses webpack to generate the client side bundles (js + css). Run the "watch" script to automatically regenerate the bundles when changes are detected:
```
cd ./client
npm run watch
```

#### Database
MongoDB is used to persist the state of the various sensors and devices (e.g. temperature sensor, power outlet status etc.)
```
mongod
```
