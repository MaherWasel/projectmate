export default function InfoCard({ message, count = 0, icon = "" }){
 return (<>
       <div className="flex justify-between items-center text-white p-4 rounded-lg w-full bg-lightGray p-4 rounded-lg shadow-md">
    <div>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-lg">{message}</p>
    </div>
  
    {/* Right Side: Icon */}
    <div className="bg-red-100 p-4 rounded-full flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm-8 8a8 8 0 1116 0H4z" />
      </svg>
    </div>
  </div>
 </>);
}