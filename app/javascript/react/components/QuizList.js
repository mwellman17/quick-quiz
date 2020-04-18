import React from 'react'
import QuizTile from "./QuizTile";

export default function QuizList (props) {
    const { handleEdit, handleCreate, quizzes } = props;

    const renderQuizzes = () => {
        if (!quizzes) return <p>loading...</p>;
        else {
            return quizzes.map(quiz => {
                return <QuizTile key={quiz.id} quiz={quiz} handleEdit={handleEdit}/>
            })
        }
    };

    return(
        <div id="quiz-list">
            <button className="button" onClick={handleCreate} className="create-button">Create</button>
            <h3>Dashboard</h3>
            {renderQuizzes()}
        </div>
    )
}
