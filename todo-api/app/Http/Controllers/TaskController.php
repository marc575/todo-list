<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        return Auth::user()->tasks;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'dueDate' => 'nullable',
            'priority' => 'nullable|string',
            'status' => 'nullable|integer',
        ]);

        return Auth::user()->tasks()->create($request->only('title', 'description', 'dueDate', 'priority', 'status'));
    }

    public function show($id)
    {
        return Auth::user()->tasks()->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);

        $task->update($request->only('title', 'description', 'dueDate', 'priority'));

        return $task;
    }

    public function toggle(Request $request, $id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);

        $task->update($request->only('status'));

        return $task;
    }

    public function destroy($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
