function TaskOptions({ task, onEdit, onDelete }) {
  const priorityBadge = (priority) => {
    if (priority === 3) return <span className="badge rounded-pill" style={{background:'#FCEBEB', color:'#A32D2D'}}>高</span>;
    if (priority === 2) return <span className="badge rounded-pill" style={{background:'#FAEEDA', color:'#854F0B'}}>中</span>;
    return <span className="badge rounded-pill" style={{background:'#E1F5EE', color:'#0F6E56'}}>低</span>;
  };

  return (
    <div className="d-flex align-items-center gap-2 p-2 mb-2 rounded-3" style={{border:'1px solid #e0e0e0', background:'#faf9f7'}}>
      {priorityBadge(task.priority)}
      <span className="flex-grow-1" style={{fontSize:'14px'}}>{task.title}</span>
      <span style={{fontSize:'13px', color:'#888'}}>{task.dueDate}</span>
      <button className="btn btn-sm btn-outline-secondary py-1 px-2" onClick={() => onEdit(task)}>✎</button>
      <button className="btn btn-sm btn-outline-danger py-1 px-2" onClick={() => onDelete(task.id)}>🗑</button>
    </div>
  );
}

export default TaskOptions;