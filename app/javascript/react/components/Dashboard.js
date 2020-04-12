import React, { useState } from 'react'
import QuizList from "./QuizList";
import NewQuizForm from "./NewQuizForm"

export default function Dashboard (props) {
    const [showForm, setShowForm] = useState(false);
    const [editQuiz, setEditQuiz] = useState(null);

    const handleEdit = (id) => {
        setEditQuiz(id);
        setShowForm(true)
    };
    const handleCreate = () => {
        setShowForm(true)
    };

    const closeForm = () => {
        setShowForm(false);
        setEditQuiz(null)
    };

    const renderDashboard = () => {
        if (!showForm) return <QuizList handleEdit={handleEdit} handleCreate={handleCreate}/>;
        else return <NewQuizForm editPath={editQuiz} onClose={closeForm}/>
    };

    return(
        <div id="dashboard">
            {renderDashboard()}
        </div>
    )
}
