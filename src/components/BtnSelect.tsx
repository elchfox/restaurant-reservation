import { MdKeyboardArrowDown } from "react-icons/md";

import { ReactNode } from "react";
import "react-calendar/dist/Calendar.css";

interface Props {
  id?:string | number
  text: string;
  icon: ReactNode;
  isActive?: Boolean;
  onSelect?: (id: string | number) => void;
  color?:string
}
const BtnSelect = ({ icon, text, isActive, onSelect,id = 0 ,color = "#157dfc"}: Props) => {
  return (
    <button
      className={`btn-select ${isActive ? "active" : ""}`}
      style={{color,fontWeight:"bold"}}
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
