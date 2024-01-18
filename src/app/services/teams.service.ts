import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private dbPath = 'data/teamss';

  teamsRef: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Team> {
    return this.teamsRef;
  }

  create(team: Team): any {
    return this.teamsRef.push(team);
  }

  update(key: string, value: any): Promise<void> {
    return this.teamsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.teamsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.teamsRef.remove();
  }
}
