# CSV Manager

### Upload, Search, and Manage CSV Data

This project provides a user-friendly interface and robust backend to upload, search, and manage CSV data. It is ideal for applications requiring efficient CSV file handling with features like real-time search and pagination.

## 📖 Table of Contents
1. **[Features](#✨-features)**
2. **[Technologies](#🛠️-technologies)**
3. **[Installation](#🚀-installation)**
4. **[Usage](#📋-usage)**
5. **[Frontend Overview](#frontend-1)**
6. **[Backend Overview](#backend-1)**
7. **[Contributing](#🤝-contributing)**
8. **[License](#📜-license)**

## ✨ Features

**CSV Upload**: Supports uploading .csv files with error handling.

**Real-Time Search**: Quickly filter and search through uploaded data.

**Pagination**: View data in paginated format for better usability.

**Responsive UI**:** Styled with modern components for an intuitive user experience.

**Backend Integration**: RESTful API for managing CSV data.

## 🛠️ Technologies

### Frontend

- **React**
- **React Router** for navigation
- **Sonner** for toast notifications
- **Styled Components** for styling

### Backend

- **Node.js** with **Express.js**
- **Multer** for file upload handling
- **convert-csv-to-json** for parsing CSV data
- **CORS** for cross-origin requests

## 🚀 Installation

### Prerequisites

Node.js installed on your system.

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-repo-name.git
```

2. Install dependencies for both frontend and backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Start the development servers:

```bash
npm run dev
```

## 📋 Usage

### Frontend

1. Upload a .csv file via the homepage interface.
2. Once uploaded, you can:
    - Search for specific data.
    - Navigate through pages of data.

### Backend

- POST /api/files: Upload a .csv file.
- GET /api/csvdata: Fetch paginated and filtered CSV data.
- Storage: Data is held in memory for simplicity. Can be extended to use a database.

#### Backend Structure
The backend follows a modular approach to improve code organization and maintainability. The application is divided into different parts that handle specific responsibilities:

- **Controllers**: Handle HTTP requests, extract data from the request, and respond with the appropriate result. In this case, they manage the CSV file upload and data retrieval with pagination.
- **Routes**: Define the URLs and HTTP methods for each operation (e.g., uploading a CSV file and querying data).
- **Middleware**: Processes requests before they reach the controllers, such as validating the uploaded file and handling errors.
- **Utils**: Helper functions that assist with common tasks, such as converting CSV to JSON and pagination logic.

This modular approach allows for cleaner and more maintainable code, enhancing system scalability and testing.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any features, fixes, or improvements.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

#### Summary of the MIT License

- You are free to use, modify, and distribute this project.
- You must include the original license in any copies or substantial portions of the software.
- The software is provided "as is", without warranty of any kind.

For more detailed information, please refer to the full text of the MIT License in the [LICENSE](LICENSE) file.
