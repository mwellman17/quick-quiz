import React, {useEffect, useState} from 'react'
import QuizList from "./QuizList";
import NewQuizForm from "./NewQuizForm"

export default function Dashboard (props) {
    const [quizzes, setQuizzes] = useState(null);
    const [user, setUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editQuiz, setEditQuiz] = useState(null);

    useEffect(() => {
       fetchQuizzes()
    }, []);

    const fetchQuizzes = () => {
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
                setUser(body['user']);
                setQuizzes(body["quizzes"]);
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`))
    };

    const handleEdit = (id) => {
        setEditQuiz(id);
        setShowForm(true)
    };
    const handleCreate = () => {
        setShowForm(true)
    };

    const closeForm = (body) => {
        setShowForm(false);
        setEditQuiz(null);
        fetchQuizzes()
    };

    const renderDashboard = () => {
        if (!showForm) return <QuizList quizzes={quizzes} handleEdit={handleEdit} handleCreate={handleCreate}/>;
        else return <NewQuizForm user={user} editPath={editQuiz} onClose={closeForm}/>
    };

    return(
        <div id="dashboard">
            {renderDashboard()}
        </div>
    )
}
