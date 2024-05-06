import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable } from 'rxjs';
import { NoteObj } from 'src/assets/type';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl : string = "https://localhost:7233/api"

  private authHeader = new HttpHeaders({
    // 'Accept': "application/json",
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  })

  constructor(private http: HttpClient) { }

  loginApi(email: string, password: string):Observable<any>{

    return this.http.post(`https://localhost:7233/api/User/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,{})

  }

  getAllNotesApi(): Observable<any> {
     
    return this.http.get("https://localhost:7233/api/UserNote/GetAllNotes", {headers: this.authHeader})
  } 

  createNoteApi(data:any):Observable<any>{
    return this.http.post("https://localhost:7233/api/UserNote/Create Note",data,{headers:this.authHeader})
  }

  ArchiveApi(id:number = 0):Observable<any>{
    return this.http.patch(`https://localhost:7233/api/UserNote/ArchiveNote/${id}`,{headers:this.authHeader})
  }

  TrashNoteApi(id:number = 0):Observable<any>{
    return this.http.patch(`https://localhost:7233/api/UserNote/TrashNote/${id}`,{headers:this.authHeader})
  }

  DeleteNoteApi(id:number = 0):Observable<any>{
    return this.http.delete(`https://localhost:7233/api/UserNote/delete userNote/${id}`,{headers:this.authHeader})
  }
  
  ColourApi(id:number = 0, colour:string = "#ffffff"):Observable<any>
  {
    return this.http.put(`https://localhost:7233/api/UserNote/updateColor/${id}?isColor=${encodeURIComponent(colour)}`,{headers:this.authHeader})
    
  }

  getNameAndEmailApi():Observable<any>
  {
    return this.http.get(`https://localhost:7233/api/User/GetAllUser`, {headers: this.authHeader})
  }


}

