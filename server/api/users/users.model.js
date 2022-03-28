import uuidv4 from 'uuid/v4';

class User {
  users = [];

  find() {
    // Returns a list of all users
      return this.users;
  }

  findById(userId) {
    // Find user by Id
    // Returns user, or null if not present

      let foundUsers = this.users.filter(function(user){
          if(user.id === userId){
              return true;
          }
          return false;
      });

      if(foundUsers.length > 0){
          return foundUsers[0];
      } else {
          return null;
      }
  }

  create(user) {
    // Create a new user
    // Return created user
    // Generate the id and overwrite any id that may be present in user
      let id = uuidv4();
      user.id = id;
      this.users.push(user);
      return user;
  }

  findOneAndUpdate(userId) {
    // Find user and update
    // If user does not exist, create it using Id provided
    // Return true if user was updated, false if user was created
      let foundUser = this.users.filter(function(user){
          if(user.id == userId) {
              return true;
          }
          return false;
      });

      if (foundUser.length > 0){ //found a user
          foundUser[0].id = userId;
          return true;
      } else {
          this.users.push()
          return false;
      }

  }

  remove(userId) {
    // Remove user if exists with the Id provided
    // Return true if removed
    // Return false if did user not exist
      let userIndex = this.users.map(function(user){
          return user.id;
      }).indexOf(userId);

      if (userIndex !== -1){
          this.users.splice(userIndex, 1);
          return true;
      } else {
          return false;
      }
  }
}
export default new User();
