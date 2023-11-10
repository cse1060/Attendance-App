Project Overview:

This project is a Face Recognition Application that allows users to upload class image files to the website, where the system processes them using the InsightFace model. The model has a database of known faces against which it compares the detected faces in the uploaded images. The application employs React as the frontend framework and Django as the backend.

Features:

Image Upload: Users can upload class image files to the website.
Face Detection: The InsightFace model is used for face detection in the uploaded images.
Face Recognition: The detected faces are compared with known faces stored in the model.
Login/Logout Functionality: The website includes a login/logout functionality for user authentication.


Technology Stack

Frontend Framework: React
Backend Framework: Django
Face Detection Model: InsightFace
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/cse1060/Attendance-App.git
Navigate to the Backend Directory:

bash
Copy code
cd Attendance-App/backend
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Run Migrations:

bash
Copy code
python manage.py migrate
Start the Django Development Server:

bash
Copy code
python manage.py runserver
Navigate to the Frontend Directory:

bash
Copy code
cd ../frontend
Install Node Modules:

bash
Copy code
npm install
Start the React Development Server: npm run start

bash
Copy code
npm start
Access the Application:
Open your browser and go to http://localhost:3000 to access the Face Recognition Application.

Usage
Login:
Use the provided login functionality to access the application.

Upload Image:
Upload class image files through the website interface.

View Results:
The application will display the results of face detection and recognition.

Logout:
Logout from the application when done.

Contributors:
Pratham Gupta
Samyak Dhyani
Vashistha Chaturvedi

Acknowledgments
InsightFace for providing the face detection model.
The Django and React communities for their excellent frameworks.