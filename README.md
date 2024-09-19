# Linktree-like API Documentation

Welcome to the Linktree-like API! This API allows you to manage links, track comprehensive analytics, export reports, generate QR codes, and receive notifications for user performance. Below you will find details for each feature, including endpoints, required variables, and responses.

---

## Table of Contents

1. [Link Management](#link-management)
2. [Analytics](#analytics)
   - [Total Clicks](#total-clicks)
   - [Clicks Per Link](#clicks-per-link)
   - [Daily, Weekly, Monthly Performance](#daily-weekly-monthly-performance)
   - [Top and Bottom Performing Links](#top-and-bottom-performing-links)
   - [Bounce Rate](#bounce-rate)
   - [Return Visitors](#return-visitors)
   - [Engagement Rate](#engagement-rate)
3. [Export Report](#export-report)
4. [QR Code Generation](#qr-code-generation)
5. [Notifications](#notifications)

---

## 1. Link Management

# Link Management API

## Overview

This API provides a set of endpoints for managing user links in a Linktree-like application. Users can create, read, update, and delete links associated with their profiles.


## Endpoints

### 1. Get All Links for a User

- **Method**: `GET`
- **Endpoint**: `/users/{userId}/links`
- **Description**: Retrieves all links associated with the specified user.
- **URL Parameters**:
  - `userId` (string): The ID of the user.

### 2. Create a New Link

- **Method**: `POST`
- **Endpoint**: `/users/{userId}/links`
- **Description**: Creates a new link for the specified user.
- **URL Parameters**:
  - `userId` (string): The ID of the user.
- **Request Body**:
  ```json
  {
      "title": "My Website",
      "url": "https://mywebsite.com",
      "is_active": true,
      "start_time": null,
      "end_time": null
  }
  ```
- **Request Body Fields**:
  - `title` (string): The title of the link.
  - `url` (string): The URL of the link.
  - `is_active` (boolean): Indicates if the link is active.
  - `start_time` (string, optional): The start time for link visibility.
  - `end_time` (string, optional): The end time for link visibility.

### 3. Get a Specific Link

- **Method**: `GET`
- **Endpoint**: `/users/{userId}/links/{id}`
- **Description**: Retrieves details of a specific link by its ID for the specified user.
- **URL Parameters**:
  - `userId` (string): The ID of the user.
  - `id` (string): The ID of the link.

### 4. Update a Link

- **Method**: `PUT`
- **Endpoint**: `/users/{userId}/links/{id}`
- **Description**: Updates the details of a specific link for the specified user.
- **URL Parameters**:
  - `userId` (string): The ID of the user.
  - `id` (string): The ID of the link.
- **Request Body**:
  ```json
  {
      "title": "Updated Title",
      "url": "https://updatedurl.com",
      "is_active": false
  }
  ```
- **Request Body Fields**:
  - `title` (string): The updated title of the link.
  - `url` (string): The updated URL of the link.
  - `is_active` (boolean): Indicates if the link should be active.

### 5. Delete a Link

- **Method**: `DELETE`
- **Endpoint**: `/users/{userId}/links/{id}`
- **Description**: Deletes a specific link by its ID for the specified user.
- **URL Parameters**:
  - `userId` (string): The ID of the user.
  - `id` (string): The ID of the link.

## Example Requests

### Get All Links for a User

```
GET /api/users/123/links
```

### Create a New Link

```
POST /api/users/123/links
Content-Type: application/json

{
    "title": "My Website",
    "url": "https://mywebsite.com",
    "is_active": true
}
```

### Get a Specific Link

```
GET /api/users/123/links/456
```

### Update a Link

```
PUT /api/users/123/links/456
Content-Type: application/json

{
    "title": "Updated Title",
    "url": "https://updatedurl.com",
    "is_active": false
}
```

### Delete a Link

```
DELETE /api/users/123/links/456
```

## 2. Analytics

### Total Clicks

**Endpoint:** `GET /api/users/{userId}/analytics/total-clicks`

**Response:**
```json
{
    "total_clicks": 150
}
```

---

### Clicks Per Link

**Endpoint:** `GET /api/users/{userId}/analytics/clicks-per-link`

**Response:**
```json
{
    "link_clicks": [
        {
            "link_id": 1,
            "total_clicks": 100
        },
        {
            "link_id": 2,
            "total_clicks": 50
        }
    ]
}
```

---

### Daily, Weekly, Monthly Performance

**Endpoint:** `GET /api/users/{userId}/analytics/performance`

**Query Parameters:**
- `period`: Specify `daily`, `weekly`, or `monthly`.

**Example Request:**
```
GET /api/users/1/analytics/performance?period=daily
```

**Response:**
```json
{
    "performance": [
        {
            "date": "2024-09-01",
            "total_clicks": 20
        },
        {
            "date": "2024-09-02",
            "total_clicks": 30
        }
    ]
}
```

---

### Top and Bottom Performing Links

**Endpoint:** `GET /api/users/{userId}/analytics/top-bottom`

**Response:**
```json
{
    "top_links": [
        {
            "link_id": 1,
            "total_clicks": 100
        }
    ],
    "bottom_links": [
        {
            "link_id": 2,
            "total_clicks": 1
        }
    ]
}
```

---

### Bounce Rate

**Endpoint:** `GET /api/users/{userId}/analytics/bounce-rate`

**Response:**
```json
{
    "bounce_rate": 25.5
}
```

---

### Return Visitors

**Endpoint:** `GET /api/users/{userId}/analytics/return-visitors`

**Response:**
```json
{
    "return_visitors": 30
}
```

---

### Engagement Rate

**Endpoint:** `GET /api/users/{userId}/analytics/engagement-rate`

**Response:**
```json
{
    "engagement_rate": 60.0
}
```

---

## 3. Export Report

### Export Analytics Report as Word Document

**Endpoint:** `GET /api/users/{userId}/analytics/export-word`

**Query Parameters:**
- `start_date`: The start date for the report (format: `YYYY-MM-DD`).
- `end_date`: The end date for the report (format: `YYYY-MM-DD`).

**Example Request:**
```
GET /api/users/1/analytics/export-word?start_date=2023-01-01&end_date=2023-01-31
```

**Response:**
- Returns a downloadable Word document containing the analytics report.

---

## 4. QR Code Generation

### Generate QR Code for User Profile

**Endpoint:** `GET /api/users/{userId}/profile/qrcode`

**Response:**
- Returns a PNG image of the QR code linking to the user’s profile.

---

## 5. Notifications

### Fetch Notifications

**Endpoint:** `GET /api/users/{userId}/notifications`

**Response:**
```json
[
    {
        "id": 1,
        "type": "App\\Notifications\\PerformanceNotification",
        "data": {
            "top_links": [ /* top links data */ ],
            "bottom_links": [ /* bottom links data */ ]
        },
        "created_at": "2024-09-18T12:00:00Z",
        "updated_at": "2024-09-18T12:00:00Z"
    }
]
```

---

## Important Variables

- **userId**: The ID of the user for whom actions are performed.
- **linkId**: The ID of the specific link.
- **start_date**: The start date for the analytics report.
- **end_date**: The end date for the analytics report.
- **period**: Specifies the time period for performance data (`daily`, `weekly`, `monthly`).

---

## Conclusion

This API provides comprehensive functionality for managing links, tracking detailed analytics, exporting reports, generating QR codes, and notifying users of their link performance. For any questions or issues, feel free to raise an issue on this repository.

Happy coding! 🎉