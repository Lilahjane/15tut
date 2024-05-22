import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmnentSService {

  constructor(private http: HttpClient) { }

  addassignment(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/assignments', data);
  }

  getassignmentlist(): Observable<any>{
    return this.http.get('http://localhost:3000/assignments');
  }
  updateassignment(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/assignments/${id}`, data);
  }

  deleteassignment(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/assignments/${id}`);
  }
}


