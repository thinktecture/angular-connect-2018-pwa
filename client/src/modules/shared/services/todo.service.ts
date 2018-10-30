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
            // TODO
        }
        // TODO
    }

    add(item: ITodoItem): Promise<number> {
        // TODO
    }

    async update(item: ITodoItem): Promise<number> {
        item.changed = true;
        // TODO
    }

    async delete(item: ITodoItem): Promise<number> {
        if (!item.syncId) {
            await this.table.delete(item.id);
            return Promise.resolve(1);
        } else {
            item.deleted = true;
            return await this.table.update(item.id, item);
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
