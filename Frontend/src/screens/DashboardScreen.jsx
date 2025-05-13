import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAgents } from '../redux/agentSlice';
import Card from '../components/Card';
import Button from '../components/Button';
import { CardSkeleton, ProfileSkeleton } from '../components/Skeleton';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { agents, loading } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  // Get current date for greeting
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 slide-up">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {greeting}, {userInfo?.name}! Here's an overview of your agent management system.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 slide-up" style={{ animationDelay: '100ms' }}>
        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Agents</p>
              <h3 className="text-2xl font-bold">
                {loading ? '...' : agents.length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-sm">Recent Uploads</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-sm">Last Activity</p>
              <h3 className="text-sm font-medium mt-1">Today</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Summary */}
        <Card
          title="Recent Agents"
          className="lg:col-span-2 slide-up"
          style={{ animationDelay: '200ms' }}
          footer={
            <div className="flex justify-end">
              <Link to="/agents">
                <Button variant="ghost" size="sm">
                  View All Agents
                </Button>
              </Link>
            </div>
          }
        >
          {loading ? (
            <div className="space-y-4">
              <ProfileSkeleton />
              <ProfileSkeleton />
              <ProfileSkeleton />
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">No agents found</p>
              <Link to="/agents/add" className="mt-3 inline-block">
                <Button variant="primary" size="sm">
                  Add Your First Agent
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {agents.slice(0, 5).map((agent) => (
                <div key={agent._id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full h-10 w-10 flex items-center justify-center font-medium">
                      {agent.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-neutral-900 dark:text-white">{agent.name}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/agents/edit/${agent._id}`}>
                      <Button variant="ghost" size="xs">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/agents/contacts/${agent._id}`}>
                      <Button variant="outline" size="xs">
                        Contacts
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6 slide-up" style={{ animationDelay: '300ms' }}>
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Link to="/agents/add" className="block">
                <Button
                  variant="primary"
                  fullWidth
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  }
                >
                  Add New Agent
                </Button>
              </Link>

              <Link to="/upload" className="block">
                <Button
                  variant="secondary"
                  fullWidth
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Upload CSV
                </Button>
              </Link>
            </div>
          </Card>

          <Card title="System Status">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Agents</span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {loading ? '...' : `${agents.length}/5`}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 dark:bg-neutral-700">
                  <div
                    className="bg-primary-600 h-2 rounded-full dark:bg-primary-500"
                    style={{ width: loading ? '0%' : `${Math.min(agents.length / 5 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your system is ready to distribute contacts among your agents.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
