# Event Booking System - Backend

This is the backend API for the Event Booking System built using **ASP.NET Core**.

## Features

-  User Authentication (Register/Login)
-  Role-based access (Admin / User)
- CRUD operations for Events (Admin only)
- Booking system for Events (User only)
- JWT Authentication

## Technologies Used

- ASP.NET Core Web API
- Entity Framework Core (Code First)
- SQL Server
- JWT Authentication

---

## Getting Started

### ✅ Prerequisites

- [.NET SDK 9.0]
- SQL Server (Local or remote)

### ✅ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/nancysoliman99/-ATC_01287868200.git
cd ATC_01287868200.git

2. **Update your appsettings.json with your SQL Server connection string**.

Apply migrations to the database:
update-datebase



3-in appsettings.json change connection string with name of your sql server


4 -Run the application:





 Authentication Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive JWT


 Event Endpoints

Method	Endpoint	Description
GET	/api/events	List all events 
GET	/api/events/{id}	Get specific event details
POST	/api/events	Create new event (Admin only)
PUT	/api/events/{id}	Update event (Admin only)
DELETE	/api/events/{id}	Delete event (Admin only)

 Booking Endpoints
Method	Endpoint	Description
POST	/api/bookings	Book an event (User only)
GET	/api/bookings	Get current user's bookings

AI Tools Used
ChatGPT 
Grok


