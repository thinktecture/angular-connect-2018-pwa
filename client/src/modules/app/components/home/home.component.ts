import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {TodoListComponent} from '../todoList/todoList.component';
import {AppStateService} from '../../../shared/services/appState.service';
import {from as fromPromise, Subscription} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {SyncService} from '../../../shared/services/sync.service';
import {TodoService} from '../../../shared/services/todo.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    private stateChangeSubscription: Subscription;

    @ViewChild(TodoListComponent) list: TodoListComponent;

    items: Array<ITodoItem>;
    isAppOnline = true;

    constructor(private readonly todoService: TodoService, private readonly syncService: SyncService, private readonly appStateAService: AppStateService) {
    }

    async ngOnInit() {
        this.items = await this.todoService.getAll(false);
        this.stateChangeSubscription = this.appStateAService.onlineStateChange.subscribe(online => this.isAppOnline = online);
    }

    ngOnDestroy() {
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
    }

    updateItem(item: ITodoItem) {
        if (item.id) {
            this.todoService.update(item);
        } else {
            this.todoService.add(item);
        }

    }

    async deleteItem(item: ITodoItem) {
        if (item.id) {
            try {
                await this.todoService.delete(item);
                this.removeItemFromList(item);
            } catch (error) {
                console.log('Error while deleting!', error);
            }
        } else {
            this.removeItemFromList(item);
        }
    }

    createItem() {
        this.list.addNewItem();
    }

    sync() {
        fromPromise(this.todoService.getAll(true))
            .pipe(
                switchMap(items => this.syncService.sync(items)),
                switchMap(result => fromPromise(this.todoService.overwrite(result as Array<ITodoItem>))),
                take(1)
            ).subscribe(items => this.items = items);
    }

    private removeItemFromList(item: ITodoItem) {
        const index = this.items.findIndex(listItem => listItem.id === item.id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
}
