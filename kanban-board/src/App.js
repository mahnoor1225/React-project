import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Board from './components/Board/Board';
import TicketDetailPanel from './components/Ticket/TicketDetail';
import TicketModal from './components/Modal/AddTicket';

function App() {
    const boards  = useSelector(state => state.kanban.boards);
    const tickets = useSelector(state => state.kanban.tickets);

    // Store only the ticket ID — always look up fresh from Redux
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [editingTicketId,  setEditingTicketId]  = useState(null);

    const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;
    const editingTicket  = tickets.find(t => t.id === editingTicketId)  || null;

    const handleEditFromPanel = () => {
        setEditingTicketId(selectedTicketId);
        setSelectedTicketId(null);
    };

    return (
        <div className="page_layout">

            {/* ── Sidebar ── */}
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

            {/* ── Dashboard ── */}
            <div className='dashboard'>
                <div className='page_header'>
                    <div className='page_header_left'>
                        <div className='page_title'>Kanban Board</div>
                        <div className='page_subtitle'>Click a ticket to view details · drag to move between columns</div>
                    </div>
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
                                    onTicketClick={(id) => setSelectedTicketId(id)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Detail panel — always reads fresh ticket from Redux */}
            {selectedTicket && (
                <TicketDetailPanel
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicketId(null)}
                    onEdit={handleEditFromPanel}
                />
            )}

            {/* Edit modal — always reads fresh ticket from Redux */}
            {editingTicket && (
                <TicketModal
                    ticket={editingTicket}
                    onClose={() => setEditingTicketId(null)}
                />
            )}
        </div>
    );
}

export default App;