const NoData = (message ) => {

    const text =message.children? message.children : "No data available";
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM21 17v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM12 12l4 4m0-4l-4 4"
        />
      </svg>
      <p className="text-gray-500 text-md">{text}</p>
    </div>
  );
};

export default NoData;
