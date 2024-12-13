<p align="center">
  <img src="https://github.com/user-attachments/assets/b497dea8-9f9f-44b4-a477-58e03125a267" width="160" height="160" alt="image">
</p>
<div align="center">

<h1 align="center">ProjectMates</h1>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#technology-stack">Technology Stack</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#assumption">Assumption</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/user-attachments/assets/da7a63cd-ab42-45b1-a019-407be59b29ee)

<p> ProjectMates  is an application designed to support students and graduates of King Fahd University of Petroleum and Minerals (KFUPM) by facilitating the process of finding partners for academic and professional projects. The platform aims to make it easier for students to connect, collaborate, and share projects, enhancing their university experience and building a strong network within the KFUPM community.</p>

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- BUILT WITH -->
### Built With

* [![React][React.js]][React-url]
* <a href="https://tailwindcss.com/"><img src="https://github.com/user-attachments/assets/395d64c8-a11a-419e-ba7a-4505f903b391" width="130" height="40" alt="Tailwind CSS"></a>
* <a href="https://www.mongodb.com/"><img src="https://github.com/user-attachments/assets/5b2fc34f-8235-401d-8a13-d7b7af5880ab" width="130" height="40" alt="MongoDB"></a>
* <a href="https://jwt.io/"><img src="https://github.com/user-attachments/assets/da3368ee-7a1e-4599-ae6c-5e942d1f07d2" width="130" height="40" alt="JWT"></a>
* <a href="https://mongoosejs.com/"><img src="https://github.com/user-attachments/assets/e1e2ea57-42c5-4d09-83a6-1e0f48ff402a" width="130" height="40" alt="Mongoose"></a>
* <a href="https://expressjs.com/"><img src="https://github.com/user-attachments/assets/de555872-a606-45ef-a023-6d3c4ede561d" width="130" height="40" alt="Express"></a>
* <a href="https://nodejs.org/en"><img src="https://github.com/user-attachments/assets/521ece98-bc4e-46c8-91f6-80b35fe3f149" width="130" height="40" alt="Node.js"></a>






<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/MaherWasel/front-end-projectmate

   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Development Server
   ```js
   npm start
   ```


