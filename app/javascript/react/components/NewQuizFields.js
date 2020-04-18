import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import _ from 'lodash';
import { blankQuestion, letters } from "../../utils/utils";

export default function NewQuizFields (props) {
    const { data, setData } = props;

    const handleQuizChange = (event) => {
        let newData = _.cloneDeep(data);
        newData['quiz']['name'] = event.target.value;
        setData(newData)
    };

    const handleQuestionChange = (path) => (body) => {
        let newData = _.cloneDeep(data);
        let t = path.split('-');
        newData[t[0]][t[1]][t[2]] = body;
        setData(newData)
    };

    const handleAnswerChange = (event) => {
        let newData = _.cloneDeep(data);
        let t = event.target.id.split('-');
        newData[t[0]][t[1]][t[2]][t[3]][t[4]] = event.target.value;
        setData(newData)
    };

    const handleCheckboxChange = (event) => {
        let newData = _.cloneDeep(data);
        let t = event.target.id.split('-');
        let answers = newData[t[0]][t[1]][t[2]];
        answers.forEach(answer => { answer['correct_answer'] = false });
        answers[t[3]][t[4]] = event.target.checked;
        setData(newData)
    };

    const addQuestion = () => {
        let newData = _.cloneDeep(data);
        let newQuestion = _.cloneDeep(blankQuestion);
        newQuestion.number = newData.questions.length + 1;
        newData.questions.push(newQuestion);
        setData(newData)
    };

    const addAnswer = (index) => {
        let newData = _.cloneDeep(data);
        let answers = newData.questions[index].answers;
        let newAnswer = { correct_answer: false, text: "", letter: letters[answers.length] };
        answers.push(newAnswer);
        setData(newData)
    };

    const removeQuestion = (index) => {
        let newData = _.cloneDeep(data);
        newData.questions.splice(index, 1);
        newData.questions.forEach((question, index) =>{
            question.number = index + 1;
        });
        setData(newData)
    };

    const removeAnswer = (qInd, aInd) => {
        let newData = _.cloneDeep(data);
        newData.questions[qInd].answers.splice(aInd, 1);
        newData.questions[qInd].answers.forEach((answer, index) => {
           answer.letter = letters[index]
        });
        setData(newData)
    };

    const renderQuestions = () => {
        return data.questions.map((question, qInd) => {
            const answers = question.answers.map((answer, aInd) => {
                const answerPath = `questions-${qInd}-answers-${aInd}-text`;
                const correctPath = `questions-${qInd}-answers-${aInd}-correct_answer`;
                return (
                   <div key={qInd + aInd} className="answer-fields">
                       <div className="correct-checkbox">
                           <label htmlFor={correctPath}>correct answer:</label>
                           <input type="checkbox" id={correctPath} name={correctPath} value={answer.text}
                                  checked={answer['correct_answer']} onChange={handleCheckboxChange}/>
                       </div>
                       <i className="fas fa-minus-circle" onClick={() => removeAnswer(qInd, aInd)}/>
                       <label htmlFor={answerPath}>{answer.letter + ')'}</label>
                       <textarea id={answerPath} name={answerPath} rows="2"
                              value={answer.text} onChange={handleAnswerChange}/>
                   </div>
                )
            });
            const questionTextPath = `questions-${qInd}-text`;
            const questionImgPath = `questions-${qInd}-image_url`;
            return (
                <div key={qInd} className="question-fields">
                    <i className="fas fa-minus-circle" onClick={() => removeQuestion(qInd)}/>
                    <label htmlFor={questionTextPath}>{`Question ${question.number}:`}</label>
                    <Editor
                        id={questionTextPath}
                        initialValue={question.text}
                        apiKey="o2ftnbkoz7b7xluarbze8d7el732rp5gkbznylp1w37fxp17"
                        init={{
                            selector: `textarea#${questionTextPath}`,
                            browser_spellcheck: true,
                            menubar: false,
                            plugins: [
                                " advcode advlist anchor help",
                                " lists link media powerpaste preview",
                                " table wordcount"
                            ],
                            toolbar: 'undo redo | ' +
                                'bold italic underline forecolor backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'superscript subscript table'
                        }}
                        onEditorChange={handleQuestionChange(questionTextPath)}
                    />
                    <label htmlFor={questionImgPath}>Image URL</label>
                    <input type="text" name={questionImgPath} id={questionImgPath}
                           value={question["image_url"] ? question["image_url"] : ""}
                           onChange={handleQuestionChange} placeholder="optional"/>
                    {answers}
                    <button className="button" onClick={() => addAnswer(qInd)}>add answer</button>
                </div>
            )
        })
    };

    return (
        <div>
            <label htmlFor="quiz-name">Quiz Name</label>
            <input type="text" id="quiz-name" name="quiz-name" value={data.quiz.name} onChange={handleQuizChange}/>
            {renderQuestions()}
            <button className="button" onClick={addQuestion}>add question</button>
        </div>
    )
}