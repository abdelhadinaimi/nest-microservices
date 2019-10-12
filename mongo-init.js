db.createUser(
  {
      user: 'medias_user',
      pwd: "medias_pass",
      roles:[
          {
              role: "readWrite",
              db:   "mediasDB"
          }
      ]
  }
);
