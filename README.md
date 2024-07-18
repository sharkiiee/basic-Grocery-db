# Online Grocery Store

## DATABASE

**TABLES**

- `Admin Table`
  Description :- Admin table contains username and password for the admin.
- `User Table`
  Description :- User table contains data about ownerName, shopNo,
  Inputs :- 1. username 2. password

- `Product Table`
  Description :- Product table contain the data products.
  Inputs :- 1. Product Name 2. Price.

**ROUTES**

## Admin Routes

- `Admin /signup`
  Description :- Contain data about Admins .
  Inputs :- username and password.
  Output :- Admin account is been created
- `Admin /signin`
  Description :- Save data about Admin
  Inputs :- username and password
  Output :- signin completed
- `Admin /showProducts`
  Description :- Show all the products of the store.
- `Admin /product`
  Description :- Add new product in the store

#### User Routes

- `User /signup`
  Description :- Contain data about user .
  Inputs :- username and password.
  Output :- Grocery user account is been created

  //Contraints to be follow

  1. No same username
  2. password should have 8 charac
  3. phone no should have 10 values

- `User /signin`
  Description :- Save data about users
  Inputs :- username and password
  Output :- signin completed

- `User /showProducts`
  Description :- Show all the products of the store.
- `User /purchaseProduct`
  Description :- Place your order.
