quiz = Quiz.create!({ name: "IRAT/GRAT – E011 Respiratory Distress 2020" })

question_one = Question.create!({
    number: 1,
    text: "Two year old on November 1st develops cough and low grade fever for 3 days. On the 3rd to 4th day presents with worsening cough, tachypnea, retractions, diffuse rhonchi, wheeze, and prolongation of the expiratory phase of respiration without fever. What is the most likely diagnosis?",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "Anaphylaxis",
    question: question_one
})

Answer.create!({
    letter: "b",
    text: "Asthma",
    question: question_one
})

Answer.create!({
    letter: "c",
    text: "Foreign body aspiration",
    question: question_one
})

Answer.create!({
    letter: "d",
    text: "Viral or Atypical Pneumonia",
    question: question_one
})

Answer.create!({
    letter: "e",
    text: "Bronchiolitis",
    question: question_one,
    correct_answer: true
})

question_two = Question.create!({
    number: 2,
    text: "Five year old on November 1st develops cough and low grade fever for 2 days along with reasonable oral intake and activity. On the 3rd day presents with worsening cough, tachypnea, mild scattered wheeze and diffuse rales (crackles). What is the most likely diagnosis?",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "Asthma",
    question: question_two
})

Answer.create!({
    letter: "b",
    text: "Bacterial Pneumonia",
    question: question_two
})

Answer.create!({
    letter: "c",
    text: "Viral or Atypical Pneumonia",
    question: question_two,
    correct_answer: true
})

Answer.create!({
    letter: "d",
    text: "Foreign body aspiration",
    question: question_two
})

Answer.create!({
    letter: "e",
    text: "Anaphylaxis",
    question: question_two
})

question_three = Question.create!({
    number: 3,
    text: "3 year old child acutely develops slightly muffled voice, cough, a harsh inspiratory noise, diffuse wheeze, retractions, and nasal flaring. What is the most likely diagnosis?",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "Foreign body in the lower trachea or high in the right main stem bronchus",
    question: question_three
})

Answer.create!({
    letter: "b",
    text: "Foreign body in the extra-thoracic trachea",
    question: question_three
})

Answer.create!({
    letter: "c",
    text: "Anaphylaxis",
    question: question_three,
    correct_answer: true
})

Answer.create!({
    letter: "d",
    text: "Croup",
    question: question_three
})

Answer.create!({
    letter: "e",
    text: "Bronchiolitis",
    question: question_three
})

question_four = Question.create!({
    number: 4,
    text: "Previously well 3 year old child develops severe coughing in the morning for about 15 minutes. This resolves and the child seems fine till evening when she develops increase in cough, and diffuse wheezing. Here is her PA CXR –",
    quiz: quiz,
    image_url: "/PA_CXR.jpg"
})

Answer.create!({
    letter: "a",
    text: "Left sided foreign body",
    question: question_four,
    correct_answer: true
})

Answer.create!({
    letter: "b",
    text: "Right sided foreign body",
    question: question_four
})

Answer.create!({
    letter: "c",
    text: "Pneumothorax",
    question: question_four
})

Answer.create!({
    letter: "d",
    text: "Asthma",
    question: question_four
})

Answer.create!({
    letter: "e",
    text: "Pneumonia",
    question: question_four
})

question_five = Question.create!({
    number: 5,
    text: "Which is a sign of lower tract (below the glottis) disease? Choose the best answer.",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "Tachypnea without adventitious sounds or increase work of breathing",
    question: question_five
})

Answer.create!({
    letter: "b",
    text: "Rhonchi",
    question: question_five,
    correct_answer: true
})

Answer.create!({
    letter: "c",
    text: "Stertor (gargly noise)",
    question: question_five
})

Answer.create!({
    letter: "d",
    text: "Muffled voice",
    question: question_five
})

Answer.create!({
    letter: "e",
    text: "Drooling",
    question: question_five
})

question_six = Question.create!({
    number: 6,
    text: "Which of the following statements is true regarding a patient with a peanut in the right main stem bronchus?",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "No point in getting a CXR since peanuts are radio-lucent.",
    question: question_six
})

Answer.create!({
    letter: "b",
    text: "If the patient is little (18 months old) it is better to order lateral decubitus films than to order inspiratory and expiratory films.",
    question: question_six,
    correct_answer: true
})

Answer.create!({
    letter: "c",
    text: "If the patient gets better with an albuterol nebulizer that rules out foreign body.",
    question: question_six
})

Answer.create!({
    letter: "d",
    text: "Once diagnosed, it is a good idea to do the Heimlich maneuver in order to remove the foreign body",
    question: question_six
})

Answer.create!({
    letter: "e",
    text: "It would be unusual to have diffuse wheezing.",
    question: question_six
})

question_seven = Question.create!({
    number: 7,
    text: "3 year old child presents to the ED after a 4 day history of URI symptoms. Today he developed respiratory distress including grunting, flaring, and 2+ retractions. T 100.8, RR 40, P 160, BP 74/50, Pox 85% on RA. Lung exam shows good air exchange, and 2 plus rales diffusely. Abdominal exam is soft non-tender. Liver is 2 cm BCM. What is the most likely diagnosis?",
    quiz: quiz
})

Answer.create!({
    letter: "a",
    text: "Pneumonia (Viral or Atypical)",
    question: question_seven
})

Answer.create!({
    letter: "b",
    text: "Pneumonia (Bacterial)",
    question: question_seven
})

Answer.create!({
    letter: "c",
    text: "Viral Myocarditis",
    question: question_seven,
    correct_answer: true
})

Answer.create!({
    letter: "d",
    text: "Anaphylaxis",
    question: question_seven
})

Answer.create!({
    letter: "e",
    text: "Bronchiolitis",
    question: question_seven
})