import './App.css';
import { TaskManagement } from './pages/TaskManagement/TaskManagement';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <div className="App">
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <TaskManagement/>
      </LocalizationProvider>
    </div>
  );
}

export default App;
