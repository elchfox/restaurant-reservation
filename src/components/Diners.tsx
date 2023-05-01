import { useEffect } from "react";

interface Props {
  onSelect: (time: number) => void;
  value?: number;
  data:number[]
}

const Diners = ({ onSelect, value ,data = []}: Props) => {
  const scrollTo = () => {
    const element: any = document.getElementById("scroll-to");
    element?.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  };
  useEffect(() => {
    scrollTo();
  }, []);
  return (
    <div className="select-option">
      {data.map((number) => (
        <div
          className={`select-style ${value === number ? "active" : ""}`}
          onClick={() => onSelect && onSelect(number)}
          id={value === number ? "scroll-to" : undefined}
        >
          {`${number} Diners`}
        </div>
      ))}
    </div>
  );
};

export default Diners;
