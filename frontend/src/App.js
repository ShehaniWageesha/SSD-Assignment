import './App.css';
import { UserLogin } from './components/UserAuth/UserLogin';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboards } from './components/AdminDashboard/AdminDashboard';
import { UserDashboard } from './components/UserDashboard/UserDashboard';
import { AddUser } from './components/AddUser/AddUser';
import { SendMessage } from './components/SendMessage/SendMessage';
import { UploadFile } from './components/UploadFile/UploadFile';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin" element={<AdminDashboards />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/send-message" element={<SendMessage />} />
        <Route path="/file-upload" element={<UploadFile />} />
      </Routes>
    </div>
  );
}

export default App;
