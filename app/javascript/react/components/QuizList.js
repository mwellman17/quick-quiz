import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

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
            return quizzes.map(quiz => {
                let linkName = quiz.name.replace(/(\s+|\/+)/g, '');

                return (
                    <div>
                        <p key={quiz.id}>{quiz.name}</p>
                        <Link to={`/quizzes/${quiz.id}=:${linkName}`}>take</Link>
                    </div>

                )
            })
        }
    }

    return(
        <div>
            <h1>Quizzes</h1>
            {renderQuizzes()}
        </div>
    )
}
