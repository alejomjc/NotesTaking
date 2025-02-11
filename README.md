# NotesTaking – A Simple and Efficient Note-Taking Application  

## Summary of the Process  

The development of **NotesTaking** followed a structured and iterative approach to ensure a well-integrated and efficient application.  

1. **Requirement Analysis:**  
   - Defined the core functionalities, including note creation, editing, and deletion.  
   - Chose appropriate technologies for a seamless frontend-backend connection.  

2. **Design and Architecture:**  
   - Designed a modular architecture using Django Rest Framework (DRF) for the backend and Next.js for the frontend.  
   - Used SQLite as a lightweight and efficient database solution.  

3. **Implementation:**  
   - Developed a RESTful API in Django DRF to handle note-related operations.  
   - Built a responsive UI using Next.js and TailwindCSS.  
   - Configured CORS and CSRF settings to allow secure communication between frontend and backend.  
   - Allowed public API access to facilitate frontend-backend interaction during development.  

4. **Testing and Optimization:**  
   - Performed functional testing to ensure API and UI reliability.  
   - Applied performance optimizations for a smoother user experience.  

---

## Key Design and Technical Decisions  

- **Frameworks and Libraries:**  
  - Used **Django Rest Framework** to build a scalable and modular backend.  
  - Selected **Next.js** for frontend development due to its server-side rendering and optimized performance.  

- **Database Choice:**  
  - Used **SQLite** for simplicity, quick setup, and lightweight storage.  

- **Frontend-Backend Communication:**  
  - Configured **CORS and CSRF settings** to allow controlled access between the two components.  
  - API authentication was simplified by allowing public access during development.  

- **UI and User Experience:**  
  - Used **TailwindCSS** for fast, responsive, and consistent styling.  
  - Implemented a clean and minimalistic UI for an intuitive note-taking experience.  

---

## AI Tools Used and Their Role  

- **OpenAI GPT-4:**  
  - Assisted in structuring the application architecture.  
  - Provided guidance on best practices for REST API design and frontend-backend integration.  
  - Helped generate repetitive code and optimize components.  
  - Reviewed and improved documentation, including this README file.  

- **Code Analysis and Optimization:**  
  - Suggested optimizations for database queries and API endpoints.  
  - Helped identify and fix potential issues in frontend state management.  

The use of AI streamlined the development process, improved code efficiency, and ensured best practices were followed.

---

## How to Run the Project

### Prerequisites
Make sure you have installed:

1. **Node.js** (Recommended: version 18 or later).
2. **Python** (Recommended: version 3.8 or later).
3. **SQLite** (included by default in Python, used as the database).
4. **npm** and **pip** for package management (included with Node.js and Python respectively).

---

### 1. Setting Up and Running the Backend (Django)
The backend uses **Django Rest Framework (DRF)** to handle the REST API.

#### Instructions:
1. Clone the project repository if you haven’t already:
   ```bash
   git clone https://github.com/alejomjc/NotesTaking
   cd NotesTaking
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate           # Linux/macOS
   venv\Scripts\activate              # Windows
   ```

4. Install the project dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

6. (Optional) Create a superuser to access the Admin Panel:
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

The server will be available at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

### 2. Setting Up and Running the Frontend (Next.js)
The frontend uses **Next.js** together with **TailwindCSS** to create a modern, fast interface.

#### Instructions:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will be available at: [http://localhost:3000/](http://localhost:3000/)

---

### Verifying the Application  
1. Access the **backend** at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)  
2. Access the **frontend** at: [http://localhost:3000/](http://localhost:3000/)  

The application should now be ready to use! 🚀