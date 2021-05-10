# CRUD APP WITH DATABASE

This is a Basic CRUD app using Express.js and MongoDB as Database and is hosted on heroku as assigned by the **Zuri Team**.

* **URL**

  https://node-crud-database.herokuapp.com/data

* **Method**
  
  `GET` | `POST` | `DELETE` | `PUT`

* **URL Params**

  **Required:**
  
  `dataId=[objectId]`
  
* **Data Params**

  {  
    &nbsp;&nbsp;&nbsp; name: "your name",  
    &nbsp;&nbsp;&nbsp; email: "email address not already in database",   
    &nbsp;&nbsp;&nbsp; country: "Your country"    
  }
  
  
* **Success Response**

  * **Code:** 200 <br />
    **Content:** `{"message":"All Data successfully retrieved","data":[{"_id":"60993533713cd82bc4923856","name":"princewhyte3","email":"princewhte05@gmail.com","country":"Nigeria","createdAt":"2021-05-10T13:29:23.265Z","updatedAt":"2021-05-10T13:29:23.265Z","__v":0}]}`
    
* **Error Response:**  
   * **Code:** 404 NOT FOUND <br />
    **Content:** `{  "message": "Data 60993533713cd82bc4923854 not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ 
    "message": "E11000 duplicate key error collection: data.datas index: email_1 dup key: { email: \"princewhte05@gmail.com\" }"}`
  
