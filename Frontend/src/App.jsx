import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';

// Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AgentListScreen from './screens/AgentListScreen';
import AgentEditScreen from './screens/AgentEditScreen';
import AgentContactsScreen from './screens/AgentContactsScreen';
import UploadScreen from './screens/UploadScreen';
import DistributionScreen from './screens/DistributionScreen';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <main className="min-h-screen bg-neutral-900 text-white pt-20 transition-all">
          <div className="fade-in">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />

              <Route path="" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/agents" element={<AgentListScreen />} />
                <Route path="/agents/add" element={<AgentEditScreen />} />
                <Route path="/agents/edit/:id" element={<AgentEditScreen />} />
                <Route path="/agents/contacts/:agentId" element={<AgentContactsScreen />} />
                <Route path="/upload" element={<UploadScreen />} />
                <Route path="/distribution/:batchId" element={<DistributionScreen />} />
              </Route>
            </Routes>
          </div>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
