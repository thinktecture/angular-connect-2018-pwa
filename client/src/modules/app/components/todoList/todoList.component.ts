import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren
} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {ShareService} from '../../../shared/services/share.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {TodoItem} from '../../../shared/models/todoItem.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WINDOW} from '../../../shared/services/window.token';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.component.html',
})
export class TodoListComponent implements OnChanges {
    private shareUrl: string;
    private itemCopy: ITodoItem;
    private hasNewItem: boolean;

    @Input() items: Array<ITodoItem>;
    @Output() itemChanged = new EventEmitter<ITodoItem>();
    @Output() itemDeleted = new EventEmitter<ITodoItem>();

    @ViewChildren('text') inputFields: QueryList<ElementRef>;

    activeItemIndex: number;
    readonly trackByFn = index => index;

    constructor(private readonly shareService: ShareService, private readonly notificationService: NotificationService, @Inject(WINDOW) windowRef: Window,
                private readonly changeDetectorRef: ChangeDetectorRef, private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
        this.shareUrl = windowRef.location.href;
        console.log('foo');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.items && this.items) {
            const itemIndex = this.items.findIndex(item => item.syncId && item.syncId === this.activatedRoute.snapshot.queryParams.id);
            if (itemIndex >= 0) {
                this.activeItemIndex = itemIndex;
            }
        }
    }

    changeItemCompleted(item: ITodoItem, completed: boolean) {
        item.completed = completed;
        this.saveItem(item);
    }

    saveItem(item: ITodoItem) {
        this.itemChanged.emit(item);
    }

    deleteItem(item: ITodoItem) {
        this.emitItemDeleted(item);
        this.activeItemIndex = -1;
    }

    shareItem(item: ITodoItem) {
        if (item.syncId) {
            this.shareService.share('New Todo!', item.text, this.shareUrl)
                .pipe(
                    catchError(() => {
                        this.notificationService.showNotification('Error!', 'Sharing Todo item failed!');
                        return of(void 0);
                    })
                ).subscribe();
        }
    }

    onFocusItem(item: ITodoItem, index: number) {
        this.activeItemIndex = index;
        this.hasNewItem = !item.text;
        this.itemCopy = Object.assign({}, item);
        this.router.navigate(['/home'], { queryParams: { id: item.syncId } })
    }

    activateItem(itemToActivate: ITodoItem) {
        const index = this.items.findIndex(item => item === itemToActivate);
        if (index >= 0) {
            this.inputFields.forEach((inputField, itemIndex) => {
                if (itemIndex === index) {
                    inputField.nativeElement.focus();
                }
            });
        }
    }

    addNewItem() {
        const newItem = new TodoItem();
        if (this.activeItemIndex >= 0) {
            this.leaveEditMode(this.activeItemIndex, true);
        }
        this.items.unshift(newItem);
        this.changeDetectorRef.detectChanges(); // Refresh ViewChildren
        this.activateItem(newItem);
    }

    leaveEditMode(itemIndex: number, blurInputField: boolean) {
        if (this.activeItemIndex === itemIndex) {
            const item = this.items[itemIndex];
            // Necessary because FAB is an outsideclick
            if (this.hasNewItem && !item.text) {
                this.hasNewItem = false;
                return;
            }
            this.hasNewItem = false;
            if (this.itemCopy.text) {
                if (item.text) {
                    this.saveItem(item);
                } else {
                    this.items[itemIndex] = this.itemCopy;
                }
            } else {
                if (item.text) {
                    this.saveItem(item);
                } else {
                    this.emitItemDeleted(this.items[itemIndex]);
                }
            }

            if (blurInputField) {
                this.blurInputField(itemIndex);
            }
        }
    }

    cancel() {
        const activeItem = this.items[this.activeItemIndex];
        if (this.itemCopy.text) {
            this.items[this.activeItemIndex] = this.itemCopy;
        } else {
            this.emitItemDeleted(activeItem);

        }
        this.activeItemIndex = -1;
        this.blurAllFields(); // List has changed and blur is necessary
    }

    handleKey(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            const item = this.items[this.activeItemIndex];
            if (!item.text) {
                if (this.itemCopy.text) {
                    this.items[this.activeItemIndex] = this.itemCopy;
                } else {
                    this.emitItemDeleted(this.items[this.activeItemIndex]);
                }
            }
            this.blurInputField(this.activeItemIndex);
            this.activeItemIndex = -1;
        }
    }

    leaveList() {
        if (!this.hasNewItem && this.activeItemIndex >= 0) {
            this.leaveEditMode(this.activeItemIndex, false);
            this.activeItemIndex = -1;
            this.blurAllFields();
        }
    }

    private emitItemDeleted(item: ITodoItem) {
        this.itemDeleted.emit(item);
    }

    private blurInputField(index: number) {
        this.inputFields.forEach((field, fieldIndex) => {
            if (fieldIndex === index) {
                field.nativeElement.blur();
            }
        });
    }

    private blurAllFields() {
        this.inputFields.forEach((field) => {
            field.nativeElement.blur();
        });
    }
}

