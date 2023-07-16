
# Pricewatchr
Pricewatchr is a dynamic web application that tracks prices on Amazon and notifies users when their desired items drop below a specified threshold. Built with React on the frontend and Flask on the backend, pricewatchr utilizes a Python web scraping script to monitor product pages for price changes.

Users can easily create an account, build their wishlist by adding Amazon product links, and set individual price limits for each item. The React frontend provides a user-friendly Interface for managing the wishlist

Once a product's price falls below the user-defined limit, pricewatchr sends an email notification to the user, ensuring they never miss out on a great deal.
## Built with
* React
* Python
* Bootstrap

# Getting Started
## Prerequisites
* node version should be v20.4.0 and npm version must be v9.7.2

* To install latest version of npm
  ```sh
  npm install npm@latest -g
  ```
* To install python module flask
  ```sh
  pip3 install flask
  ```

## Installation
### Run Locally


1.Clone the repo
```sh
git clone git@github.com:koushikgunnam/pricetracker.git
```
2.navigate to frontend directory
```sh
cd pricetracker/track/frontend
```

3.Install dependencies via npm
```sh
npm install
```

4.Run the project Locally
```sh
npm run dev
```

5.Open the link in your browser (http://localhost:5173)

6.Open new terminal and navigate to backend directory and run app.py 
```sh
cd ../backend
python3 app.py
```
