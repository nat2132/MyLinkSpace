import infoIcon from "../icons/quetionmark.png"

function SectionHeaderText(text) {
  const headText = text.children;

  return (
    <>
      <div className="flex items-center gap-1 font-semibold text-[#212529] text-[16px] md:text-[20px]">
        {headText} <span> <img src={infoIcon} alt="info" /></span>
      </div>
    </>
  );
}

export default SectionHeaderText;
