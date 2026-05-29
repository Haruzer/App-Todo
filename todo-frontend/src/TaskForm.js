import { useState, useEffect } from 'react';

function TaskForm({ onSave, editingTask, setEditingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(2);
  const [status, setStatus] = useState(1);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setPriority(2);
      setStatus(1);
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingTask
      ? `http://localhost:8080/api/tasks/${editingTask.id}`
      : 'http://localhost:8080/api/tasks';
    const method = editingTask ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, status, dueDate })
    })
      .then(res => res.json())
      .then(() => {
        onSave();
        setEditingTask(null);
      });
  };

  return (
    <div className="rounded-4 overflow-hidden shadow">
      <div style={{ background: '#378ADD', padding: '16px 20px' }}>
        <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          {editingTask ? 'タスクを編集' : 'タスクを登録'}
        </span>
      </div>
      <div style={{ background: 'white', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">
              タスク名<span style={{ color: '#E24B4A', fontSize: '12px', marginLeft: '4px' }}>必須</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="例：API実装"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">
              内容・メモ<span style={{ color: '#888', fontSize: '12px', marginLeft: '4px' }}>任意</span>
            </label>
            <textarea
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="詳細説明..."
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">
              締切日<span style={{ color: '#888', fontSize: '12px', marginLeft: '4px' }}>任意</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">優先度</label>
              <select className="form-select" value={priority} onChange={e => setPriority(Number(e.target.value))}>
                <option value={3}>高</option>
                <option value={2}>中</option>
                <option value={1}>低</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label fw-bold">ステータス</label>
              <select className="form-select" value={status} onChange={e => setStatus(Number(e.target.value))}>
                <option value={1}>未完了</option>
                <option value={2}>完了</option>
              </select>
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-50"
              onClick={() => setEditingTask(null)}
            >
              戻る
            </button>
            <button type="submit" className="btn btn-primary w-50">
              {editingTask ? '更新' : 'OK'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;