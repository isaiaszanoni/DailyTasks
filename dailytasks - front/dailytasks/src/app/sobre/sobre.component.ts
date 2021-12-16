import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/Feedback';
import { AlertService } from '../service/alert.service';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  feedback: Feedback = new Feedback

  constructor(
    private feedbackService: FeedbackService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

  }

  enviarFeedback() {
    this.feedbackService.postFeedback(this.feedback).subscribe((resp: Feedback) => {
      this.feedback = resp
      this.alert.success("Feedback enviado com sucesso!\nMuito obrigado por colaborar!")
    })
  }

}
