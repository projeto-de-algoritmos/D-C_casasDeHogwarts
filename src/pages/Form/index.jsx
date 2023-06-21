import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Slider from "react-rangeslider";

import { matchhouse } from "../../services/matchHouse";

import "./styles.css";

export function Form() {
  const [questions] = useState([
    {
      id: 1,
      label: "Seu nível de companheirismo",
    },
    {
      id: 2,
      label: "Seu nível corajoso",
    },
    {
      id: 3,
      label: "Seu nível de ambição?",
    },
    {
      id: 4,
      label: "Seu nível de determinação",
    },
    {
      id: 5,
      label: "Seu nível de criatividade",
    },
    {
      id: 6,
      label: "Seu nível de curiosidade",
    },
    {
      id: 7,
      label: "Seu nível de paciência",
    },
    {
      id: 8,
      label: "Seu nível de honestidade",
    },
    {
      id: 9,
      label: "Seu nível de astucia",
    },
    {
      id: 10,
      label: "Seu nível de ousadia",
    },
  ]);
  const [answers, setAnswers] = useState([
    {
      id: 1,
      label: "Lealdade",
      priority: 5,
    },
    {
      id: 2,
      label: "Coragem",
      priority: 5,
    },
    {
      id: 3,
      label: "Ambição",
      priority: 5,
    },
    {
      id: 4,
      label: "Determinação",
      priority: 5,
    },
    {
      id: 5,
      label: "Criatividade",
      priority: 5,
    },
    {
      id: 6,
      label: "Curiosidade",
      priority: 5,
    },
    {
      id: 7,
      label: "Paciência",
      priority: 5,
    },
    {
      id: 8,
      label: "Honestidade",
      priority: 5,
    },
    {
      id: 9,
      label: "Astucia",
      priority: 5,
    },
    {
      id: 10,
      label: "Ousadia",
      priority: 5,
    },
  ]);
  const [priorityList, setPriorityList] = useState([1, 2, 3, 4]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [house, sethouse] = useState(null);

  function handleSubmit() {
    const match = matchhouse(priorityList);

    if (match) {
      sethouse(match);
    }

    setIsModalOpen(true);
  }

  useEffect(() => {
    const orderedAnswers = answers.sort((a, b) => b.priority - a.priority);
    const updatedAnswers = orderedAnswers.reduce((acc, item) => {
      return [...acc, item.id];
    }, []);

    setPriorityList(updatedAnswers);
  }, [answers]);

  // useEffect(() => console.log(priorityList), [priorityList]);

  return (
    <div className="form-page">
      <div className="background"><img src="./img/hogwarts.png"/></div>
  
      <h1
        style={{
          fontSize: "3.5rem",
          color: "purple",
          textAlign: "center",
        }}
      >
        <strong>Ciro & Carlin seletores</strong>
      </h1>
      <p
        style={{
          width: "50%",
          maxWidth: 550,
          textAlign: "center",
        }}
      >
       <p className="texto"> <strong>O chapéu seletor de Hogwarts foi de arrasta pra cima (F), para que Hogwarts continue em pleno funcionamento enquanto não é criado outro chapéu,
      Dumbledore ordenou os trouxas Carlos Eduardo e Ciro a fazerem a sepração de casas dos novos Bruxos.</strong></p>
        
        
        <p className="texto"><strong>Atribua um valor de 0 a 10 para cada premissa abaixo de acordo com suas
        características pessoais, sendo 0 para mínimo e 10 para máximo.</strong></p>
      </p>
      <div className="questions-list">
        {questions.map((question) => {
          const answer = answers.find((item) => item.id === question.id);

          return (
            <div key={question.id} className="question-item">
              <b>
                {question.id} - {question.label}
              </b>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: 0,
                    marginRight: "0.8rem",
                  }}
                >
                  0
                </p>
                <Slider
                  min={0}
                  max={10}
                  value={answer.priority}
                  onChange={(value) => {
                    const updatedAnswers = answers.reduce((acc, item) => {
                      if (item.id === question.id) {
                        return [
                          ...acc,
                          {
                            ...item,
                            priority: value,
                          },
                        ];
                      }

                      return [...acc, item];
                    }, []);

                    setAnswers(updatedAnswers);
                  }}
                />
                <p
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: 0,
                    marginLeft: "0.8rem",
                  }}
                >
                  10
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="submit-btn"
        style={{
          backgroundColor: "purple",
          width: "85%",
        }}
        onClick={() => handleSubmit()}
      >
        VER MINHA CASA
      </button>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Sua casa em Hogwarts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {house ? (
            <div className="modal-body-container">
              <img src={house.img} alt={house.name} />
              <div>
                <h2>{house.name}</h2>
    
              </div>
            </div>
          ) : (
            <h1></h1>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer-container">
            <button
              style={{ backgroundColor: "purple", color: "white" }}
              onClick={() => setIsModalOpen(false)}
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
