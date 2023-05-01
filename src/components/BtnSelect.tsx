import { CiUser } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

import "react-calendar/dist/Calendar.css";
import { ReactNode } from "react";

interface Props {
  id?:string | number
  text: string;
  icon: ReactNode;
  isActive?: Boolean;
  onSelect?: (id: string | number) => void;
}

interface Table {
  id: string;
  tableSize: number;
}

const BtnSelect = ({ icon, text, isActive, onSelect,id = 0 }: Props) => {
  return (
    <button
      className={`btn-select ${isActive ? "active" : ""}`}
      onClick={()=> onSelect && onSelect(id)}
    >
      <div className="btn-arrow">
        <MdKeyboardArrowDown />
      </div>
      {icon}
      {text}
    </button>
  );
};

export default BtnSelect;
