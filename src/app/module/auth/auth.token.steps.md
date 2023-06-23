steps 1: create a auth module for login using users id and password 

step 2:then create a instance method to cheek if user exist or not.



step 3.save password using bcrypt for hash

step 3. create a jwt access and expires token use jwt helper(function) to reduce code for create 
access token and verify token ===> must be use env for store token and expires time  . using cookies for set expires token

step 4. authorize and authenticate user using auth function middleware

