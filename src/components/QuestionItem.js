import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedValue, setSelectedValue] = useState(correctIndex.toString());

  const options = answers.map((answer, index) => (
    <option key={index} value={index.toString()}>
      {answer}
    </option>
  ));

  function handleChangeCorrectAnswer(event) {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onUpdateQuestion(id, newValue);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          value={selectedValue}
          onChange={handleChangeCorrectAnswer}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
