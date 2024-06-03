import { useState } from "react";
import "./App.css";
import questionsData from "./data";
// import VLibras from "@djpfs/react-vlibras";
import { useSpeechSynthesis } from "react-speech-kit";
import AccessibilityPanel from "./Components/AccessibilityPanel";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  AccessibilityProvider,
  useAccessibility,
} from "./Contexts/AccessibilityContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Quiz = () => {
    const {accessibilitySettings} = useAccessibility();

    const [currentQ, setCurrentQ] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const question = questionsData[currentQ];
    const totalQuestions = questionsData.length;
    const percent = ((currentQ + 1) / totalQuestions) * 100;
    const { speak } = useSpeechSynthesis();
    const [showModal, setShowModal] = useState(true);
    const [result, setResult] = useState(0);
    const [lastTextTalk, setLastTextTalk] = useState("");

    const handleTalk = (text) => {
      if (accessibilitySettings?.talkBack && text !== lastTextTalk) speak({ text: text });
      setLastTextTalk(text)
    };

    const handleDoubleClick = (answerIndex) => {
      if (selectedOption !== null) return;
      setSelectedOption(answerIndex);
      validateQuestion(answerIndex);
    };

    const handleNextQuestion = () => {
      if (selectedOption === null) return;
      if (currentQ + 1 < totalQuestions) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    };

    const reset = () => {
      setCurrentQ(0);
      setSelectedOption(null);
      setResult(0);
      setQuizFinished(false);
    };

    const validateQuestion = (selectedOption) => {
      if (question.correctQuestion - 1 === selectedOption) {
        setCorrectOption(true);
        setResult(result + 1);
        toast.success("Resposta Correta!");
        handleTalk("Resposta Correta!");
      } else {
        setCorrectOption(false);
        toast.error("Resposta Incorreta!");
        handleTalk("Resposta Incorreta!");
      }
    };

    const toggleModalInicial = () => {
      setShowModal(!showModal);
    };

    const ModalInicial = () => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            
          >
            <p tabIndex={0} onClick={() => handleTalk(`Bem-vindo ao nosso quiz sobre inclusão`)}>Bem-vindo ao nosso quiz sobre inclusão!</p>
            <br />
            <p tabIndex={0} onClick={() => handleTalk(`Estamos muito felizes por você estar aqui para explorar este tema
              tão importante.`)}>
              Estamos muito felizes por você estar aqui para explorar este tema
              tão importante.
            </p>
            <br />
            <p tabIndex={0} onClick={() => handleTalk(`Neste quiz, você terá a oportunidade de aprender mais sobre
              inclusão, diversidade e como podemos criar um mundo mais justo e
              igualitário para todos.`)}>
              Neste quiz, você terá a oportunidade de aprender mais sobre
              inclusão, diversidade e como podemos criar um mundo mais justo e
              igualitário para todos.
            </p>
            <br />
            <p tabIndex={0} onClick={() => handleTalk(`Esperamos que você aproveite esta experiência e que ela enriqueça
              seu conhecimento e compreensão sobre a inclusão. Boa sorte
              e divirta-se!`)}>
              Esperamos que você aproveite esta experiência e que ela enriqueça
              seu conhecimento e compreensão sobre a inclusão. Boa sorte
              e divirta-se!
            </p>
            <br />
           <p tabIndex={0} onClick={() => handleTalk(`Instrução: Para selecionar uma resposta, ou acionar algum botão é necessário clicar duas vezes na opção desejada.`)}><strong>Instrução:</strong> Para selecionar uma resposta, ou acionar algum botão é necessário clicar duas vezes na opção desejada.</p>
          <p onClick={() => handleTalk(`Instrução por voz: ${accessibilitySettings?.talkBack ? 'Ativada' : 'Desativada'}`)}><strong>Instrução por voz:</strong><strong style={{color: accessibilitySettings?.talkBack ? 'green': 'red'}}> {accessibilitySettings?.talkBack ? 'Ativada' : 'Desativada'}</strong></p>
          </div>
          <button
            tabIndex={0}
            style={{ width: "fit-content" }}
            className="btn next"
            onClick={() => handleTalk("Iniciar Quiz")}
            onDoubleClick={toggleModalInicial}
          >
            Iniciar Quiz
          </button>
        </div>
      );
    };

    const [quizFinished, setQuizFinished] = useState(false);

    const Summary = () => {
      let summaryMessage = "";

      const accuracy = (result / totalQuestions) * 100;
      if (accuracy === 100) {
        summaryMessage =
          "Parabéns! Você alcançou um entendimento incrível sobre o tema da inclusão. É admirável o esforço que você fez para aprender e entender o valor do respeito, aceitação e reconhecimento das diferenças. Com este exemplo de empatia e compaixão, você continuará a inundar a comunidade ao seu redor!";
      } else if (accuracy <= 30) {
        summaryMessage =
          "Não se sinta desencorajado! O mais importante é aprender e entender melhor o conceito de inclusão ao longo do processo. Com esforço e dedicação, você pode aprender a criar um ambiente mais acolhedor e inclusivo para todos. Lembre-se sempre da importância de respeitar e apoiar diferenças. Continue aprendendo!";
      } else if (accuracy <= 60) {
        summaryMessage =
          "Bom trabalho! Você tem uma compreensão decente dos conceitos de inclusão, mas nunca é demais aprender mais. Continue aprendendo e praticando a empatia em suas interações diárias. Com esforço e comprometimento, você pode se tornar um(a) promissor(a) agente de transformação em sua comunidade.";
      } else if (accuracy <= 90) {
        summaryMessage =
          "Você foi muito bem! Sua compreensão sobre a importância da inclusão é bastante forte. Continue se educando e praticando o respeito e aceitando as diferenças. Sua atitude e vontade de olhar para a frente fazem de você alguém que pode mudar o mundo em um lugar mais inclusivo para todos.";
      }

      return (
        <div>
          <h2 onClick={() => handleTalk('Resumo do Quiz')}>Resumo do Quiz</h2>
          <p onClick={() => handleTalk(summaryMessage)}>{summaryMessage}</p>
          <br />
          <p onClick={() => handleTalk(`Você acertou ${result} de ${totalQuestions} perguntas.`)}>
            Você acertou {result} de {totalQuestions} perguntas.
          </p>
          <br />
          <button className="btn reset" onClick={() => handleTalk('recomeçar')} onDoubleClick={reset}>
            Recomeçar
          </button>
        </div>
      );
    };

    return (
      <main>
        <header onClick={() => handleTalk("Quiz - Inclusão")}>
          <span tabIndex={0}>Quiz - Inclusão</span>
        </header>
        <div id="quiz">
          {showModal ? (
            <ModalInicial />
          ) : quizFinished ? (
            <Summary />
          ) : (
            <>
              <ProgressBar
                completed={percent}
                bgColor="#3789f9"
                baseBgColor="#ececec"
                labelColor="#FFFFFF"
              />
              <div
                id="question"
                onClick={() =>
                  handleTalk(
                    "Número de questão" +
                      (currentQ + 1) +
                      "," +
                      question.question
                  )
                }
              >
                <div id="circle">
                  <span>{currentQ + 1 + "/" + totalQuestions}</span>
                </div>
                <p
                  tabIndex={0}
                  onClick={() => handleTalk(question.question)}
                  id="p-question"
                >
                  {question.question}
                </p>
              </div>
              <div id="list">
                {question.options.map((option, index) => (
                  <p
                    tabIndex={0}
                    onClick={() => handleTalk(option)}
                    onDoubleClick={() => handleDoubleClick(index)}
                    key={index}
                    className={`question-options ${
                      selectedOption !== null && selectedOption == index
                        ? correctOption
                          ? " correct-answer"
                          : " incorrect-answer"
                        : ""
                    }`}
                  >
                    {option}
                  </p>
                ))}
              </div>
              <br />
              <div id="actions">
                <button
                  className="btn reset"
                  onClick={() => handleTalk("recomeçar")}
                  onDoubleClick={reset}
                >
                  Recomeçar
                </button>
                <button
                  className="btn next"
                  onClick={() => handleTalk("próxima questão")}
                  onDoubleClick={handleNextQuestion}
                >
                  Próxima Questão
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    );
  };

  return (
    <>
      {/* <VLibras /> */}
      <AccessibilityProvider>
        <AccessibilityPanel>
          <Quiz />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </AccessibilityPanel>
      </AccessibilityProvider>
    </>
  );
}

export default App;
