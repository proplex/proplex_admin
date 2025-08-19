import { postOrderTime } from "@/store/features/orderDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
// import { postOrderTime } from "@/store/orderDetailsSlice"; // Ensure this is your correct import path

export const PaymentDeadline = ({ isOpen, onClose }: any) => {
  const { id } = useParams(); // Retrieve the order ID from the URL
  const { orderDetail, loading } = useAppSelector((state) => state.orderDetails);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the values from the form
    const day = (e.target as any).day.value;
    const hours = (e.target as any).hours.value;
    const minutes = (e.target as any).minutes.value;
    const seconds = (e.target as any).seconds.value;
    const investment_deadline_time = `${day}:${hours}:${minutes}:${seconds}`;


    // Dispatch the postOrderTime action with the collected data
    dispatch(postOrderTime({ order_id: id, investment_deadline_time }));

    onClose(); // Close the dialog after submitting
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/40 animate-fadeIn" />
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-scaleIn"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Securing Payment Deadline</h3>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {/* Day Input */}
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
                Day *
              </label>
              <input
                id="day"
                name="day"
                type="number"
                placeholder="0"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>
            {/* Hours Input */}
            <div>
              <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                Hours *
              </label>
              <input
                id="hours"
                name="hours"
                type="number"
                placeholder="0"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>
            {/* Minutes Input */}
            <div>
              <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
                Minutes *
              </label>
              <input
                id="minutes"
                name="minutes"
                type="number"
                placeholder="0"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>
            {/* Seconds Input */}
            <div>
              <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">
                Seconds *
              </label>
              <input
                id="seconds"
                name="seconds"
                type="number"
                placeholder="0"
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
