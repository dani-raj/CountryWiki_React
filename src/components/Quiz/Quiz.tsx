import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/api";
import type { Country } from "../../types/Country";
import styles from "./QuizPage.module.css";
import Loading from "./../LoadingBar/LoadingBar";

function QuizPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [quizCountries, setQuizCountries] = useState<Country[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getAllCountries();
      setCountries(data);
      startGame(data);
    };
    load();
  }, []);

  const startGame = (all: Country[]) => {
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizCountries(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setTimeLeft(10);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = quizCountries[currentIndex];
    if (answer.trim().toLowerCase() === current.name.common.toLowerCase()) {
      setScore((s) => s + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizCountries.length) {
      setCurrentIndex((i) => i + 1);
      setAnswer("");
      setTimeLeft(10);
    } else {
      setGameOver(true);
    }
  };

  if (!quizCountries.length) return <Loading />;

  if (gameOver) {
    return (
      <div className={styles.wrapper}>
        <h1>Game Over!</h1>
        <p>
          Your score: {score}/{quizCountries.length}
        </p>
        <button onClick={() => startGame(countries)}>Restart Game</button>
      </div>
    );
  }

  const current = quizCountries[currentIndex];

  return (
    <div className={styles.wrapper}>
      <h1>Flag Quiz</h1>
      <p>
        Question {currentIndex + 1}/{quizCountries.length}
      </p>
      <p>Time left: {timeLeft}s</p>

      <div className={styles.flagContainer}>
        <img
          src={current.flags.png}
          alt={current.flags.alt || current.name.common}
          className={styles.flag}
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter country name..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" className={styles.skipBtn} onClick={handleNext}>
          Skip
        </button>
      </form>

      <p>Score: {score}</p>
    </div>
  );
}

export default QuizPage;
