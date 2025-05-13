import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getContactsByBatch, clearError } from '../redux/contactSlice';
import { toast } from 'react-toastify';

const DistributionScreen = () => {
  const { batchId } = useParams();
  const dispatch = useDispatch();
  
  const [agentContacts, setAgentContacts] = useState({});
  
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (batchId) {
      dispatch(getContactsByBatch(batchId));
    }
  }, [dispatch, batchId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      // Group contacts by agent
      const groupedContacts = contacts.reduce((acc, contact) => {
        const agentId = contact.assignedTo._id;
        const agentName = contact.assignedTo.name;
        
        if (!acc[agentId]) {
          acc[agentId] = {
            name: agentName,
            contacts: [],
          };
        }
        
        acc[agentId].contacts.push(contact);
        return acc;
      }, {});
      
      setAgentContacts(groupedContacts);
    }
  }, [contacts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Distribution Results</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>No contacts found for this batch.</p>
        </div>
      ) : (
        <>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p>
              Successfully distributed {contacts.length} contacts among{' '}
              {Object.keys(agentContacts).length} agents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(agentContacts).map(([agentId, data]) => (
              <div key={agentId} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{data.name}</h2>
                <p className="text-gray-600 mb-4">
                  Assigned Contacts: <span className="font-bold">{data.contacts.length}</span>
                </p>
                <div className="overflow-y-auto max-h-60">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm">Name</th>
                        <th className="py-2 px-3 text-left text-sm">Phone</th>
                        <th className="py-2 px-3 text-left text-sm">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.contacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="py-2 px-3 text-sm">{contact.firstName}</td>
                          <td className="py-2 px-3 text-sm">{contact.phone}</td>
                          <td className="py-2 px-3 text-sm">{contact.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link
              to="/upload"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-4"
            >
              Upload Another File
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Back to Dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DistributionScreen;
