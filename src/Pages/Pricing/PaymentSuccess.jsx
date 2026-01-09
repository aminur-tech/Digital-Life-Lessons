import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .get(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setTx(res.data.transaction);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching payment details!");
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-base-content/70">
        Loading payment details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 bg-base-200 min-h-screen transition-colors duration-300">
      <title>payment Success</title>
      <h1 className="text-3xl font-bold text-success text-center">
        🎉 Payment Successful
      </h1>

      <p className="text-center mt-4 text-lg text-base-content/80">
        Your Premium Membership has been activated.
      </p>

      <div className="overflow-x-auto max-w-3xl mx-auto mt-10 bg-base-100 p-6 shadow-xl rounded-2xl border border-base-300">
        <h2 className="text-2xl font-bold mb-4 text-base-content">
          Payment Details
        </h2>

        <table className="table w-full border border-base-300 text-base-content">
          {/* Header */}
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="border-b border-base-300">Field</th>
              <th className="border-b border-base-300">Value</th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-base-200/50 transition-colors">
              <td className="border-b border-base-300 font-medium">Transaction ID</td>
              <td className="border-b border-base-300 font-mono text-sm opacity-70">{tx?.id}</td>
            </tr>

            <tr className="hover:bg-base-200/50 transition-colors">
              <td className="border-b border-base-300 font-medium">Amount</td>
              <td className="border-b border-base-300 text-success font-bold">${tx?.amount}</td>
            </tr>

            <tr className="hover:bg-base-200/50 transition-colors">
              <td className="border-b border-base-300 font-medium">Currency</td>
              <td className="border-b border-base-300 uppercase opacity-70">{tx?.currency}</td>
            </tr>

            <tr className="hover:bg-base-200/50 transition-colors">
              <td className="border-b border-base-300 font-medium">Paid At</td>
              <td className="border-b border-base-300 opacity-70">
                {new Date(tx?.paidAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center mt-8">
          <Link
            to="/"
            className="btn btn-primary px-8 rounded-full shadow-lg transition-transform active:scale-95"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
