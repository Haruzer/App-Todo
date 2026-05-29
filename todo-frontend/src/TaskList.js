import TaskOptions from './TaskOptions';

function TaskList({ tasks, onEdit, onDelete, keyword, setKeyword, onSearch, onAdd }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskOptions
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <div className="d-flex gap-2 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 検索..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button className="btn btn-outline-secondary text-nowrap" onClick={onSearch}>検索</button>
        <button className="btn btn-primary text-nowrap" onClick={onAdd}>＋ 追加</button>
      </div>
    </div>
  );
}

export default TaskList;