import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QuestionTile from "./QuestionTile";

export default function QuizContainer (props) {
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`/api/v1/quizzes/${params.id}`, { credentials: 'same-origin' })
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
                setError(body.error);
                setQuiz(body["quiz"]);
                setQuestions(body["questions"]);
            })
            .catch(error => setError(`Error in fetch: ${error.message}`))
    }, []);

    const handlePoints = (points) => {
        let newTotal = totalPoints + points;
        setTotalPoints(newTotal)
    };

    const renderScore = (position) => {
        const maxPoints = questions.length * 10;
        if (totalPoints !== 0) {
            return <div className={`total-score ${position}`}>{`Total Score: ${totalPoints}/${maxPoints}`}</div>
        }
    };

    const renderQuiz = () => {
        if (error) return <p>{error}</p>;
        else if (!quiz || !questions) return <p>Loading...</p>;
        else {
            let count = 0;
            let renderQuestions = questions.map(question => {
                count ++;
                return <QuestionTile key={count} question={question} feedPoints={handlePoints}/>
            });
            return (
                <div>
                    <h3>{quiz.name}</h3>
                    {renderScore('top')}
                    {renderQuestions}
                    {renderScore('bottom')}
                </div>
            )
        }
    };
    return(
        <div id="main-content">
            {renderQuiz()}
        </div>
    )
}
