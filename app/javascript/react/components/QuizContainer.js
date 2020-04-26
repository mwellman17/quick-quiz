import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QuestionTile from "./QuestionTile";

export default function QuizContainer (props) {
    const [loaded, setLoaded] = useState(false);
    const [quiz, setQuiz] = useState({});
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [picks, setPicks] = useState({});
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
                setUser(body["user"]);
                setQuestions(body["questions"]);
                setLoaded(true);
            })
            .catch(error => setError(`Error in fetch: ${error.message}`))
    }, []);

    useEffect(() => {
        if (loaded && Object.keys(picks).length === questions.length) {
            submitResults()
        }
    }, [picks]);

    const handlePoints = (points, guesses) => {
        let newTotal = totalPoints + points;
        const newPicks = Object.assign({}, picks, guesses);
        setPicks(newPicks);
        setTotalPoints(newTotal);
    };

    const submitResults = () => {
        const payload = {
            totalPoints,
            picks,
            user,
            quizId: quiz.id
        };
        fetch(`/api/v1/results`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let errorMessage = `${response.status} (${response.statusText})`,
                        error = new Error(errorMessage);
                    throw(error);
                }
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) console.log(body.success);
                if (body.error) console.log(body.error)
            })
            .catch(error => {
                console.error(`Error in fetch: ${error.message}`)
            });
    };

    const renderScore = (position) => {
        const maxPoints = questions.length * 10;
        return <div className={`total-score ${position}`}>{`Total Score: ${totalPoints}/${maxPoints}`}</div>
    };

    const renderQuiz = () => {
        if (error) return <p>{error}</p>;
        else if (!loaded) return <p>Loading...</p>;
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
