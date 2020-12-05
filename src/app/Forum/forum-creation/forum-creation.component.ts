import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/Interface/forum';
import { ForumService } from 'src/app/Service/forum.service';

@Component({
  selector: 'app-forum-creation',
  templateUrl: './forum-creation.component.html',
  styleUrls: ['./forum-creation.component.css']
})
export class ForumCreationComponent implements OnInit {
  forum: Forum = new Forum();
  constructor(private forumS: ForumService) { }

  ngOnInit(){

  }
  addForumNews(){
    let f = this.forum;
    f.idForum = this.forum.idForum;
    f.contenu = this.forum.contenu;
    f.titre = this.forum.titre;
    f.datePublication = this.forum.datePublication;
    f.employeeFromForum = null;

    this.forumS.addForumNews(f).subscribe((data: Forum) => {
      console.log(data);
      alert('la nouvelle viens d être ajouté veuillez videz les champs si vous souhaitez en remettre une nouvelle')
    })
  }
}
