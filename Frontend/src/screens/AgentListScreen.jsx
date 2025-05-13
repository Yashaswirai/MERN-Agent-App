import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAgents, deleteAgent, clearSuccess } from '../redux/agentSlice';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import Alert from '../components/Alert';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader, TableSkeleton } from '../components/Table';

const AgentListScreen = () => {
  const dispatch = useDispatch();
  const { agents, loading, error, success } = useSelector((state) => state.agents);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success('Agent deleted successfully');
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAgents = [...agents].sort((a, b) => {
    if (!a[sortField] || !b[sortField]) return 0;

    const aValue = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
    const bValue = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAgents = sortedAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.mobileNumber.includes(searchTerm)
  );

  const confirmDelete = (agent) => {
    setAgentToDelete(agent);
  };

  const cancelDelete = () => {
    setAgentToDelete(null);
  };

  const executeDelete = () => {
    if (agentToDelete) {
      dispatch(deleteAgent(agentToDelete._id));
      setAgentToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="slide-up">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Agents</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Manage your agents and their contact assignments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 slide-up" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Link to="/agents/add">
            <Button
              variant="primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              }
            >
              Add Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {agentToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mt-4">Delete Agent</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Are you sure you want to delete <span className="font-medium">{agentToDelete.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="ghost" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={executeDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Card className="slide-up" style={{ animationDelay: '200ms' }}>
        {loading ? (
          <TableSkeleton rows={5} columns={4} />
        ) : filteredAgents.length === 0 ? (
          searchTerm ? (
            <Alert variant="info" className="mb-0">
              No agents found matching "{searchTerm}". Try a different search term.
            </Alert>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">No agents found</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Get started by adding your first agent
              </p>
              <div className="mt-6">
                <Link to="/agents/add">
                  <Button variant="primary">
                    Add Your First Agent
                  </Button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader
                  isSortable
                  isSorted={sortField === 'name'}
                  sortDirection={sortDirection}
                  onSort={() => handleSort('name')}
                >
                  Name
                </TableHeader>
                <TableHeader
                  isSortable
                  isSorted={sortField === 'email'}
                  sortDirection={sortDirection}
                  onSort={() => handleSort('email')}
                >
                  Email
                </TableHeader>
                <TableHeader
                  isSortable
                  isSorted={sortField === 'mobileNumber'}
                  sortDirection={sortDirection}
                  onSort={() => handleSort('mobileNumber')}
                >
                  Mobile Number
                </TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full h-8 w-8 flex items-center justify-center font-medium mr-3">
                        {agent.name.charAt(0).toUpperCase()}
                      </div>
                      {agent.name}
                    </div>
                  </TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.mobileNumber}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/agents/edit/${agent._id}`}>
                        <Button variant="ghost" size="xs" icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        }>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => confirmDelete(agent)}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        }
                      >
                        Delete
                      </Button>
                      <Link to={`/agents/contacts/${agent._id}`}>
                        <Button
                          variant="outline"
                          size="xs"
                          icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          }
                        >
                          Contacts
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AgentListScreen;
