interface EmptyProps {
  message: string
}

const Empty = ({ message }: EmptyProps) => {
  return (
    <div className="flex justify-center items-center h-full py-40 text-muted-text">
      {message}
    </div>
  )
}

export default Empty
