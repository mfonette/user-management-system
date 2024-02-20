// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSort, Sort } from '@angular/material/sort';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { Observable, of as observableOf, merge, Subject } from 'rxjs';
// import { UserService } from 'src/app/services/user/user.service';
// import { User } from 'src/app/shared/models/user.model';

// export class TableDataSource extends DataSource<User> {
//   data: User[] = [];
//   paginator!: MatPaginator;
//   sort!: MatSort;
//   private refreshSubject = new Subject<void>();

//   constructor(
//     private userService: UserService,
//   ) {
//     super();
//   }

//   refresh() {
//     this.refreshSubject.next();
//   }

//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   // connect(): Observable<User[]> {
//   //   // Ensure paginator is defined
//   //   if (!this.paginator) {
//   //     console.error('Paginator is not set');
//   //     return observableOf([]);
//   //   }

//   //   return merge(this.paginator.page)
//   //     .pipe(
//   //       startWith({}),
//   //       switchMap(() => {
//   //         // Adjust the page index if your API is 1-based index
//   //         const pageIndex = this.paginator.pageIndex + 1;
//   //         // Call listUsers with the current page
//   //         return this.userService.listUsers(pageIndex);
//   //       }),
//   //       map(response => {
//   //         // Update the paginator's length with the total records from the server
//   //         this.paginator.length = response.total;
//   //         // Return the data items to be displayed in the table
//   //         return response.data;
//   //       }),
//   //       catchError(() => {
//   //         // Simple error handling, returning an empty array in case of error
//   //         return observableOf([]);
//   //       })
//   //     );
//   // }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect(): void {}

// }

