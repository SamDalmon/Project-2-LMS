# Go Go LMS

## Purpose
To provide a secure system
* for Students to look at courses and enroll
* for Teachers to manage courses

## Database Structure
```mermaid
  erDiagram
    courses ||--o{ course_enrollment : has
    users ||--o{ course_enrollment : has
    users }o--|| roles : has

    courses {
      **Type** **Name**
      uuid id PK
      string name
      string description
    }

    course_enrollment {
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
    
```
