import React, { useState } from "react";

const reasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading Information",
  "Spam or Promotional Content",
  "Sensitive Content",
  "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) return alert("Please select a reason.");
    onSubmit({ reason, details });
    setReason("");
    setDetails("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-base-100 text-base-content p-6 rounded-2xl w-full max-w-sm shadow-2xl relative border border-base-300 transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4">Report Lesson</h3>

        <form onSubmit={handleSubmit}>
          {/* Reason Dropdown */}
          <select
            className="select select-bordered w-full mb-4 bg-base-200 text-base-content focus:select-error"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Details */}
          <textarea
            className="textarea textarea-bordered w-full mb-4 bg-base-200 text-base-content focus:textarea-error resize-none"
            rows={4}
            placeholder="More details (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:bg-base-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-error px-6 text-white"
            >
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
