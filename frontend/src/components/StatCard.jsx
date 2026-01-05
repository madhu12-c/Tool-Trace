const StatCard = ({ title, value, onClick }) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm border ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`} onClick={onClick}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
