type CardProps = {
  e: {
    id: number,
    name: string,
    prompt_user: string,
    img: [],
  }
}

const Card: React.FC<CardProps> = ({ e }) => (
  <div className="group bg-slate-300 relative mx-auto mt-[50px] md:w-[500px] p-4 w-full rounded-md overflow-hidden shadow-lg">
    <div className="flex flex-col gap-4">
      <div className="h-[500px] overflow-y-scroll">
        {e.img.map((x: any, index: any) => (
          <div key={index} className="">
            <img src={x.url} alt={`image for prompt ${e.prompt_user}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
      <div className="w-full hidden group-hover:flex flex-col absolute bottom-0 left-0 bg-[#10131f] text-white p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt mb-[30px]">{e.prompt_user}</p>
        <div className="flex items-center gap-2 relative">
          <div className="w-7 h-7 p-[18px] rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{e.name}</div>
          <p className="text-white text-sm">{e.name}</p>
        </div>
      </div>
    </div>
  </div>
)


export default Card