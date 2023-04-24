# Your Application Name

This is a Node.js application that does something cool.

## Installation

To install the application, first clone the repository:
```
git clone https://github.com/yourusername/your-repo.git
```

Then, install the dependencies using 
```bash
npm install
```



## Configuration

Before running the application, you will need to configure the environment variables. Create a `.env` file in the root directory of the application, and add the following variables:
```
NODE_ENV=development
DATABASE_URL=mysql://username:password@serveraddress:port/database
```

The `NODE_ENV` variable specifies the environment mode of the application, and the `DATABASE_URL` variable specifies the connection URL of the MySQL database. Modify the values according to your environment configuration.

## Usage

To start the application, run the following command:


This will start the application in development mode. You can access the application at `http://localhost:3000`.

## Example Data

Here's an example of the data that the application expects:

```json
const data = {
formdata: {
name: 'John Doe',
country: 'United States'
// add more fields here as needed
},
date: '2023-04-24',
sessionId: '1234567890'
};
```


You can use this data to test the application or as a reference for creating your own data.
then you can modify the base url in file ```public/script.js``` to match wherever the api is running and it will be all set , you can start filling the form . 

