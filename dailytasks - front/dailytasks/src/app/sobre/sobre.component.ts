import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/Feedback';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  feedback: Feedback = new Feedback

  constructor(
    public feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {

  }

  enviarFeedback() {
    this.feedbackService.postFeedback(this.feedback).subscribe((resp: Feedback) => {
      this.feedback = resp
      alert("Feedback enviado com sucesso!\nMuito obrigado por colaborar!")
    })
  }

}
