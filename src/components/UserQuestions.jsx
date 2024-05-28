// src/components/UserQuestions.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/userQuestions"
        );
        setQuestions(response.data.data);
      } catch (error) {
        console.error(
          "Kullanıcı soru-cevapları getirirken hata oluştu:",
          error
        );
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleAnswerSubmit = async (questionId) => {
    const answerText = answers[questionId];
    try {
      console.log(questionId, answerText);
      const response = await axios.post(`http://localhost:8080/api/answer`, {
        userQuestionId: questionId,
        answerText: answerText,
      });
      console.log("Cevap başarıyla gönderildi:", response.data);
      // Sorular listesini güncellemek için tekrar fetch yapabilirsiniz
      // veya sadece ilgili sorunun cevabını güncelleyebilirsiniz
    } catch (error) {
      console.error("Cevap gönderilirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Kullanıcı Soru-Cevap</h2>
      <div className="p-4 border border-gray-300 rounded-md">
        {questions.map((question) => (
          <div key={question.userQuestionId} className="mb-4">
            <div className="mb-2">
              <strong>Soru:</strong> {question.questionText}
              <br />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={answers[question.userQuestionId] || ""}
                onChange={(e) =>
                  handleInputChange(question.userQuestionId, e.target.value)
                }
                placeholder="Cevabınızı yazın"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleAnswerSubmit(question.userQuestionId)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Gönder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQuestions;
