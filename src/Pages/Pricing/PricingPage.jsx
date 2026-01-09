import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PricingPage = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user = {}, isLoading, isError } = useQuery({
    queryKey: ['user', authUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/premium/${authUser.email}`);
      return res.data;
    },
    enabled: !!authUser?.email
  });

  if (!authUser)
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Please log in to see pricing.</p>;
  if (isLoading)
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Loading...</p>;
  if (isError)
    return <p className="text-center mt-20 text-red-500 dark:text-red-400">Failed to load user data.</p>;

  if (user?.isPremium) {
    return <p className="text-center mt-20 text-yellow-500 dark:text-yellow-400">🌟 You are already Premium!</p>;
  }

  const handleUpgrade = async () => {
    try {
      const res = await axiosSecure.post('/create-checkout-session', {
        userId: authUser._id,
        email: authUser.email
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Stripe checkout error:', err);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-base-200 min-h-screen rounded-xl transition-colors duration-300">
      <title>pricing</title>
      <h1 className="text-3xl font-bold text-center mb-6 text-base-content">
        Upgrade to Premium
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full border border-base-300 mb-6 text-base-content">
          {/* Header */}
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="border border-base-300 px-4 py-2">Feature</th>
              <th className="border border-base-300 px-4 py-2">Free</th>
              <th className="border border-base-300 px-4 py-2">Premium</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="bg-base-100">
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Number of Lessons</td>
              <td className="border border-base-300 px-4 py-2">8</td>
              <td className="border border-base-300 px-4 py-2 font-bold text-primary">Unlimited</td>
            </tr>
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Premium Lesson Creation</td>
              <td className="border border-base-300 px-4 py-2">❌</td>
              <td className="border border-base-300 px-4 py-2">✅</td>
            </tr>
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Ad-Free Experience</td>
              <td className="border border-base-300 px-4 py-2">❌</td>
              <td className="border border-base-300 px-4 py-2">✅</td>
            </tr>
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Priority Listing</td>
              <td className="border border-base-300 px-4 py-2">❌</td>
              <td className="border border-base-300 px-4 py-2">✅</td>
            </tr>
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Support</td>
              <td className="border border-base-300 px-4 py-2">Basic</td>
              <td className="border border-base-300 px-4 py-2">Priority</td>
            </tr>
            <tr>
              <td className="border border-base-300 px-4 py-2 font-medium">Access to Premium Resources</td>
              <td className="border border-base-300 px-4 py-2">❌</td>
              <td className="border border-base-300 px-4 py-2">✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleUpgrade}
          className="btn btn-primary btn-wide rounded-xl shadow-lg transition-transform active:scale-95"
        >
          Upgrade to Premium (৳1500)
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
