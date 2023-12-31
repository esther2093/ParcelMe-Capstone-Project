# ParcelMe Documentation 

This is the code for the application ParcelMe that connects parcel senders with travellers going the same way.

## Description 
ParcelMe is an application that connects people who want to send a parcel with other people who are going to the same destination. Users have the option to either post a trip they are making and await enquiries from people or users can enquiry on posted trips. It is a alternate way to providing courier service for people who are fed up with the current Australian courier system that has continually failed us. 

React was used as the front-end library with Javascript as it allowed me to break down the architecture of the user interface into smaller, resusable components. This made it much easier to write and read the code. Also  virtual DOM allows for more smooth server-side rendering which results in a smoother UI experience. It also has access to MUI which is interactive so requires minimal adjustments for different media screen sizes.

MySQL was used as the back-end database as it gives a more structured framework for my data. This makes it easier to see the data in tables and shows the relationships more easily between tables. It has also been used and tested over the years so is reliable and stable.

In the near future I would like to implement sendGrid to be able to send emails such as resetting password emails. 
In the long term I would like to implement a bidding system where the sender can post a parcel they want to send and user drivers can bid on the parcel and whoever bids the lowest gets the delivery. I also would like to open it up to overseas travels however this would be quite difficult due to aviation laws regarding taking packages into countries you didn't pack. 

## Instructions 
Instructions to get this application working: 

#### Local

To run this application locally: 

1. Setup MySQL databse first
```
create local instance localhost:3306 
create schema called capstoneProject
```

2. Set up code  
```
git clone https://github.com/esther2093/IOD-Capstone-Project
cd front-end 
npm install
npm run build //build front-end to use concurrently with back-end

cd .. 
cd back-end 
npm install
in server.js change line 32 and 36 as below //.. needed to access files locally
app.use(express.static(path.join(__dirname, '../front-end/dist'))) 
path.join(__dirname, "../front-end/dist/index.html")

npm run distant //will run local distant and front-end build together
open http://localhost:8000 in your browser 
```

#### Deployed through AWS 
This application has already been deployed on to AWS and can be accessed below: <br> 
AWS RDS - parcelmedatabaseaws.cyb2gf8xvhsu.ap-southeast-2.rds.amazonaws.com <br>
AWS EC2 - http://ec2-3-27-154-151.ap-southeast-2.compute.amazonaws.com <br>  

You can create your own AWS RDS and EC2 to deploy 

## Contributers 
My IOD teachers - Jo, Gareth and Chris helped to troubleshoot, fix errors and give me direction with the application

