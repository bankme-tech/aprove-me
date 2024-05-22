import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  value: number;
  setValue: (value: number) => void
  page: number;
  nextPage: () => void;
  previousPage: () => void;
}

export default function Pagination(props: Props) {
  return (
    <div className="bg-slate-400 bg-opacity-20 px-3 py-1 rounded-xl text-sm justify-between flex">
      <div className="flex gap-1 items-center">
        <p>Linhas por página:</p>
        <select
          name="rows"
          id="rows"
          className="p-1 rounded border border-borderColor"
          value={props.value}
          onChange={(e) => props.setValue(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className='flex items-center'>
        <button className="p-1 rounded-full hover:bg-themeColor hover:bg-opacity-40 hover:text-themeColor"
          onClick={props.previousPage}
        >
          <MdKeyboardArrowLeft size={24} />
        </button>
        <span className="p-1">{props.page+1}</span>
        <button className="p-1 rounded-full hover:bg-themeColor hover:bg-opacity-40 hover:text-themeColor"
          onClick={props.nextPage}
        >
          <MdKeyboardArrowRight size={24} />
        </button>
      </div>

    </div>
  )
}