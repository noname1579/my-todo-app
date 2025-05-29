
interface SpanProps {
  title: string,
  count: number,
  img?: string
}

const Span = ({title, count, img}: SpanProps) => {
  return ( 
    <>
      <div className="border-gray-700 border-opacity-10 rounded-xl bg-gray-700 pt-5 py-5 md:py-10 px-6">
        <div className="justify-between flex">
          <h2 className="text-xl text-gray-400">{title}</h2>
          <img src={img} alt="" />
        </div>
        <h1 className="mt-3 md:mt-5 text-2xl text-white font-bold">{count}</h1>
      </div>
    </>
  )
}
 
export default Span