import { useState } from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board/Board';
import TicketDetailPanel from './components/Ticket/TicketDetail';
import AddTicketForm from './components/Board/AddTicketForm';

function App() {
    const boards  = useSelector(state => state.kanban.boards);
    const tickets = useSelector(state => state.kanban.tickets);

    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [editingTicketId,  setEditingTicketId]  = useState(null);

    const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;
    const editingTicket  = tickets.find(t => t.id === editingTicketId)  || null;

    const handleEditFromPanel = () => {
        setEditingTicketId(selectedTicketId);
        setSelectedTicketId(null);
    };

    return (
        <div className="flex w-full h-screen bg-slate-100 overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-52 min-w-52 h-full flex flex-col items-center px-4 py-6 gap-1"
                style={{ background: 'linear-gradient(180deg,#0f172a 0%,#1e3a5f 100%)' }}>

                <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center
                                text-white text-xl font-bold mb-1 shadow-lg shadow-blue-500/40
                                font-mono">
                    J
                </div>
                <span className="text-blue-300 font-mono text-xs font-bold tracking-[3px] mb-7">
                    JIRA
                </span>

                <nav className="flex flex-col w-full gap-1">
                    {[
                        { icon: '📋', label: 'Board',    active: true },
                        { icon: '📁', label: 'Projects', active: false },
                        { icon: '👤', label: 'Team',     active: false },
                        { icon: '⚙️', label: 'Settings', active: false },
                    ].map(({ icon, label, active }) => (
                        <div key={label}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm
                                        font-medium cursor-pointer transition-colors
                                        ${active
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                        }`}>
                            <span>{icon}</span>{label}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* ── Dashboard ── */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">

                {/* Header */}
                <header className="flex items-center justify-between px-7 py-5
                                   bg-white border-b border-slate-200 shrink-0">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                            Kanban Board
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Click a ticket to view details · drag to move between columns
                        </p>
                    </div>
                </header>

                {/* Board area */}
                <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
                    <div className="flex flex-row gap-4 min-h-full items-start">
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

            {/* Detail panel */}
            {selectedTicket && (
                <TicketDetailPanel
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicketId(null)}
                    onEdit={handleEditFromPanel}
                />
            )}

            {/* Edit modal */}
            {editingTicket && (
                <AddTicketForm
                    ticket={editingTicket}
                    onClose={() => setEditingTicketId(null)}
                />
            )}
        </div>
    );
}

export default App;