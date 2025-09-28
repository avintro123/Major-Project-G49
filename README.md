# AI Powered Debate Evaluator 🤖🎙️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)

An intelligent system designed to provide objective, consistent, and immediate feedback for debates. This project leverages Natural Language Processing (NLP) and Machine Learning (ML) to analyze debate arguments, moving beyond subjective human scoring to offer data-driven insights.

## 🎯 Problem Statement

In both academic and professional settings, evaluating debates is essential but challenging. Human judges, even when experienced, can introduce personal biases and inconsistencies into their scoring.This can discourage participants and compromise the fairness of a competition.The AI-Powered Debate Evaluator aims to solve this by creating a fair, scalable, and intelligent platform for assessing debate performance and providing constructive feedback for improvement.

## ✨ Features

* **Automated Evaluation:** Assess debate arguments submitted in either text or audio format[cite: 69]. [cite_start]Audio is automatically transcribed to text for analysis.
* **Multi-Faceted Analysis:** Uses ML models to evaluate arguments based on key criteria such as **argument strength**, **logical coherence**, **relevance**, **clarity**, **sentiment**, and **tone**.
* **Objective Scoring:** Generates impartial scores for each participant, reducing the subjective bias common in human evaluation.
* **Constructive Feedback:** Provides actionable feedback, highlighting logical strengths, identifying areas needing more evidence, and suggesting improvements.
* **Performance Tracking:** Keeps a detailed history of debate sessions, allowing participants and educators to track progress and identify patterns over time.
* **User-Friendly Interface:** An intuitive and responsive UI built with React.js for a seamless user experience.

## 🛠️ Technology Stack

| Category      | Technologies                                                                          |
| :------------ | :------------------------------------------------------------------------------------ |
| **Frontend** | React.js, JavaScript (ES2024)                                         |
| **Backend** |Java (Spring Boot), Python (FastAPI for ML Models) ,Node.Js                |
| **Database** |MongoDB                                                               |
| **AI/ML** | Natural Language Processing (NLP), Speech-to-Text, Machine Learning Models   |
| **DevOps** |Git, GitHub, Postman                                                    |
| **Auth** | Firebase                                                                  |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v22+)
* Java (JDK 21+) 
* Python (v3.11+)
* MongoDB Atlas account or local MongoDB instance 
* Firebase project for authentication

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/ai-debate-evaluator.git](https://github.com/your-username/ai-debate-evaluator.git)
    cd ai-debate-evaluator
    ```

2.  **Setup Backend (Java Spring Boot And Node.Js)**
    ```sh
    cd backend/java
    # Java Spring Boot Setup
    # Create an application.properties file with your DB and Firebase credentials
    # Build the project
    ./mvnw clean install
    # Run the application
    ./mvnw spring-boot:run
    # Node.js Setup
    cd backend/node
    # Install dependencies
    npm install
    # Create a .env file with your environment variables (e.g., DB URI, Firebase config)
    # Run the application
    npm start
    ```

3.  **Setup ML Service (Python FastAPI)**
    ```sh
    cd ml-service
    # Create a virtual environment
    python -m venv venv
    source venv/bin/activate
    # Install dependencies
    pip install -r requirements.txt
    # Run the service
    uvicorn main:app --reload
    ```

4.  **Setup Frontend (React)**
    ```sh
    cd frontend
    # Install dependencies
    npm install
    # Create a .env file with your backend API endpoints and Firebase config
    # Run the application
    npm start
    ```

## 👥 Team Members

This project is made possible by the following team members:

| Name                   | Role                                        |
| :--------------------- | :------------------------------------------ |
| Yash Vardhan Srivastava| Team Lead, AI/ML and Backend Lead  |
| Avantik Thakur         | AI/ML and Backend                 |
| Manya Sharma           | Presentation, Frontend, AI/ML, Deployment Lead  |
| Vivek Choudhary        | Frontend (React), AI/ML          |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
