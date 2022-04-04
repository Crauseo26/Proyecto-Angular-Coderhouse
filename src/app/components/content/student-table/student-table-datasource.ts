import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Student {
  fullName: string;
  address: string;
  phone: string;
  id: number;
  birthday: Date;
  average: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Student[] = [
  {id: 1, fullName: 'Carlos Rauseo', address:'Montevideo, Uruguay', phone:'+598979631706', birthday: new Date(1995, 2, 28), average: (Math.random() * (99 - 45 + 1)) + 45 },
  {id: 2, fullName: 'Frank Perez', address:'Maldonado, Uruguay', phone:'+598969649737', birthday: new Date(1975, 8, 12), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 3, fullName: 'Rosana Gutierrez', address:'Montevideo, Uruguay', phone:'+598974260473', birthday: new Date(1989, 5, 29), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 4, fullName: 'José José', address:'San José, Uruguay', phone:'+598907405468', birthday: new Date(1993, 6, 10), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 5, fullName: 'Antonieta Perez', address:'Santiago, Chile', phone:'+56933653304', birthday: new Date(1997, 8, 5), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 6, fullName: 'José Martinez', address:'Montevideo, Uruguay', phone:'+598939195050', birthday: new Date(1991, 1, 27), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 7, fullName: 'Carlos Cruz', address:'Santiago, Chile', phone:'+56934101756', birthday: new Date(1990, 10, 13), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 8, fullName: 'Maria López', address:'Buenos Aires, Argentina', phone:'+549579997918', birthday: new Date(1988, 0, 30), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 9, fullName: 'Andrea Shwartz', address:'Montevideo, Uruguay', phone:'+598923631168', birthday: new Date(1985, 6, 21), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 10, fullName: 'Pablo Solano', address:'Buenos Aires, Argentina', phone:'+549449398124', birthday: new Date(1986, 4, 29), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 11, fullName: 'Paula Noriega', address:'Montevideo, Uruguay', phone:'+598916416266', birthday: new Date(1989, 9, 29), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 12, fullName: 'Miguel Rondon', address:'Santiago, Chile', phone:'+59812345678', birthday: new Date(1990, 11, 1), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 13, fullName: 'Salomon Ruiz', address:'Buenos Aires, Argentina', phone:'+549142538972', birthday: new Date(1989, 6, 30), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 14, fullName: 'Eduardo Mendoza', address:'Valencia, Venezuela', phone:'+58416108056', birthday: new Date(1987, 5, 16), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 15, fullName: 'Valeria Jimenez', address:'Montevideo, Uruguay', phone:'+598903657576', birthday: new Date(1992, 1, 3), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 16, fullName: 'Leticia Farias', address:'Santiago, Chile', phone:'+56991908892', birthday: new Date(1991, 9, 12), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 17, fullName: 'Victor Drija', address:'Caracas, Venezuela', phone:'+58412050608', birthday: new Date(1983, 2, 31), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 18, fullName: 'Nacho Redondo', address:'Montevideo, Uruguay', phone:'+598971163437', birthday: new Date(1996, 8, 19), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 19, fullName: 'Luis Grisantti', address:'Caracas, Venezuela', phone:'+58414974072', birthday: new Date(1995, 9, 9), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 20, fullName: 'Manuel Rodriguez', address:'Montevideo, Uruguay', phone:'+598944455107', birthday: new Date(1992, 6, 4), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 21, fullName: 'Natalia del Mar', address:'Caracas, Venezuela', phone:'+58412191807', birthday: new Date(1995, 8, 7), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 22, fullName: 'Isamar Gomez', address:'San José, Uruguay', phone:'+59812345678', birthday: new Date(1993, 2, 28), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 23, fullName: 'Camila Castellanos', address:'Montevideo, Uruguay', phone:'+598923494760', birthday: new Date(1990, 6, 10), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 24, fullName: 'Angel Soca', address:'Maldonado, Uruguay', phone:'+598917024131', birthday: new Date(1990, 7, 5), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 25, fullName: 'Gonzalo López', address:'Montevideo, Uruguay', phone:'+58412281653', birthday: new Date(1991, 4, 17), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 26, fullName: 'Samanta Giroldi', address:'Santiago, Chile', phone:'+56957621087', birthday: new Date(1996, 6, 22), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 27, fullName: 'Elizabeth Parra', address:'San José, Uruguay', phone:'+598905987327', birthday: new Date(1997, 7, 16), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 28, fullName: 'Ramon Ramirez', address:'Maldonado, Uruguay', phone:'+598993845547', birthday: new Date(1990, 1, 18), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 29, fullName: 'Guillermo Sanchez', address:'Valencia, Venezuela', phone:'+58414028950', birthday: new Date(1998, 10, 26), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 30, fullName: 'Alexandra Goncalves', address:'Montevideo, Uruguay', phone:'+598960128653', birthday: new Date(1996, 11, 30), average: (Math.random() * (99 - 45 + 1)) + 45},
  {id: 31, fullName: 'Oscar Carrera', address:'Valencia, Venezuela', phone:'+58414372809', birthday: new Date(1995, 8, 13), average: (Math.random() * (99 - 45 + 1)) + 45},
];

/**
 * Data source for the ExampleTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentsDataSource extends DataSource<Student> {
  data: Student[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Student[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Student[]): Student[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Student[]): Student[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.fullName, b.fullName, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'average': return compare(a.average, b.average, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
