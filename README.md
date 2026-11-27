# Fathom LMS

## Purpose
To provide a secure system
* for Students to look at courses and enroll
* for Teachers to manage courses

# Technologies used

**Frontend** 
* **Framework**: ReactJS

**Backend** 
* **Framework**: Django
* **Authentication**: dj-rest-auth
* **User Roles**: django-role-permissions

**Database**: SQLite  

# Project Setup

## Backend
run in ```/backend```
1. ```python3 -m venv main-venv && main-venv/bin/pip```
2. ```pip install -r requirements.txt```
3. ```source main-venv/bin/activate```
4. ```python manage.py migrate```

## Frontend
run in ```/fathom-lms```
1. ```npm install```

# How to start

**Frontend**: 
Run Local: ```npm run dev```
Local Host: ```http://localhost:5173/```

**Backend** (run from `backend/`): 
Create venv (first time) ```python3 -m venv main-venv && main-venv/bin/pip install -r requirements.txt```
Activate venv 
- (macOS) ```source main-venv/bin/activate``` 
- or (Windows) ```main-venv/Scripts/Activate.ps1```
VS Code activates it automatically in new terminals (see `.vscode/settings.json`).
Run Local ```python manage.py runserver```
Local Host: ```http://127.0.0.1:8000/```

# If theres a database schema change
1. ```python manage.py makemigrations```
2. ```python manage.py migrate```

# Testing

## Backend
* ```python manage.py test``` to run all tests
* ```python manage.py test {appName}``` to test a specific app

# Database Structure
```mermaid
  erDiagram
    courses ||--o{ course_enrollments : has
    users ||--o{ course_enrollments : has
    users }o--|| roles : has
    roles ||--o{ role_permissions : has
    permissions ||--o{ role_permissions : has
    

    courses {
      **Type** **Name**
      uuid id PK
      string name
      string description
    }

    course_enrollments {
      **Type** **Name**
      uuid id PK
      uuid course_id FK
      uuid user_id FK
    }
    
    users {
      **Type** **Name**
      uuid id PK
      string username
      string password_hash
     uuid role_id FK
    }

    roles {
      **Type** **Name**
      int id PK
      string name
    }

    permissions {
      **Type** **Name**
      int id PK
      string permission_string
      string description
    }

    role_permissions {
      **Type** **Name**
      int id PK
      int role_id FK
      int permission_id FK
    }
    
```

# Available Backend Commands

**To Run Commands** - From inside of main-venv: ```python manage.py {command_name}```
* **seed_users** - seeds the data base with a user from each role and status
* **seed_pending_teachers {num}** - Seeds a specified number of pending teachers
* **seed_courses** - seeds a list of demo courses

# Api Endpoints
/api/   rest_framework.routers.APIRootView      api:api-root
/api/<drf_format_suffix:format> rest_framework.routers.APIRootView      api:api-root
/api/courses    api.views.CourseListCreateView  api:course-list-create
/api/courses/<int:pk>   api.views.CourseDetailView      api:course-detail
/api/courses/<pk>/enroll/       api.views.EnrollmentActionViewSet       api:enrollment-actions-enroll
/api/courses/<pk>/enroll\.<format>/     api.views.EnrollmentActionViewSet       api:enrollment-actions-enroll
/api/courses/<pk>/unenroll/     api.views.EnrollmentActionViewSet       api:enrollment-actions-unenroll
/api/courses/<pk>/unenroll\.<format>/   api.views.EnrollmentActionViewSet       api:enrollment-actions-unenroll
/api/me/courses api.views.EnrolledCoursesView   api:user-courses
/api/users/     rest_framework.routers.APIRootView      users:api-root
/api/users/     users.views.UserViewSet users:users-list
/api/users/<drf_format_suffix:format>   rest_framework.routers.APIRootView      users:api-root
/api/users/<pk>/        users.views.UserViewSet users:users-detail
/api/users/<pk>/approve/        users.views.UserViewSet users:users-approve
/api/users/<pk>/approve\.<format>/      users.views.UserViewSet users:users-approve
/api/users/<pk>/reject/ users.views.UserViewSet users:users-reject
/api/users/<pk>/reject\.<format>/       users.views.UserViewSet users:users-reject
/api/users/<pk>\.<format>/      users.views.UserViewSet users:users-detail
/api/users/\.<format>/  users.views.UserViewSet users:users-list
/api/users/auth/login/  dj_rest_auth.views.LoginView    users:rest_login
/api/users/auth/logout/ dj_rest_auth.views.LogoutView   users:rest_logout
/api/users/auth/password/change/        dj_rest_auth.views.PasswordChangeView   users:rest_password_change
/api/users/auth/password/reset/ dj_rest_auth.views.PasswordResetView    users:rest_password_reset
/api/users/auth/password/reset/confirm/ dj_rest_auth.views.PasswordResetConfirmView     users:rest_password_reset_confirm
/api/users/auth/registration/student    users.views.StudentRegisterView users:student-register
/api/users/auth/registration/teacher    users.views.TeacherRegisterView users:teacher-register
/api/users/auth/token/refresh/  dj_rest_auth.jwt_auth.RefreshViewWithCookieSupport      users:token_refresh
/api/users/auth/token/verify/   rest_framework_simplejwt.views.TokenVerifyView  users:token_verify
/api/users/auth/user/   dj_rest_auth.views.UserDetailsView      users:rest_user_details
/api/users/constants    users.views.UserConstantsView   users:user-constants
/api/users/permissions  users.views.UserPermissionsView users:user-permissions

# Future Improvements 

## Maintenance
* Make some of the terminology more consistent
* make semi colons use more consistent
* remove repeated or unused constants

## Features
* allow teachers to assign them selves to courses, and only allow them to edit their courses
