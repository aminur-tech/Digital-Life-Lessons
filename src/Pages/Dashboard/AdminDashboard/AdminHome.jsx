import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPublicLessons: 0,
    totalReportedLessons: 0,
    newLessonsToday: 0,
    mostActiveContributors: [],
  });

  const [lessonGrowth, setLessonGrowth] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, lessonsRes, reportsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/lessons/public"),
          axiosSecure.get("/reported-lessons"),
        ]);

        const users = usersRes.data;
        const lessons = lessonsRes.data;
        const reports = reportsRes.data;

        const today = new Date().toDateString();
        const newLessonsToday = lessons.filter(
          (l) => new Date(l.createdAt).toDateString() === today
        ).length;

        const contributorMap = {};
        lessons.forEach((lesson) => {
          contributorMap[lesson.email] = (contributorMap[lesson.email] || 0) + 1;
        });

        const sortedContributors = Object.entries(contributorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([email, count]) => ({ email, count }));

        setStats({
          totalUsers: users.length,
          totalPublicLessons: lessons.length,
          totalReportedLessons: reports.length,
          newLessonsToday,
          mostActiveContributors: sortedContributors,
        });

        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split("T")[0];
        }).reverse();

        const lessonGrowthData = last7Days.map((day) => ({
          date: day,
          lessons: lessons.filter(
            (l) => new Date(l.createdAt).toISOString().split("T")[0] === day
          ).length,
        }));

        const userGrowthData = last7Days.map((day) => ({
          date: day,
          users: users.filter(
            (u) => new Date(u.createAt).toISOString().split("T")[0] === day
          ).length,
        }));

        setLessonGrowth(lessonGrowthData);
        setUserGrowth(userGrowthData);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-base-200 dark:bg-base-300 min-h-screen text-base-content transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-base-content dark:text-base-content">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Users" value={stats.totalUsers} color="bg-primary dark:bg-primary-focus" />
        <Card title="Public Lessons" value={stats.totalPublicLessons} color="bg-success dark:bg-success-focus" />
        <Card title="Reported Lessons" value={stats.totalReportedLessons} color="bg-error dark:bg-error-focus" />
        <Card title="New Lessons Today" value={stats.newLessonsToday} color="bg-warning dark:bg-warning-focus" />
      </div>

      {/* Most Active Contributors */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-base-content">
          Most Active Contributors
        </h2>

        {stats.mostActiveContributors.length === 0 ? (
          <p className="text-base-content/70  py-4 text-center">
            No contributors yet.
          </p>
        ) : (
          <ul className="bg-base-100 dark:bg-base-200 shadow rounded p-4">
            {stats.mostActiveContributors.map((c) => (
              <li
                key={c.email}
                className="py-2 border-b last:border-b-0 border-base-300 dark:border-base-600 flex justify-between items-center"
              >
                <span className="font-medium text-base-content dark:text-base-content">{c.email}</span>
                <span className="text-sm text-base-content">{c.count} lessons</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Lesson Growth"
          data={lessonGrowth}
          dataKey="lessons"
          containerClass="bg-base-100 dark:bg-base-200 shadow rounded p-4"
        />
        <ChartCard
          title="User Growth"
          data={userGrowth}
          dataKey="users"
          containerClass="bg-base-100 dark:bg-base-200 shadow rounded p-4"
        />
      </div>
    </div>


  );
};

// Card Component
const Card = ({ title, value, color }) => (
  <div className={`p-6 rounded shadow text-base-content ${color}`}>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

// ChartCard Component using Recharts
const ChartCard = ({ title, data, dataKey }) => (
  <div className="p-4 bg-base-100 dark:bg-base-200 shadow rounded text-base-content">
    <title>Dashboard | Home</title>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', color: '#000' }}
          wrapperStyle={{ borderRadius: '8px' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AdminHome;
