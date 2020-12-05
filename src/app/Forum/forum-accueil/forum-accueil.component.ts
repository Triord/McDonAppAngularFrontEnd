import { ForumService } from './../../Service/forum.service';
import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/Interface/forum';

@Component({
  selector: 'app-forum-accueil',
  templateUrl: './forum-accueil.component.html',
  styleUrls: ['./forum-accueil.component.css']
})
export class ForumAccueilComponent implements OnInit {
  forumNews: Forum[] = [];
  constructor(private forumS: ForumService) { }

  ngOnInit(){
    this.getForumNews();
  }

  getForumNews(){
    this.forumS.getAllForumNews().subscribe((data: Forum[]) => {
      this.forumNews =  data;
      this.forumNews.forEach(forum => {
        if (typeof forum === 'number') {
        this.forumS.getOneNews(forum).subscribe((data2 : Forum) => {
          this.forumNews.push(data2);
        })
      }
      });
      console.log(this.forumNews);

    })
  }
}
