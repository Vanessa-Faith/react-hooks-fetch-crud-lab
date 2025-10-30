import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((question) => {
        setQuestions([...questions, question]);
        setPage("List");
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions}
          onDeleteQuestion={(id) => {
            fetch(`http://localhost:4000/questions/${id}`, {
              method: "DELETE",
            })
              .then(() => {
                setQuestions(questions.filter((q) => q.id !== id));
              });
          }}
          onUpdateQuestion={async (id, correctIndex) => {
            const response = await fetch(`http://localhost:4000/questions/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ correctIndex: parseInt(correctIndex) }),
            });
            const updatedQuestion = await response.json();
            setQuestions(questions.map((q) => 
              q.id === id ? updatedQuestion : q
            ));
          }}
        />
      )}
    </main>
  );
}

export default App;
