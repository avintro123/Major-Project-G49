# AI Powered Debate Evaluator 🤖🎙️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)

An intelligent system designed to provide objective, consistent, and immediate feedback for debates. [cite_start]This project leverages Natural Language Processing (NLP) and Machine Learning (ML) to analyze debate arguments, moving beyond subjective human scoring to offer data-driven insights[cite: 41, 42].

## 🎯 Problem Statement

[cite_start]In both academic and professional settings, evaluating debates is essential but challenging[cite: 32]. [cite_start]Human judges, even when experienced, can introduce personal biases and inconsistencies into their scoring[cite: 37]. [cite_start]This can discourage participants and compromise the fairness of a competition[cite: 40]. [cite_start]The AI-Powered Debate Evaluator aims to solve this by creating a fair, scalable, and intelligent platform for assessing debate performance and providing constructive feedback for improvement[cite: 65, 66].

## ✨ Features

* [cite_start]**Automated Evaluation:** Assess debate arguments submitted in either text or audio format[cite: 69]. [cite_start]Audio is automatically transcribed to text for analysis[cite: 44].
* [cite_start]**Multi-Faceted Analysis:** Uses ML models to evaluate arguments based on key criteria such as **argument strength**, **logical coherence**, **relevance**, **clarity**, **sentiment**, and **tone**[cite: 45].
* [cite_start]**Objective Scoring:** Generates impartial scores for each participant, reducing the subjective bias common in human evaluation[cite: 47, 71].
* [cite_start]**Constructive Feedback:** Provides actionable feedback, highlighting logical strengths, identifying areas needing more evidence, and suggesting improvements[cite: 47, 48].
* [cite_start]**Performance Tracking:** Keeps a detailed history of debate sessions, allowing participants and educators to track progress and identify patterns over time[cite: 61, 75].
* [cite_start]**User-Friendly Interface:** An intuitive and responsive UI built with React.js for a seamless user experience[cite: 76].

## 🛠️ Technology Stack

| Category      | Technologies                                                                          |
| :------------ | :------------------------------------------------------------------------------------ |
| **Frontend** | [cite_start]React.js, JavaScript (ES2024) [cite: 89]                                               |
| **Backend** | [cite_start]Java (Spring Boot), Python (FastAPI for ML Models) [cite: 17, 89]                       |
| **Database** | [cite_start]MongoDB [cite: 89]                                                                    |
| **AI/ML** | [cite_start]Natural Language Processing (NLP), Speech-to-Text, Machine Learning Models [cite: 42]   |
| **DevOps** | [cite_start]Git, GitHub, Postman [cite: 89]                                                       |
| **Auth** | [cite_start]Firebase [cite: 17]                                                                   |

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

2.  **Setup Backend (Java Spring Boot)**
    ```sh
    cd backend
    # Create an application.properties file with your DB and Firebase credentials
    # Build the project
    ./mvnw clean install
    # Run the application
    ./mvnw spring-boot:run
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
