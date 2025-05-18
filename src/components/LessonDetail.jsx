import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Card, Typography, Spin, Divider, Radio, Button, Space, Result } from 'antd';
import ReactPlayer from 'react-player';

const { Title, Paragraph } = Typography;

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setLesson(data);
        // Initialize selectedAnswers with empty values for each question
        if (data.quiz) {
          const initialAnswers = {};
          data.quiz.forEach((_, index) => {
            initialAnswers[index] = null;
          });
          setSelectedAnswers(initialAnswers);
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    console.log('Selected Answers:', selectedAnswers);
    console.log('Quiz Data:', lesson.quiz);
    
    lesson.quiz.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const correctAnswer = question.answer;
      // Add 1 to selectedAnswer to match the 1-based indexing of correctAnswer
      const adjustedSelectedAnswer = selectedAnswer + 1;
      console.log(`Question ${index + 1}:`, {
        selected: selectedAnswer,
        adjustedSelected: adjustedSelectedAnswer,
        correct: correctAnswer,
        isCorrect: adjustedSelectedAnswer === correctAnswer
      });
      
      if (adjustedSelectedAnswer === correctAnswer) {
        correctAnswers++;
      }
    });
    
    console.log('Final Score:', correctAnswers);
    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-5">
        <Title level={2}>Lesson not found</Title>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button 
        onClick={() => navigate(-1)} 
        className="mb-4"
        icon={<span>←</span>}
      >
        Quay lại
      </Button>
      <Card className="shadow-lg rounded-lg">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{lesson.lesson_title}</h1>
            <div className="h-px bg-gray-200 my-6"></div>
          </div>
          
          {lesson.lesson_resources && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Video Lesson</h2>
              <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100">
                <ReactPlayer
                  url={lesson.lesson_resources}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  controls
                />
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lesson Content</h2>
            <div className="prose max-w-none text-gray-600">
              {lesson.lesson_content}
            </div>
          </div>

          <div className="h-px bg-gray-200 my-6"></div>
          
          <div className="text-gray-600">
            Duration: {lesson.duration} minutes
          </div>

          {lesson.quiz && (
            <>
              <div className="h-px bg-gray-200 my-6"></div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
                {!quizSubmitted ? (
                  <div className="space-y-6">
                    {lesson.quiz.map((question, questionIndex) => (
                      <div key={questionIndex} className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {questionIndex + 1}. {question.question}
                        </h3>
                        <Radio.Group
                          onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                          value={selectedAnswers[questionIndex]}
                          className="w-full"
                        >
                          <div className="space-y-3">
                            {question.options.map((option, optionIndex) => (
                              <Radio 
                                key={optionIndex} 
                                value={optionIndex}
                                className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <span className="text-gray-700">{option}</span>
                              </Radio>
                            ))}
                          </div>
                        </Radio.Group>
                      </div>
                    ))}
                    <Button 
                      type="primary" 
                      onClick={handleSubmitQuiz} 
                      size="large"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Submit Quiz
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 shadow-md text-center">
                    <Result
                      status="success"
                      title={`Your Score: ${score}/${lesson.quiz.length}`}
                      subTitle={`You got ${Math.round((score / lesson.quiz.length) * 100)}% of the questions correct!`}
                      extra={[
                        <Button 
                          type="primary" 
                          key="retry" 
                          onClick={handleResetQuiz}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                          Try Again
                        </Button>
                      ]}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LessonDetail; 