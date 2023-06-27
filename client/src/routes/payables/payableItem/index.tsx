type PayableItemProps = {
    id: string;
    value: number;
    emissionDate: string
}

export const PayableItem = ({ id, value, emissionDate }:PayableItemProps) => {
    return (
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{id}</h3>
          <span className="text-gray-500">{emissionDate}</span>
        </div>
        <p className="text-gray-700">Value: {value}</p>
      </div>
    );
  };