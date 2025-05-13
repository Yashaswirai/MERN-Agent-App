import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAgentContacts, clearError } from '../redux/contactSlice';
import { toast } from 'react-toastify';

const AgentContactsScreen = () => {
  const { agentId } = useParams();
  const dispatch = useDispatch();
  
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const { agents } = useSelector((state) => state.agents);
  
  const agent = agents.find((a) => a._id === agentId);

  useEffect(() => {
    if (agentId) {
      dispatch(getAgentContacts(agentId));
    }
  }, [dispatch, agentId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {agent ? `${agent.name}'s Contacts` : 'Agent Contacts'}
        </h1>
        <Link
          to="/agents"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Back to Agents
        </Link>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>No contacts assigned to this agent yet.</p>
        </div>
      ) : (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-100 mb-4">
            Total Contacts: <span className="font-bold">{contacts.length}</span>
          </p>
          <div className="overflow-x-auto rounded-2xl">
            <table className="text-white min-w-full">
              <thead className="text-white bg-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Notes</th>
                  <th className="py-3 px-4 text-left">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 hover:text-black">
                    <td className="py-3 px-4">{contact.firstName}</td>
                    <td className="py-3 px-4">{contact.phone}</td>
                    <td className="py-3 px-4">{contact.notes}</td>
                    <td className="py-3 px-4">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentContactsScreen;
