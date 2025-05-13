import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createAgent,
  getAgentById,
  updateAgent,
  clearSuccess,
  clearError,
} from '../redux/agentSlice';
import { toast } from 'react-toastify';

const AgentEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, success, agents } = useSelector((state) => state.agents);

  useEffect(() => {
    if (id) {
      // First check if the agent is already in the state
      const agent = agents.find((a) => a._id === id);
      if (agent) {
        setName(agent.name);
        setEmail(agent.email);
        setMobileNumber(agent.mobileNumber);
      } else {
        // If not found in state, fetch from API
        dispatch(getAgentById(id))
          .unwrap()
          .then((agent) => {
            setName(agent.name);
            setEmail(agent.email);
            setMobileNumber(agent.mobileNumber);
          })
          .catch(() => {
            toast.error('Agent not found');
            navigate('/agents');
          });
      }
    } else {
      // Reset form for adding new agent
      setName('');
      setEmail('');
      setMobileNumber('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [id, agents, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success(id ? 'Agent updated successfully' : 'Agent added successfully');
      dispatch(clearSuccess());
      navigate('/agents');
    }
  }, [error, success, dispatch, navigate, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (id) {
      // Update existing agent
      const agentData = {
        name,
        email,
        mobileNumber,
      };

      if (password) {
        agentData.password = password;
      }

      dispatch(updateAgent({ id, agentData }));
    } else {
      // Create new agent
      if (!password) {
        toast.error('Password is required');
        return;
      }

      dispatch(
        createAgent({
          name,
          email,
          mobileNumber,
          password,
        })
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Agent' : 'Add Agent'}</h1>
      <div className="bg-neutral-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mobile Number (with country code)
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number (e.g., +1234567890)"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password {id && '(Leave blank to keep current)'}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={id ? 'Leave blank to keep current password' : 'Enter password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!id}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!id || password !== ''}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/agents')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentEditScreen;
