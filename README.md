# Go Go LMS

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

# How to start

**Backend**: ```python manage.py runserver```

## Database Structure
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
