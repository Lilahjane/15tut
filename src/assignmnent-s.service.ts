import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmnentSService {

  constructor(private http: HttpClient) { }

  public addassignment(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/assignments', data);
  }

  public getassignmentlist(): Observable<any>{
    return this.http.get('http://localhost:3000/assignments');
  }

   
  public updateassignment(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/assignments/${id}`, data);
  }

  public deleteassignment(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/assignments/${id}`);
  }
}


