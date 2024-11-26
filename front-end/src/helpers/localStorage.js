const USER_KEY = "userData";

const localStorageUtil = {
  // Function to store user data in localStorage
  storeUser: (user) => {
    if (user && user.id && user.email && user.username && user.type) {
      // Store user object as a JSON string
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      console.error(
        "Invalid user data. Ensure id, email, username, and type are provided."
      );
    }
  },

  // Function to retrieve user data from localStorage
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Function to remove user data from localStorage
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },
};

export default localStorageUtil;
