import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosSecure.get("/reported-lessons");
        console.log(res.data);
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [axiosSecure]);

  if (loading)
    return (
      <p className="text-center py-10 text-base-content/70">
        Loading reports...
      </p>
    );

  if (reports.length === 0)
    return (
      <p className="text-center py-10 text-base-content/70">
        No reported lessons found.
      </p>
    );

  return (
    <div className="p-6 bg-base-200 dark:bg-base-300 min-h-screen text-base-content transition-colors">
      <title>Report | Digital Life Lessons</title>
      <h1 className="text-3xl font-bold mb-6 text-base-content dark:text-base-content">
        Reported Lessons
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-base-300 dark:border-base-600 rounded-lg">
          <thead className="bg-base-100 dark:bg-base-200">
            <tr>
              <th className="px-4 py-2 text-left">Lesson</th>
              <th className="px-4 py-2 text-left">Reported By</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-t border-base-300 dark:border-base-600 hover:bg-base-200 dark:hover:bg-base-300 transition-colors"
              >
                <td className="px-4 py-2">
                  <Link
                    className="text-primary dark:text-primary-focus underline"
                    to={`/lessons/${report.lessonId}`}
                  >
                    Lesson
                  </Link>
                </td>
                <td className="px-4 py-2 text-base-content dark:text-base-content">
                  {report.reporter}
                </td>
                <td className="px-4 py-2 text-base-content dark:text-base-content">
                  {report.reason}
                </td>
                <td className="px-4 py-2 text-base-content dark:text-base-content">
                  {report.details || "-"}
                </td>
                <td className="px-4 py-2 text-base-content dark:text-base-content">
                  {new Date(report.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ReportedLessons;
