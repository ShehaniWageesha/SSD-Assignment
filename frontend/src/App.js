import './App.css';
import { AuthUser } from './components/AuthUser/AuthUser';
import { Routes, Route } from 'react-router-dom';
import { UserAdminDashboards } from './components/UserAdminDashboard/UserAdminDashboard';
import { UserDashboard } from './components/UserDashboard/UserDashboard';
import { AddNewUser } from './components/AddNewUser/AddNewUser';
import { MessageSend } from './components/MessageSend/MessageSend';
import { FileUpload } from './components/FileUpload/FileUpload';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthUser />} />
        <Route path="/admin" element={<UserAdminDashboards />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-user" element={<AddNewUser />} />
        <Route path="/send-message" element={<MessageSend />} />
        <Route path="/file-upload" element={<FileUpload />} />
      </Routes>
    </div>
  );
}

export default App;
