import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  postFeedback(feedback: Feedback): Observable<Feedback>{
    return this.http.post<Feedback>('https://feedbackdt.herokuapp.com/api/v1/feedbacks/', feedback)
  }
}
