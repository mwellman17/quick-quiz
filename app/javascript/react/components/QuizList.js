import React, { useState, useEffect } from 'react'
import QuizTile from "./QuizTile";

export default function QuizList (props) {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(() => {
        fetch(`/api/v1/quizzes`, { credentials: 'same-origin' })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let errorMessage = `${response.status} (${response.statusText})`,
                        error = new Error(errorMessage);
                    throw(error);
                }
            })
            .then(response => {
                return response.json();
            })
            .then(body => {
                setQuizzes(body["quizzes"]);
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, []);

    const renderQuizzes = () => {
        if (!quizzes) return <p>loading...</p>;
        else {
            return quizzes.map(quiz => { return <QuizTile key={quiz.id} quiz={quiz}/> })
        }
    };

    return(
        <div id="quiz-list">
            <div>
                <h3>My Quizzes</h3>
                {renderQuizzes()}
            </div>
            <div>
                <h3>Create a New Quiz</h3>
            </div>
        </div>
    )
}
