
export default function CardWraper(element){
    return(
      
         <div className="relative bg-white rounded-[8px] p-5 mt-5"> {element.children}</div>
      
    )
}