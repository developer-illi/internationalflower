interface InformationProps {
  information: string
}

const Information = ({ information }: InformationProps) => {
  return (
    <h3 className="w-full text-center text-2xl font-bold">{information}</h3>
  )
}

export default Information
