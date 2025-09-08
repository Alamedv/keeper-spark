
# Keeper Spark

Brief description of the chosen project + justification
 
The project was custom-built with the help of an AI using the platform lovable.dev, after encountering difficulties configuring outdated projects available on GitHub. The application consists of a website with functionalities such as user login, registration, and task management, including the creation, editing, completion, and deletion of tasks.
Justification for the choice:
This project was chosen due to its practical relevance and because it covers common flows found in real-world applications, such as authentication and CRUD operations. Additionally, it was successfully configured, which made it feasible to carry out the testing process.



A web application for task management, built with the help of AI using the [lovable.dev](https://lovable.dev) platform.  
The system provides full authentication and task CRUD functionalities, making it ideal for study purposes, QA practice, and test automation.

[![CI](https://github.com/Alamedv/keeper-spark/actions/workflows/ci.yml/badge.svg)](https://github.com/Alamedv/keeper-spark/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/Coverage-0%25-red)](#)
[![npm version](https://img.shields.io/badge/npm-v_latest-blue)](https://www.npmjs.com/)

---
## QA & Testing

During the development of **Keeper Spark**, several **QA (Quality Assurance)** tasks were performed to ensure the quality, stability, and security of the application.

### Tools Used

*   **TypeScript**: TypeScript was used for strong typing, ensuring better maintainability and fewer runtime errors.  
    ![TypeScript](https://img.shields.io/badge/TypeScript-4e8b3b?style=for-the-badge&logo=typescript&logoColor=white)

*   **Playwright**: Automated **end-to-end (E2E)** tests to validate core user flows such as authentication and task management.  
    ![Playwright](https://img.shields.io/badge/Playwright-000000?style=for-the-badge&logo=playwright&logoColor=white)

*   **Postman**: Used for API testing, verifying the correctness of RESTful endpoints (login, registration, task management).  
    ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

*   **SQL**: Validated database interactions for user and task data, ensuring proper CRUD functionality and secure data storage.  
    ![SQL](https://img.shields.io/badge/SQL-003B57?style=for-the-badge&logo=mysql&logoColor=white)

### Automated Testing

*   **Authentication Flows**: Automated tests for user registration, login, and error handling.
*   **Task Management**: Validated task creation, editing, completion, and deletion through automated tests.
*   **Security Validation**: Ensured sensitive data (token) is encrypted and protected. Verified no sensitive data is exposed in logs.

### Security Measures

*   Data protection: Sensitive information is stored securely (encrypted) and is never exposed in logs.
*   Security testing for vulnerabilities such as **SQL Injection** and **XSS** was carried out to ensure secure interactions.


---


## Table of Contents

- [Keeper Spark](#keeper-spark)
  - [QA \& Testing](#qa--testing)
    - [Tools Used](#tools-used)
    - [Automated Testing](#automated-testing)
    - [Security Measures](#security-measures)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Running Locally](#running-locally)
  - [Test Scope](#test-scope)
  - [Test Objectives](#test-objectives)
  - [Recommended Test Environment](#recommended-test-environment)
  - [Sample Test Cases](#sample-test-cases)
  - [Risk Assessment and Prioritization](#risk-assessment-and-prioritization)
  - [Defect Reporting Procedure](#defect-reporting-procedure)
- [Bug Report (Summary Table)](#bug-report-summary-table)

---

## Features

- **User Authentication**
  - User registration
  - Login with validation
- **Task Management**
  - Create new tasks
  - Edit existing tasks
  - Mark tasks as completed
  - Delete tasks
- **Protected Flows**
  - Only authenticated users can manage tasks

---

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/Alamedv/keeper-spark.git
cd keeper-spark
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the application:

```bash
npm start
# or
yarn start
```

4. Open your browser and go to `http://localhost:8080`.

---

## Test Scope

- Authentication flows (registration and login)
- Task CRUD (create, edit, complete, delete)
- General system navigation

---

## Test Objectives

- Ensure that all critical flows work correctly
- Validate the user experience at key interaction points
- Identify and document functional and usability issues

---

## Recommended Test Environment

- **Operating System:** Windows 10 or higher (Linux/macOS also supported)  
- **Browser:** Google Chrome (latest version), Firefox (optional for cross-browser testing)  
- **Execution Environment:**  
  - Node.js v18 or higher  
  - NPM or Yarn for dependency management  
- **Application Environment:**  
  - Local run (`npm start`)  
  - Local or mocked backend if necessary  
- **Testing Tools:**  
  - Playwright (for E2E UI testing)  
  - VS Code or another code editor for adjustments
  - Postman
- **Internet Access:** Required to download packages and external resources  

---

## Sample Test Cases

| #   | Test Case                             | Pre-condition                           | Action                                  | Expected Result                   |
| --- | ------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------- |
| 1   | Registration with valid credentials   | Registration page accessible            | Fill in valid fields and submit         | User registered successfully      |
| 2   | Validation error – password too short | Registration page accessible            | Enter weak password and submit          | Error: "Password too short"       |
| 3   | Existing user registration            | User with same email already registered | Attempt to register again               | Error: "User already exists"      |
| 4   | Login with valid credentials          | Valid account already registered        | Enter correct email and password, login | Redirected, access granted        |
| 5   | Login with invalid password           | Valid account already registered        | Enter incorrect password                | Authentication error displayed    |
| 6   | Login and create task                 | Valid account already registered        | Login, create a task                    | Task appears in the list          |
| 7   | Login and complete task               | Task already created                    | Mark task as completed                  | Task marked as completed          |
| 8   | Login and update task                 | Task already created                    | Edit task name and save                 | Task updated successfully         |
| 9   | Task creation without login           | User not authenticated                  | Access task page directly               | Redirect to login / error message |
| 10  | Delete task                           | Task already created and visible        | Click "Delete"                          | Task removed from the list        |

---

## Risk Assessment and Prioritization

| Risk                                  | Impact | Probability | Mitigation Action                                 |
| ------------------------------------- | ------ | ----------- | ------------------------------------------------- |
| Login failure                         | High   | High        | Test with multiple valid and invalid data         |
| Task creation not working             | High   | Medium      | Validate required fields and boundary tests       |
| Data loss when updating tasks         | High   | Medium      | Test editing flows, saving, and canceling         |
| Cross-browser incompatibility         | Medium | Low         | Test on Chrome and Firefox, record behaviors      |
| Performance issues on tasks           | Medium | Medium      | Test with large lists and higher loads            |
| Failures in simultaneous login        | High   | Low         | Test login/logout on multiple devices             |
| Form data validation problems         | Medium | Medium      | Test invalid data and incorrect formats           |
| Backend communication failure         | High   | Low         | Test connection loss scenarios and error handling |
| Task deletion failure                 | Medium | Medium      | Validate proper removal and UI update             |
| Security issues (e.g., data exposure) | High   | Low         | Review code and test unauthorized access          |

---

## Defect Reporting Procedure

1. Reproduce the error at least twice to confirm.  
2. Document the defect with the following details:  
   - Defect title  
   - Steps to reproduce  
   - Actual result  
   - Expected result  
   - Severity (High / Medium / Low)  
3. Report the defect using a tracking tool (e.g., Trello, Jira, Google Docs, or spreadsheet).

# Bug Report (Summary Table)

| **Bug** | **Steps to Reproduce** | **Expected Behavior** | **Actual Behavior** | **Severity** | **Priority** |
|---------|-------------------------|-----------------------|---------------------|--------------|--------------|
| **1. Login allowed after user deletion** | 1. Delete a user in the app.<br>2. Attempt login with deleted email. | System should block login with message “User not found” or “Account deleted”. | Login is still possible with deleted email. | High | High |
| **2. Invalid emails accepted during registration** | 1. Open registration screen.<br>2. Enter invalid email (e.g., `abc@.invalid@.test`).<br>3. Submit. | System should reject invalid emails with error “Invalid email”. | Registration is accepted with invalid emails. | Medium | Medium |
| **3. Duplicate usernames allowed** | 1. Open registration screen.<br>2. Register user with username `test123`.<br>3. Register another user with same username. | System should enforce unique usernames and show error. | Multiple accounts with same username allowed. | High | High |
