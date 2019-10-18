db.createUser(
  {
      user: 'users_user',
      pwd: "users_pass",
      roles:[
          {
              role: "readWrite",
              db:   "usersDB"
          }
      ]
  }
);
