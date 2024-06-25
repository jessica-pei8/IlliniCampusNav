# Illini CampusNav

Illini CampusNav is a project aimed at helping students navigate the University of Illinois at Urbana-Champaign campus more efficiently. By providing optimized routing schedules, personalized to user preferences and schedules, Illini CampusNav seeks to enhance the overall campus life experience.

## Table of Contents

- [Pitch](#pitch)
- [Functionality](#functionality)
- [Components](#components)
- [Teamwork](#teamwork)
- [Contributors](#contributors)
- [Enviroment/Setup](#enviroment)

## Pitch

The University of Illinois at Urbana-Champaign's expansive campus presents a unique challenge for students, requiring them to navigate long distances between buildings daily. By optimizing their travel paths, including study locations and dining hall visits, Illini CampusNav aims to significantly reduce time spent commuting and enhance overall campus life quality.

## Functionality

- Generate customized daily schedules based on class locations, preferred study spots, and dining halls.
- View optimized routes between classes and selected locations.
- Customize routes based on preferences such as fastest route, biking, driving, etc.
- Set reminders for important events or deadlines associated with schedules.
- Explore nearby University amenities or points of interest along routes.

## Components

### Backend Development

- **Routing Algorithm**: Implement a sophisticated routing algorithm using Python, prioritizing efficiency and user preferences.
- **API Development**: Develop RESTful APIs using Flask for seamless communication between frontend and backend.
- **Database Management**: Utilize Flask-SQLAlchemy for robust data management, storing user profiles, schedules, preferences, and historical routes.

### Frontend Development

- **Interactive Map Interface**: Create an interactive map of the UIUC campus using React for visually planning routes and schedules.
- **User Authentication and Profile Management**: Implement a secure login system and user profile management interface for personalizing routing suggestions.
- **Responsive Design**: Ensure the web application is fully responsive across various devices using CSS frameworks like Bootstrap or Tailwind CSS.


## Contributors
Main contributions 
- Jessica (GitHub: jessica-pei8): Backend Development
- Kevin (GitHub: kevinh05): Google Maps API
- Akshat (GitHub: Gupta91): Routing Algo
- Ruchir (GitHub: Ruchir05): Frontend Development

## Environment Setup

### Initial venv Installation

Navigate to the `api` directory, and run the following command to set up the virtual environment for the backend:

```
python3 -m venv ./venv
```

### Running venv

Before running any code, activate the virtual environment. For Windows, run:

```
venv/Scripts/activate
```

Then, start the backend server by running:

```
yarn start-api
```

This will start the Flask SQLAlchemy backend on a separate port.

### Connection to Frontend

Open another terminal and navigate to the `illini-campusnav` directory. Then, run the following command to start the React frontend:

```
yarn start
```

This will launch the React frontend, which is linked to the backend running on a separate terminal.
