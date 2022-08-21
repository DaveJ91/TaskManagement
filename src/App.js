import './App.css';
import { TaskManagement } from './pages/TaskManagement/TaskManagement';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { UserProvider } from './contexts/UserContext/UserContext';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
            <TaskManagement/>
          </UserProvider>
        </LocalizationProvider>
    </div>
  );
}

export default App;
