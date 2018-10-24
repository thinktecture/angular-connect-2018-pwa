import {ITodoItem} from './contracts/todoItem.interface';

export class TodoItem implements ITodoItem {
    text = '';
    completed = false;

    // IDatabaseItem
    id: number;

    // ISyncItem
    syncId = '';
    deleted = false;
    changed = false;
}
