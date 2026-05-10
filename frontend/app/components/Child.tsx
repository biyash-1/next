const Child = ({ setColor }: { setColor: (val: string) => void }) => {
  return (
    <input
      type="text"
      className="border rounded-2xl"
      onChange={(e) => setColor(e.target.value)}
    />
  )
}

export default Child