interface QuestionProps {
  question: string
  description: string
}

const Question = ({ question, description }: QuestionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-bold">{question}</h3>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  )
}

export default Question
