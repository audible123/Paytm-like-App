export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-[#fea5a5] hover:bg-[#f36b6b] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm lg:px-4 lg:py-2.5 xs:px-1 xs:py-1.5 xs:mt-1 xs:text-xs "
    >
      {label}
    </button>
  );
}
