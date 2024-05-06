import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteService/note.service';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  host : {
    class : "app-notes-container-cnt"
  }
})
export class NotesContainerComponent implements OnInit {
  notesList: NoteObj[] = [];
  // @Input() noteObj: NoteObj | undefined;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res: any) => {
        console.log(res);
        this.notesList = res.filter((note: NoteObj) => !note.isArchive);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  handleUpdateNoteList($event:any)
  {
    this.notesList=this.notesList+$event
  }

  




}
