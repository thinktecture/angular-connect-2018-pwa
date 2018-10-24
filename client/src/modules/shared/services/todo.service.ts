import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {ITodoItem} from '../models/contracts/todoItem.interface';
import {DatabaseService} from './database.service';

@Injectable()
export class TodoService {
    protected table: Dexie.Table<ITodoItem, number>;

    constructor(private readonly databaseService: DatabaseService) {
        this.table = this.databaseService.table('todos');
    }

    getAll(includeDeleted: boolean): Promise<Array<ITodoItem>> {
        if (includeDeleted) {
            return this.table.toArray();
        }
        return this.table.filter(item => !item.deleted).reverse().toArray();
    }

    add(item: ITodoItem): Promise<number> {
        return this.table.put(item);
    }

    async update(item: ITodoItem): Promise<boolean> {
        item.changed = true;
        return !!(await this.table.update(item.id, item));
    }

    async delete(item: ITodoItem): Promise<boolean> {
        if (!item.syncId) {
            await this.table.delete(item.id);
            return Promise.resolve(true);
        } else {
            item.deleted = true;
            return !!(await this.table.update(item.id, item));
        }
    }

    async overwrite(list: Array<ITodoItem>): Promise<Array<ITodoItem>> {
        // Delete IDs to prevent duplicate key
        list.forEach(item => delete item.id);

        await this.table.clear();
        await this.table.bulkAdd(list);
        return this.getAll(false);
    }

    clear() {
        return this.table.clear();
    }
}
