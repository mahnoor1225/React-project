import { useSelector } from 'react-redux';
import './App.css';
import Board from './components/Board/Board';

function App() {
    const boards = useSelector(state => state.kanban.boards);
    const tickets = useSelector(state => state.kanban.tickets);

    return (
        <div className="page_layout">
            <div className='side_bar'>
                <div className='side_bar_logo'>J</div>
                <div className='side_bar_title'>JIRA</div>
                <nav className='side_bar_nav'>
                    <div className='nav_item active'>📋 Board</div>
                    <div className='nav_item'>📁 Projects</div>
                    <div className='nav_item'>👤 Team</div>
                    <div className='nav_item'>⚙️ Settings</div>
                </nav>
            </div>

            <div className='dashboard'>
                <div className='page_header'>
                    <div className='page_title'>Kanban Board</div>
                    <div className='page_subtitle'>Drag tickets between columns to update status</div>
                </div>

                <div className='outer_board'>
                    <div className='boards'>
                        {boards.map(board => {
                            const boardTickets = tickets.filter(t => t.status === board.status);
                            return (
                                <Board
                                    key={board.status}
                                    title={board.title}
                                    status={board.status}
                                    tickets={boardTickets}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;