<p align="right">(<a href="#about-the-project">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Technology Stack

- **Frontend**: [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - Used for smooth and responsive animations.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for building modern designs.
- **Navigation**: [React Router DOM](https://reactrouter.com/) - For efficient and seamless page navigation.
- **Datebase**: [mongodb](https://www.mongodb.com/) - A developing scalable applications with evolving data schemas.
- **Backend**: [Nodejs](https://nodejs.org/en) - For building the backend.
- **Backend**: [Express.js](https://expressjs.com/) - Web framework for handling routes, middleware, and HTTP requests.
- **Datebase**: [Mongoose](https://mongoosejs.com/) - to define schemas and interact with MongoDB collections (e.g., User, Project, Report models).
- **Authentication & Security**: [JWT](https://jwt.io/) - Used for secure user authentication and session handling.-
- **Authentication & Security**: [bcrypt](https://www.npmjs.com/package/bcrypt) - For hashing and verifying user passwords.

bcrypt: For hashing and verifying user passwords.
  


<p align="right">(<a href="#about-the-project">back to top</a>)</p>


## Screenshots
<div style="display: flex; justify-content: center; gap: 20px;"> <img src="https://github.com/user-attachments/assets/1250c7f5-e818-4f4a-a7e6-008820b9577b" width="300" height="200" alt="Image 1"> <img src="https://github.com/user-attachments/assets/da7a63cd-ab42-45b1-a019-407be59b29ee" width="300" height="200" alt="Image 2"> <img src="https://github.com/user-attachments/assets/2eb6b8b5-f9a2-480c-bc2c-ff4b87b11c64" width="300" height="200" alt="Image 3"> <img src="https://github.com/user-attachments/assets/c6341d92-386a-4c27-9cf0-97e8c5e70b4e" width="300" height="200" alt="Image 4"> <img src="https://github.com/user-attachments/assets/731d63e4-8d1e-40b0-aa80-cab2f91e9c3d" width="300" height="200" alt="Image 5"> <img src="https://github.com/user-attachments/assets/071703e4-02ae-45d0-8799-1f45ab42f415" width="300" height="200" alt="Image 6"></div> <p align="right">(<a href="#about-the-project">back to top</a>)</p> <!-- ASSUMPTION -->



## Assumption

- All necessary data files are located in `src/helpers`.
-  Please understand Backend structure that we are following, as we have 7 folders in the main directory and 2 files:
<h1>Project backend File Structure</h1>

<p>This project follows an organized file structure to ensure modularity and maintainability. Below is an explanation of the main files and folders in the project:</p>

<h2>Folders</h2>
<ul>
  <li>
    <strong><code>cloudinary/</code></strong> - Manages media-related tasks, such as uploading and optimizing images using the Cloudinary API.
  </li>
  <li>
    <strong><code>controllers/</code></strong> - Contains functions that handle business logic and interact with models for CRUD operations.
  </li>
  <li>
    <strong><code>models/</code></strong> - Defines database schemas and applies validation rules for the data.
  </li>
  <li>
    <strong><code>routes/</code></strong> - Maps HTTP requests to the corresponding controller functions, acting as the bridge between the client and server.
  </li>
  <li>
    <strong><code>seeds/</code></strong> - Contains scripts for populating the database with initial or sample data.
  </li>
  <li>
    <strong><code>utils/</code></strong> - Includes utility functions and reusable logic used across the project.
  </li>
</ul>

<h2>Files</h2>
<ul>
  <li>
    <strong><code>.gitignore</code></strong> - Specifies files and directories to be ignored by Git, such as environment variables or logs.
  </li>
  <li>
    <strong><code>README.md</code></strong> - Provides an overview of the project, setup instructions, and usage details.
  </li>
  <li>
    <strong><code>app.js</code></strong> - Initializes the application, middleware, and configurations.
  </li>
  <li>
    <strong><code>index.html</code></strong> - A placeholder or static HTML file (if applicable).
  </li>
  <li>
    <strong><code>middleware.js</code></strong> - Defines middleware functions for tasks like authentication, logging, or error handling.
  </li>
  <li>
    <strong><code>package.json</code> & <code>package-lock.json</code></strong> - Manage project metadata, scripts, and dependencies.
  </li>
  <li>
    <strong><code>server.js</code></strong> - The main entry point of the application. Starts the server and initializes routes, database connections, and controllers.
  </li>
</ul>

<p>This structure ensures a clear separation of concerns, making the project scalable, maintainable, and easy to understand.</p>


### Routes
- The back-end is deployed separately on: https://projectmate-api.onrender.com/
- You may wait 1 minute for initial connection
- For a sample env, contact us

  
# **API Documentation**

## **Routes**

### **Auth Routes**
Handles authentication-related routes.

- **`POST /login`**  
  - **Description**: Logs in a user.

- **`POST /register`**  
  - **Description**: Registers a new user.

---

### **Projects Routes**
Handles project-related routes.

- **`GET /projects/`**  
  - **Description**: Retrieves all projects.

- **`POST /projects/`**  
  - **Description**: Creates a new project.

- **`GET /projects/:id`**  
  - **Description**: Retrieves a specific project by `id`.

- **`PATCH /projects/:id`**  
  - **Description**: Updates a specific project by `id`.

- **`POST /projects/:id/joinRequests`**  
  - **Description**: Sends a request to join a specific project.

- **`GET /projects/:id/joinRequests`**  
  - **Description**: Retrieves all join requests for a specific project.

- **`PATCH /projects/:id/joinRequests`**  
  - **Description**: Accepts a join request for a specific project.

- **`POST /projects/:id/report`**  
  - **Description**: Reports a specific project.

---

### **Profile Routes**
Handles user profile-related routes.

- **`GET /profile/:username`**  
  - **Description**: Retrieves profile information for the specified user.

- **`POST /profile/:username`**  
  - **Description**: Updates profile information for the specified user.  
  - **Additional Information**: Accepts a single image file upload.

- **`GET /profile/:username/projects`**  
  - **Description**: Retrieves projects associated with the specified user.

- **`POST /profile/:username/report`**  
  - **Description**: Reports the specified user.

---

### **Admin Routes**
Handles admin-related routes.

- **`GET /admin/home`**  
  - **Description**: Home page for the admin.

- **`GET /admin/users`**  
  - **Description**: User management page for admin.

- **`GET /admin/stats`**  
  - **Description**: Displays platform statistics for admin.

- **`GET /admin/stats/generate`**  
  - **Description**: Generates and downloads a PDF report of platform statistics.

- **`GET /admin/users/:id/ban`**  
  - **Description**: Bans a specific user by their `id`.

- **`GET /admin/users/:id/unban`**  
  - **Description**: Unbans a specific user by their `id`.

- **`GET /admin/reports`**  
  - **Description**: Reports management page for admin.

- **`DELETE /admin/reports/:id`**  
  - **Description**: Deletes a specific report by its `id`.

- **`DELETE /admin/projects/:id`**  
  - **Description**: Deletes a specific project by its `id`.

---

### **Invite Routes**
Handles invitation-related routes.

- **`POST /invites/`**  
  - **Description**: Creates a new invitation.

- **`GET /invites/`**  
  - **Description**: Retrieves all invitations.

- **`PATCH /invites/:id`**  
  - **Description**: Handles a specific invitation by `id`.

---

### **Other Routes**
Handles additional routes.

- **`GET /image`**  
  - **Description**: Retrieves an image.

---



### Access Requirements

- To access **normal pages**, `currentUser` must be logged in and not `banned`.
- To access **admin pages**, the `currentUser` status must be set to `Turki`. and the password should be 'Aa123456@' Note that this will be changed after the demo!!

<p align="right">(<a href="#about-the-project">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Image-icon]: https://github.com/user-attachments/assets/395d64c8-a11a-419e-ba7a-4505f903b391
[Image-icon]: <img src="https://github.com/user-attachments/assets/395d64c8-a11a-419e-ba7a-4505f903b391" width="6" height="30">
[Image-url]: https://tailwindcss.com/
[Image-icon]: https://github.com/user-attachments/assets/521ece98-bc4e-46c8-91f6-80b35fe3f149
[Image-icon]: https://github.com/user-attachments/assets/5b2fc34f-8235-401d-8a13-d7b7af5880ab
[Image-icon]: 
[Image-icon]: 
[Image-icon]: 
[Image-icon]: 
[Image-icon]: 
[Image-icon]: 
[Image-icon]: 




































